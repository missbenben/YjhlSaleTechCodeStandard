/*
 * BIMEditPicture V1.0.0
 *
 * Edit model snapshot generated images
 * http://www.bimwinner.com
 *
 * Built on 2016-12-08
 *
 * todo
 * Copyright 2016, wgb
 * 
 *
 */

/**
 * 本地存储类
 * @author yan
 * @module storageModel
 * @main storageModel
 * @namespace painter.model
 */
(function($, global){
    "use strict";
    
    /**
    * 本地存储类
    * @class StorageModel
    * @constructor
    * @extends painter.model.StorageModel.prototype
    */
    var StorageModel = function(){
        /**
         * 浏览器寸处对象
         * @property storage
         * @type Object
         * @default null
         */
        this.storage = null;    
    };
    
    /**
    * 本地存储类原型对象
    * @class StorageModel.prototype
    * @static
    */    
    StorageModel.prototype = {
        /**
         * 初始化
         * @method init 
         */
        init:function(){
            function getLocalStorage(){
                var result = false;
                if(typeof global.localStorage === 'object'){
                    result = localStorage;
                }else if(typeof global.globalStorage === 'object'){
                    result = global.globalStorage;
                }
                
                return result;
            }
            
            this.storage = getLocalStorage();
        },
        
        /**
         * 获取本地存储对象
         * @method getStorage
         * @return {Object} 本地存储对象
         */
        getStorage:function(){
            return this.storage;
        },
        
        /**
         * 存储对象
         * @method save
         * @param {String} key 存的键
         * @param {String} value 要存的值
         * @return {Bollean} 存储是否成功
         */
        save:function(key, value){
            var
                storage = this.storage,
                list = false;
            if(storage !== false){
                list = storage.setItem(key, value);
            }
            return list;
        },
        
        /**
         * 载入值
         * @method getStorage
         * @param {String} key 要去得的键
         * @return {Bollean|String} 获取成功返回兼职，失败返回false
         */
        load:function(key){
            var
                storage = this.storage,
                result = false;
            if(storage !== false){                
                result = storage.getItem(key);
            }
            
            return result;
        }
    };
    
    global.painter = global.painter || {};
    global.painter.model = global.painter.model || {};
    global.painter.model.StorageModel = StorageModel;
}(jQuery, window));
;/**
 * 鼠标形状js
 * @author yan
 * @module mouse
 * @namespace painter.model.mouseModel
 */
(function($, global){
    "use strict";
    var
        Mouse,
        Cross,
        Pen,
        Eraser,
        Text,
        FloodFill,
        EyeDropper;
    
    /**
     * 鼠标类
     * @class Mouse
     * @constructor
     * @extends painter.model.mouseModel.Mouse.prototype
     */    
    Mouse = function(){
        /**
         * 鼠标名称
         * @property name
         * @type String
         * @default "Mouse"
         */
        this.name = "Mouse";
        
        /**
         * 参数
         * @property option
         * @type Object
         * @default {}
         */
        this.option = {};
        
        /**
         * 鼠标名称
         * @property mouseShape
         * @type Object
         * @default null
         */
        this.mouseShape = null;
        
        /**
         * 初始化
         * @method init
         * @param {Object} option 参数对象
         * @param {Array} points 点
         */
        this.init = function(option, points){
            var 
                index = 'CircleStroke';
            //设置参数
            this.setOption({
                lineWidth:1,
                strokeStyle:option.strokeStyle,
                radius:Math.ceil(option.lineWidth /2),
                opacity:100                
            });
            this.setPoints(points);//设置点    
            //设置鼠标图形
            this.setMouseShape(new global.painter.model.shapeModel[index]());
            this.initMouseShape();//初始化鼠标图形
            this.setImage();//设置鼠标图片
        };
        
        /**
         * 绘制鼠标图形
         * @method paint
         * @param {Object} context 上下文对象
         */
        this.paint = function(context){
            this.getMouseShape().paint(context);
        };
    };
    
    /**
     * 鼠标类原型
     * @class Mouse.prototype
     * @static
     */
    Mouse.prototype = {        
        /**
         * 获取名字
         * @method getName
         * @return {String} 当前的名字
         */
        getName:function(){
            return this.name;   
        },
        
        /**
         * 设置工具参数对象
         * @method setOption
         * @param {Object} option 设置的参数集和
         * @return {Object} 成功返回设置对象，失败返回null
         */
        setOption:function(option){
            //检查入口参数是否是对象
            if(typeof option === 'object'){
                $.extend(true, this.option, option);
                return this.getOption();
            } 
            
            return null;
        },
        
        /**
         * 获取工具参数对象
         * @method getOption 
         * @return {Object} 返回当前工具参数对象
         */
        getOption:function(){
            return $.extend(true, {}, this.option);//放回选项对象的深拷贝
        },
        
        /**
         * 获取鼠标图形对象
         * @method getMouseShape 
         * @return {Object} 返回鼠标图形对象
         */
        getMouseShape:function(){
            return this.mouseShape;
        },
        
        /**
         * 设置鼠标图形对象
         * @method setMouseShape 
         * @param {Object} mouseShape 鼠标图形对象
         */
        setMouseShape:function(mouseShape){
            this.mouseShape = mouseShape;
            return mouseShape;
        },
        
        /**
         * 设置点坐标
         * @method setPoints 
         * @param {Object} points 点坐标对象
         */
        setPoints:function(points){
            this.setOption(points);
        },
        
        /**
         * 初始化鼠标图形对象
         * @method initMouseShape 
         */
        initMouseShape:function(){
            this.getMouseShape().init(this.getOption());
        },
        
        /**
         * 初始化鼠标图片
         * @method setImage 
         */
        setImage:function(){
            var
                $mouseCanvas = $('#canvas-mouse'),
                name = this.getName();
            
            $mouseCanvas.attr("data-mouse", name);
            return true;
        }
    };

    /**
     * 十字类
     * @class Cross
     * @constructor
     * @extends painter.model.mouseModel.Cross.prototype
     */    
    Cross = function(){
        /**
         * 鼠标名称
         * @property name
         * @type String
         * @default "Cross"
         */
        this.name = "Cross";
        
        /**
         * 初始化
         * @method init
         * @param {Object} option 参数对象
         * @param {Array} points 点
         */
        this.init = function(option, points){
            var 
                index = this.getName();
            //设置参数
            this.setOption({
                length:10,
                lineHeight:1,
                opacity:100,
                strokeStyle:option.strokeStyle,
                lineJoin:option.lineJoin,
                lineCap:option.lineCap,
                shadowOffsetX:option.shadowOffsetX,
                shadowOffsetY:option.shadowOffsetY,
                shadowBlur:option.shadowBlur,
                shadowColor:option.shadowColor
            });
            this.setPoints(points);//设置点    
            //设置鼠标图形
            this.setMouseShape(new global.painter.model.shapeModel[index]());
            this.initMouseShape();//初始化鼠标图形
            this.setImage();//设置鼠标图片
        };
        
        /**
         * 绘制鼠标图形
         * @method paint
         * @param {Object} context 上下文对象
         */
        this.paint = function(context){
            this.getMouseShape().paint(context);
        };
    };
    
    /**
     * 十字类原型
     * @class Cross.prototype
     * @static
     * @extends painter.model.mouseModel.Mouse
     */
    Cross.prototype = new Mouse();
    
    /**
     * 铅笔类
     * @class Pen
     * @constructor
     * @extends painter.model.mouseModel.Pen.prototype
     */
    Pen = function(){
        /**
         * 鼠标名称
         * @property name
         * @type String
         * @default "Pen"
         */
        this.name = "Pen";
    };
    
     /**
     * 铅笔类原型
     * @class Pen.prototype
     * @static
     * @extends painter.model.mouseModel.Mouse
     */
    Pen.prototype = new Mouse();
    
    /**
     * 橡皮类
     * @class Eraser
     * @constructor
     * @extends painter.model.mouseModel.Eraser.prototype
     */
    Eraser = function(){
        /**
         * 鼠标名称
         * @property name
         * @type String
         * @default "Eraser"
         */
        this.name = "Eraser";
        
        /**
         * 初始化
         * @method init
         * @param {Object} option 参数对象
         * @param {Array} points 点
         */
        this.init = function(option, points){
            var 
                index = "CircleStroke";
            //设置参数
            this.setOption({
                strokeStyle:'#000',
                opacity:option.opacity,
                radius:Math.ceil(option.lineWidth / 2, 10),
                lineJoin:option.lineJoin,
                lineCap:option.lineCap,
                shadowOffsetX:option.shadowOffsetX,
                shadowOffsetY:option.shadowOffsetY,
                shadowBlur:option.shadowBlur,
                shadowColor:option.shadowColor
            });
            this.setPoints(points);//设置点    
            //设置鼠标图形
            this.setMouseShape(new global.painter.model.shapeModel[index]());
            this.initMouseShape();//初始化鼠标图形
            this.setImage();//设置鼠标图片
        };
        
        /**
         * 绘制鼠标图形
         * @method paint
         * @param {Object} context 上下文对象
         */
        this.paint = function(context){
            this.getMouseShape().paint(context);
        };        
    };
    
    /**
     * 橡皮类原型
     * @class Eraser.prototype
     * @static
     * @extends painter.model.mouseModel.Mouse
     */
    Eraser.prototype = new Mouse();
    
    /**
     * 文本类
     * @class Text
     * @constructor
     * @extends painter.model.mouseModel.Text.prototype
     */
    Text = function(){
        /**
         * 鼠标名称
         * @property name
         * @type String
         * @default "Text"
         */
        this.name = "Text";
        
        /**
         * 初始化
         * @method init
         * @param {Object} option 参数对象
         * @param {Array} points 点
         */
        this.init = function(option, points){
            this.setImage();//设置鼠标图片
        };
        
        /**
         * 绘制鼠标图形
         * @method paint
         * @param {Object} context 上下文对象
         */
        this.paint = function(context){
        };        
    };
    
    /**
     * 文本类原型
     * @class Text.prototype
     * @static
     * @extends painter.model.mouseModel.Mouse
     */
    Text.prototype = new Mouse();
    
    /**
     * 油漆桶类
     * @class FloodFill
     * @constructor
     * @extends painter.model.mouseModel.FloodFill.prototype
     */
    FloodFill = function(){
        /**
         * 鼠标名称
         * @property name
         * @type String
         * @default "FloodFill"
         */
        this.name = "FloodFill";
        
        /**
         * 初始化
         * @method init
         * @param {Object} option 参数对象
         * @param {Array} points 点
         */
        this.init = function(option, points){
            var 
                index = "CircleStroke";
            //设置参数
            this.setOption({
                strokeStyle:'#000',
                opacity:90,
                radius:Math.ceil(option.lineWidth / 2, 10)
            });
            this.setPoints(points);//设置点    
            //设置鼠标图形
            this.setMouseShape(new global.painter.model.shapeModel[index]());
            this.initMouseShape();//初始化鼠标图形
            this.setImage();//设置鼠标图片
        };
        
        /**
         * 绘制鼠标图形
         * @method paint
         * @param {Object} context 上下文对象
         */
        this.paint = function(context){
            this.getMouseShape().paint(context);
        };        
    };
    
    /**
     * 油漆桶类原型
     * @class FloodFill.prototype
     * @static
     * @extends painter.model.mouseModel.Mouse
     */
    FloodFill.prototype = new Mouse();
    
    /**
     * 吸管类
     * @class EyeDropper
     * @constructor
     * @extends painter.model.mouseModel.EyeDropper.prototype
     */
    EyeDropper = function(){
        /**
         * 鼠标名称
         * @property name
         * @type String
         * @default "EyeDropper"
         */
        this.name = "EyeDropper";
        
        /**
         * 绘制鼠标图形
         * @method paint
         * @param {Object} context 上下文对象
         */
        this.init = function(option, points){
            var 
                index = "CircleStroke";
            //设置参数
            this.setOption({
                strokeStyle:'#000',
                opacity:90,
                radius:Math.ceil(option.lineWidth / 2, 10)
            });
            this.setPoints(points);//设置点    
            //设置鼠标图形
            this.setMouseShape(new global.painter.model.shapeModel[index]());
            this.initMouseShape();//初始化鼠标图形
            this.setImage();//设置鼠标图片
        };
        
        /**
         * 绘制鼠标图形
         * @method paint
         * @param {Object} context 上下文对象
         */
        this.paint = function(context){
            this.getMouseShape().paint(context);
        };        
    };
    
    /**
     * 吸管类原型
     * @class EyeDropper.prototype
     * @static
     * @extends painter.model.mouseModel.Mouse
     */
    EyeDropper.prototype = new Mouse();
    
    //添加工具到数据层
    global.painter = global.painter || {};
    global.painter.model = global.painter.model || {};
    global.painter.model.mouseModel = global.painter.model.mouseModel || {};
    global.painter.model.mouseModel.Mouse = Mouse;
    global.painter.model.mouseModel.Cross = Cross;
    global.painter.model.mouseModel.Pen = Pen;
    global.painter.model.mouseModel.Eraser = Eraser;
    global.painter.model.mouseModel.Text = Text;
    global.painter.model.mouseModel.FloodFill = FloodFill;
    global.painter.model.mouseModel.EyeDropper = EyeDropper;
}(jQuery, window));;/**
 * @author yan
 * @module pointListModel
 * @namespace painter.model
 */

(function($, global){
    "use strict";
    
    /**
     * 点列表对象
     * @class PointList
     * @static
     */
    var PointList = {
        /**
         * 点列表
         * @property list
         * @type Array
         * @default []
         */
        list:[],
        
        /**
         * 添加点
         * @method add
         * @param {Object} 添加的点
         * @return {Array} 点列表
         */
        add:function(point){
            this.list.push(point);
            return this.list;
        },
        
        /**
         * 获取开始节点
         * @method getStart
         * @return {Object} 第一个点对象
         */
        getStart:function(){
            return this.list[0];
        },
        
        /**
         * 获取结束节点
         * @method getEnd
         * @return {Object} 第最后一个点对象
         */
        getEnd:function(){
            return this.list[this.list.length - 1];
        },
        
        /**
         * 获取结束节点
         * @method getList
         * @return {Array} 点列表
         */        
        getList:function(){
            return this.list;
        },
        
        /**
         * 初始化
         * @method init
         */
        init:function(){
            this.list = [];
            return this.list;   
        }
    };
    
    global.painter = global.painter || {};
    global.painter.model = global.painter.model || {};
    global.painter.model.PointList = PointList;
}(jQuery, window));
;/**
 * @author yan
 * @module shapeModel
 * @namespace painter.model.shapeModel
 */

(function($, global){
    "use strict";
    var
        //图形类所有图形的超级父类
        Shape = null,
        //填充+轮廓类图形父类
        FillStroke,
        Line = null,
        CurveClosed,
        Rect = null,
        Circle = null,
        //椭圆类
        Ellipes,
        //轮廓类工具超级父类
        Stroke,
        Pen = null,
        CurveClosedStroke,
        RectStroke = null,
        CircleStroke = null,
        Eraser,
        FloodFill,
        EyeDropper,
        //十字类
        Cross,
        
        //椭圆类
        EllipesStroke,
        //文字类
        Text,
        //文本轮廓类
        TextStroke,
        
        //图像
        ImageShape;
        
        
    /**
     * Shape 构造函数
     * @class Shape
     * @constructor
     * @extends painter.model.shapeModel.Shape.prototype
     */
	Shape = function(){
	    /**
	     * 名称
	     * @property name
	     * @type String
	     * @default Shape 
	     */
	    this.name = 'Shape';
	    
	    /**
	     * 图形参数
	     * @property option
	     * @type Object
	     * @default {} 
	     */
	    this.option = {};
	};
	
	/**
	 * Shape 原型
	 * @class Shape.prototype
	 * @static
	 */	
	Shape.prototype = {	   
	    /**
	     * 初始化对象
	     * @method init
	     * @param {Object} option 参数
	     */ 
	     init:function(option){
	         this.initOption(option);
	     },
        /**
         * 获取名称
         * @method getName
         * @return {String} 当前对象的名称 
         */
        getName:function(){
            return this.name;
        },
        
        /**
         * 初始化当前参数为传递参数
         * @method initOption
         * @param {Object} option 参数
         */
        initOption:function(option){
			this.option = {};//初始化为空
            this.setOption(option);
        },
        /**
         * 设置工具参数对象
         * @method setOption
         * @param {Object} option 设置的参数集和
         * @return {Bollean} 是否设置成功
         */
        setOption:function(option){
            $.extend(true, this.option, option);
            
            return this.option;
        },
        
        /**
         * 获取工具参数对象
         * @method getOption 
         * @return {Object} 返回当前工具参数对象
         */       
        getOption:function(){
            return this.option;
        },
        
        /**
         * 重绘图形方法
         * @method repaint
         * @param {Object} context 要绘制到的上下文
         */
         repaint:function(context){
            this.paint(context);
         },
         
         /**
         * 设置填充轮廓类图形的属性
         * @method setAttributes
         * @param {Object} context 设置的上下文
         */
        setAttributes:function(context){
            //nothing
        }
	};
	
	/**
	 * 填充轮廓类图形超级父类
	 * @class FillStroke
	 * @constructor
	 * @extends painter.model.shapeModel.FillStroke.prototype
	 */
	FillStroke = function(){
	    /**
         * 名称
         * @property name
         * @type String
         * @default FillStroke
         */
	    this.name = "FillStroke";
	    
	    /**
	     * 设置填充轮廓类图形的属性
	     * @method setAttributes
	     * @param {Object} context 设置的上下文
	     */
	    this.setAttributes = function(context){
	        var 
               option = this.getOption();
               
           //设置直线属性
            context.strokeStyle = option.strokeStyle;
            context.fillStyle = option.fillStyle;
            context.lineWidth = option.lineWidth;
            context.globalAlpha = option.opacity / 100;
            context.lineJoin = option.lineJoin;
            context.lineCap = option.lineCap;
            context.shadowOffsetX = option.shadowOffsetX;
            context.shadowOffsetY = option.shadowOffsetY;
            context.shadowBlur = option.shadowBlur;
            context.shadowColor = option.shadowColor;
	    }
	};
	
	/**
     * 填充轮廓类图形超级父类原型
     * @class FillStroke.prototype
     * @static
     * @extends painter.model.shapeModel.Shape
     */
	FillStroke.prototype = new Shape();
	
	/**
	 * 直线对象
	 * @class Line
	 * @constructor
	 * @extends painter.model.shapeModel.Line.protorype 
	 */
	Line = function(){
	    /**
         * 名称
         * @property name
         * @type String
         * @default Line
         */
	    this.name = 'Line';
	    
	    /**
	     * 绘制图形
	     * @method paint
	     * @param {Object} context 绘图上下文 
	     */
	    this.paint = function(context){
	        var 
	           option = this.getOption();
	        
	        context.save();//保存上下文信
	        
	        //设置直线属性
            this.setAttributes(context);
	        
	        
	        //描述直线
	        context.beginPath();
            context.moveTo(option.startX, option.startY);
            context.lineTo(option.endX, option.endY);
                                   
            //绘制直线
            context.closePath();
            context.stroke();
            context.restore();//回复上下文
	    };
	};
	
	/**
	 * 直线对象原型
	 * @class Line.prototype
	 * @static
	 * @extends painter.model.shapeModel.FillStroke
	 */
	Line.prototype = new FillStroke();
	
	/**
     * 闭合曲线对象
     * @class CurveClosed
     * @constructor
     * @extends painter.model.shapeModel.CurveClosed.prototype 
     */
    CurveClosed = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default CurveClosed
         */
        this.name = 'CurveClosed';
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
            var 
               option = this.getOption(),
               list = option.list,
               start = list[0],
               len = list.length,
               i = 0;
            
            context.save();//保存上下文信息            
            
            //设置属性
            this.setAttributes(context);           
            
            //绘制
            context.beginPath();
            
            context.moveTo(start.x, start.y);
            for(i; i<len; i=i+1){
               context.lineTo(list[i].x, list[i].y); 
            }
            context.closePath();
            context.fill();
            context.stroke();
            context.restore();//回复上下文
        };
    };
    
    /**
     * 闭合曲线对象原型
     * @class CurveClosed.prototype
     * @static 
     * @extends painter.model.shapeModel.FillStroke
     */
    CurveClosed.prototype = new FillStroke();
    
	/**
	 * 矩形对象
	 * @class Rect
	 * @constructor
	 * @extends painter.model.shapeModel.Rect.prototype 
	 */
	Rect = function(){
	   /**
         * 名称
         * @property name
         * @type String
         * @default Rect
         */
        this.name = 'Rect';
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
            var 
               option = this.getOption();
            
            context.save();//保存上下文信息            
            
            //设置属性
            this.setAttributes(context);           
            
            //绘制
            context.fillRect(option.left, option.top, option.width, option.height);
            context.strokeRect(option.left, option.top, option.width, option.height);
            context.restore();//回复上下文
        };
	};
	
	/**
     * 矩形对象原型
     * @class Rect.prototype
     * @static 
     * @extends painter.model.shapeModel.FillStroke
     */
    Rect.prototype = new FillStroke();
    
    /**
     * 椭圆对象
     * @class Circle
     * @constructor
     * @extends painter.model.shapeModel.Circle.prototype 
     */
    Circle = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Circle
         */
        this.name = 'Circle';
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
            var 
               option = this.getOption();
            
            context.save();//保存上下文信息            
            
            //设置属性
            this.setAttributes(context);           
            
            //绘制
            context.beginPath();
            context.arc(option.x, option.y, option.radius, 0, Math.PI * 2, true);
            context.closePath();
            context.fill();
            context.stroke();
            context.restore();//回复上下文
        };
    };
    
    /**
     * 圆形对象原型
     * @class Circle.prototype
     * @static 
     * @extends painter.model.shapeModel.FillStroke
     */
    Circle.prototype = new FillStroke();
    
    //绘制椭圆方法
    function EllipesDraw(context, x, y, width, height){
       var k = (width/0.75)/2,
           w = width/2,
           h = height/2;
       context.beginPath();
       context.moveTo(x, y-h);
       context.bezierCurveTo(x+k, y-h, x+k, y+h, x, y+h);
       context.bezierCurveTo(x-k, y+h, x-k, y-h, x, y-h);
       context.closePath();
       return context;
    }
    
    /**
     * 椭圆类对象
     * @class Ellipes
     * @constructor
     * @extends painter.model.shapeModel.Ellipes.prototype 
     */
    Ellipes = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Ellipes
         */
        this.name = 'Ellipes';
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
           var 
               option = this.getOption(),
               x = option.x,
               y = option.y,
               width = option.width,
               height = option.height;
            
            context.save();//保存上下文信息            
            
            //设置属性
            this.setAttributes(context); 
            
            //描述图形
            EllipesDraw(context, x, y, width, height);        
            
            //绘制  
            context.fill();
            context.stroke();          
            context.restore();//回复上下文
        };   
    };
        
    /**
     * 椭圆类原型
     * @class Ellipes.prototype
     * @static 
     * @extends painter.model.shapeModel.FillStroke
     */
    Ellipes.prototype = new FillStroke();
    
    /**
     * 轮廓类图形超级父类
     * @class Stroke
     * @constructor
     * @extends painter.model.shapeModel.Stroke.prototype
     */
    Stroke = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default Stroke
         */
        this.name = "Stroke";
        
        /**
         * 设置填充轮廓类图形的属性
         * @method setAttributes
         * @param {Object} context 设置的上下文
         */
        this.setAttributes = function(context){
            var 
               option = this.getOption();
               
           //设置直线属性
            context.strokeStyle = option.strokeStyle;
            context.lineWidth = option.lineWidth;
            context.globalAlpha = option.opacity / 100;
            context.lineJoin = option.lineJoin;
            context.lineCap = option.lineCap;
            context.shadowOffsetX = option.shadowOffsetX;
            context.shadowOffsetY = option.shadowOffsetY;
            context.shadowBlur = option.shadowBlur;
            context.shadowColor = option.shadowColor;
        }
    };
    /**
     * 轮廓类图形超级父类原型
     * @class Stroke.prototype
     * @static
     * @extends painter.model.shapeModel.Shape
     */
    Stroke.prototype = new Shape();
    
    /**
     * 铅笔对象
     * @class Pen
     * @constructor
     * @extends painter.model.shapeModel.Pen.prototype 
     */
    Pen = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default Pen
         */
        this.name = 'Pen';
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
            var 
               option = this.getOption(),
               list = option.list,
               start = list[0],
               len = list.length,
               i = 0;
            
            context.save();//保存上下文信息            
            
            //设置属性
            this.setAttributes(context);           
            
            //绘制
            context.beginPath();
            
            context.moveTo(start.x, start.y);
            for(i; i<len; i=i+1){
               context.lineTo(list[i].x, list[i].y); 
            }
            context.stroke();
            context.restore();//回复上下文
        };
    };
    
    /**
     * 铅笔对象原型
     * @class Pen.prototype
     * @static 
     * @extends painter.model.shapeModel.Stroke
     */
    Pen.prototype = new Stroke();
    
    /**
     * 铅笔对象
     * @class CurveClosedStroke
     * @constructor
     * @extends painter.model.shapeModel.CurveClosedStroke.prototype 
     */
    CurveClosedStroke = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default "CurveClosedStroke"
         */
        this.name = 'CurveClosedStroke';
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
            var 
               option = this.getOption(),
               list = option.list,
               start = list[0],
               len = list.length,
               i = 0;
            
            context.save();//保存上下文信息            
            
            //设置属性
            this.setAttributes(context);            
            
            //绘制
            context.beginPath();
            
            context.moveTo(start.x, start.y);
            for(i; i<len; i=i+1){
               context.lineTo(list[i].x, list[i].y); 
            }
            context.closePath();
            context.stroke();
            context.restore();//回复上下文
        };
    };
    
    /**
     * 铅笔对象原型
     * @class CurveClosedStroke.prototype
     * @static 
     * @extends painter.model.shapeModel.Stroke
     */
    CurveClosedStroke.prototype = new Stroke();    
    
    /**
     * 矩形对象
     * @class RectStroke
     * @constructor
     * @extends painter.model.shapeModel.RectStroke.prototype 
     */
    RectStroke = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default 'RectStroke'
         */
        this.name = 'RectStroke';
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
            var 
               option = this.getOption();
            
            context.save();//保存上下文信息            
            
            //设置属性
            this.setAttributes(context);           
            
            //绘制
            context.strokeRect(option.left, option.top, option.width, option.height);
            context.restore();//回复上下文
        };
    };
    
    /**
     * 矩形对象原型
     * @class RectStroke.prototype
     * @static 
     * @extends painter.model.shapeModel.Stroke
     */
    RectStroke.prototype = new Stroke();      
    
    /**
     * 椭圆对象
     * @class CircleStroke
     * @constructor
     * @extends painter.model.shapeModel.CircleStroke.prototype 
     */
    CircleStroke = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default 'CircleStroke'
         */
        this.name = 'CircleStroke';
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
            var 
               option = this.getOption();
            
            context.save();//保存上下文信息            
            
            //设置属性
            this.setAttributes(context);            
            
            //绘制
            context.beginPath();
            context.arc(option.x, option.y, option.radius, 0, Math.PI * 2, true);
            context.closePath();
            context.stroke();
            context.restore();//回复上下文
        };
    };
    
    /**
     * 圆形对象原型
     * @class CircleStroke.prototype
     * @static 
     * @extends painter.model.shapeModel.Stroke
     */
    CircleStroke.prototype = new Stroke();
    
    /**
     * 椭圆类对象
     * @class EllipesStroke
     * @constructor
     * @extends painter.model.shapeModel.EllipesStroke.prototype 
     */
    EllipesStroke = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default 'EllipesStroke'
         */
        this.name = 'EllipesStroke';
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
           var 
               option = this.getOption(),
               x = option.x,
               y = option.y,
               width = option.width,
               height = option.height;
            
            context.save();//保存上下文信息            
            
            //设置属性
            this.setAttributes(context); 
            
            //描述图形
            EllipesDraw(context, x, y, width, height);       
            
            //绘制  
            context.stroke();          
            context.restore();//回复上下文
        };   
    };
        
    /**
     * 椭圆类原型
     * @class EllipesStroke.prototype
     * @static 
     * @extends painter.model.shapeModel.Stroke
     */
    EllipesStroke.prototype = new Stroke();
    
    /**
     * 橡皮类对象
     * @class Eraser
     * @constructor
     * @extends painter.model.shapeModel.Eraser.prototype 
     */
    Eraser = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default 'Eraser'
         */
        this.name = 'Eraser';
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
            var 
               option = this.getOption(),
               list = option.list,
               start = list[0],
               len = list.length,
               i = 0;
            
            context.save();//保存上下文信息            
            
            //设置属性
            context.strokeStyle = option.color;
            context.lineWidth = option.lineWidth;
            context.shadowOffsetX = option.shadowOffsetX;
            context.shadowOffsetY = option.shadowOffsetY;
            context.shadowBlur = option.shadowBlur;
            context.shadowColor = option.shadowColor;
            context.lineJoin = option.lineJoin;
            context.lineCap = option.lineCap;
            context.globalAlpha = option.opacity / 100;          
            
            //绘制
            context.beginPath();
            
            context.moveTo(start.x, start.y);
            for(i; i<len; i=i+1){
               context.lineTo(list[i].x, list[i].y); 
            }
            context.stroke();
            context.restore();//回复上下文
        };
    };
    
    /**
     * 橡皮类原型
     * @class Eraser.prototype
     * @static 
     * @extends painter.model.shapeModel.Shape
     */
    Eraser.prototype = new Shape();
    
    /**
     * 油漆桶对象
     * @class FloodFill
     * @constructor
     * @extends painter.model.shapeModel.FloodFill.prototype 
     */
    FloodFill = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default 'FloodFill'
         */
        this.name = 'FloodFill';        
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
            var 
               option = this.getOption(),
               allowance = option.allowance,
               color = option.fillStyle,
               start = color.indexOf("(") + 1,
               temp = color.slice(start, -1),
               temps = temp.split(","),
               colorObj = {
                   r:parseInt(temps[0], 10),
                   g:parseInt(temps[1], 10),
                   b:parseInt(temps[2], 10),
                   a:Math.ceil((temps[3]||1) * 255)
               },             
               x = option.x,
               y = option.y,               
               width = option.width,
               height = option.height,
               imageData = context.getImageData(0, 0, width, height),
               datas = imageData.data,
               index = (width * y + x) * 4,
               r = datas[index],
               g = datas[index + 1],
               b = datas[index + 2],
               a = datas[index + 3] / 255,
               sourceColor = "rgba(".concat(r, ",", g, ",", b, ",", a, ")"),
               sourceColorObj = {
                   r:r,
                   g:g,
                   b:b,
                   a:a
               },
               stacks = [{x:x, y:y}];
            
            function flood(stacks, allowance, width, height, datas, sourceColor, sourceColorObj, desColor, desColorObj){
                var
                    index = (width * y + x) * 4,
                    r = datas[index],
                    g = datas[index + 1],
                    b = datas[index + 2],
                    a = datas[index + 3] / 255,
                    color = "rgba(".concat(r, ",", g, ",", b, ",", a, ")"),
                    temp = null;
                
                function isNotEmpty(stacks){
                    if(stacks.length !== 0){
                        return true;
                    }
                    
                    return false;
                }
                
                while(isNotEmpty(stacks)){
                    temp = stacks.pop();
                    index = (width * temp.y + temp.x) * 4;
                    r = datas[index];
                    g = datas[index + 1];
                    b = datas[index + 2];
                    a = datas[index + 3] / 255;
                    color = "rgba(".concat(r, ",", g, ",", b, ",", a, ")");
                    
                    //如果当前像素颜色和  目的颜色相等，返回
                    if(color === desColor){
                        continue;
                    }
                    
                    //如果颜色和元颜色一样,递归
                    if((Math.abs(r - sourceColorObj.r) < allowance) && (Math.abs(g - sourceColorObj.g) < allowance) && (Math.abs(b - sourceColorObj.b) < allowance) && (Math.abs(a - sourceColorObj.a) < allowance/256)){
                        //颜色一样替换颜色为目的颜色
                        datas[index] = desColorObj.r;
                        datas[index + 1] = desColorObj.g;
                        datas[index + 2] = desColorObj.b;
                        datas[index + 3] = desColorObj.a;
                        
                        //递归
                        if(x > 0){
                            stacks.push({x:temp.x-1, y:temp.y});
                        }
                        if(x < width){
                            stacks.push({x:temp.x+1, y:temp.y});
                        }
                        if(y > 0){
                            stacks.push({x:temp.x, y:temp.y-1});
                        }
                        if(y < height){
                            stacks.push({x:temp.x, y:temp.y+1});
                        }
                    }
                }            
                
                return 0;
            }
            
            try{
                flood(stacks, allowance, width, height, datas, sourceColor, sourceColorObj, color, colorObj);
            }catch(ex){
                global.console.log(ex.message);
            }
                       
            context.save();//保存上下文信息            
            
            //绘制         
            context.putImageData(imageData, 0, 0);
            
            //回复上下文
            context.restore();
        };
    };
    
    /**
     * 油漆桶对象原型
     * @class FloodFill.prototype
     * @static 
     * @extends painter.model.shapeModel.Shape
     */
    FloodFill.prototype = new Shape();
    
    /**
     * 吸管对象
     * @class EyeDropper
     * @constructor
     * @extends painter.model.shapeModel.EyeDropper.prototype 
     */
    EyeDropper = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default 'EyeDropper'
         */
        this.name = 'EyeDropper';
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
            var 
               option = this.getOption(),
               $color = $('#tool-wrap .tool .color').eq(0),
               datas = context.getImageData(option.x, option.y, 1,1).data,
               r = datas[0],
               g = datas[1],
               b = datas[2],
               a = datas[3] / 255,
               color = "rgba(".concat(r, ",", g, ",", b, ",", a, ")");
               
            $color.spectrum("set", color);
        };
        
        /**
         * 重绘
         * @method repaint
         */  
        this.repaint = function(){
            //do nothing
        }; 
    };
    
    /**
     * 吸管对象原型
     * @class EyeDropper.prototype
     * @static 
     * @extends painter.model.shapeModel.Shape
     */
    EyeDropper.prototype = new Shape();
    
    /**
     * 十字类对象
     * @class Cross
     * @constructor
     * @extends painter.model.shapeModel.Cross.prototype 
     */
    Cross = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default 'Cross'
         */
        this.name = 'Cross';
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
           var 
               option = this.getOption(),
               x = option.x,
               y = option.y,
               len = option.length,
               line1StartX = x - len,
               line1StartY = y,
               line1EndX = x + len,
               line1EndY = y,
               line2StartX = x,
               line2StartY = y - len,
               line2EndX = x,
               line2EndY = y + len;
            
            context.save();//保存上下文信息            
            
            //设置属性
            context.strokeStyle = option.strokeStyle;
            context.lineWidth = option.lineWidth;
            context.shadowOffsetX = option.shadowOffsetX;
            context.shadowOffsetY = option.shadowOffsetY;
            context.shadowBlur = option.shadowBlur;
            context.shadowColor = option.shadowColor;
            context.lineJoin = option.lineJoin;
            context.lineCap = option.lineCap;
            context.globalAlpha = option.opacity / 100; 
            
            //描述图形
            context.beginPath();
            context.moveTo(line1StartX, line1StartY); 
            context.lineTo(line1EndX, line1EndY);
            context.moveTo(line2StartX, line2StartY); 
            context.lineTo(line2EndX, line2EndY);
            context.closePath();        
            
            //绘制  
            context.stroke();          
            context.restore();//回复上下文
        };   
    };
    
    /**
     * 十字类原型
     * @class Cross.prototype
     * @static 
     * @extends painter.model.shapeModel.Shape
     */
    Cross.prototype = new Shape();                
    
    /**
     * 文本类对象
     * @class Text
     * @constructor
     * @extends painter.model.shapeModel.Text.prototype 
     */
    Text = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default 'Text'
         */
        this.name = 'Text';
        
        /**
         * 设置填充轮廓类图形的属性
         * @method setAttributes
         * @param {Object} context 设置的上下文
         */
        this.setAttributes = function(context){
            var 
               option = this.getOption();
               
           //设置直线属性
            context.shadowOffsetX = option.shadowOffsetX;
            context.shadowOffsetY = option.shadowOffsetY;
            context.shadowBlur = option.shadowBlur;
            context.shadowColor = option.shadowColor;
            context.strokeStyle = option.strokeStyle;
            context.fillStyle = option.fillStyle;
            context.globalAlpha = option.opacity / 100;
            context.font = option.italic + " " + option.bold + " " + option.size + "px " + option.family;
            context.lineWidth = option.border;
            context.textAlign = option.textAlign;
        };
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
           var 
               option = this.getOption(),
               x = option.x,
               y = option.y,
               text = option.text;
            
            context.save();//保存上下文信息            
            
            //设置属性
            this.setAttributes(context);  
            
            //绘制图形
            context.fillText(text, x, y);       
            context.strokeText(text, x, y);          
            context.restore();//回复上下文
        };   
    };
        
    /**
     * 文本类原型
     * @class Text.prototype
     * @static 
     * @extends painter.model.shapeModel.Shape
     */
    Text.prototype = new Shape();
    
    /**
     * 文本轮廓类对象
     * @class TextStroke
     * @constructor
     * @extends painter.model.shapeModel.TextStroke.prototype 
     */
    TextStroke = function(){
       /**
         * 名称
         * @property name
         * @type String
         * @default 'TextStroke'
         */
        this.name = 'TextStroke';
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
           var 
               option = this.getOption(),
               x = option.x,
               y = option.y,
               text = option.text;
            
            context.save();//保存上下文信息            
            
            //设置属性
            this.setAttributes(context); 
            
            //绘制图形      
            context.strokeText(text, x, y);          
            context.restore();//回复上下文
        };   
    };
        
    /**
     * 文本轮廓类原型
     * @class TextStroke.prototype
     * @static 
     * @extends painter.model.shapeModel.Text
     */
    TextStroke.prototype = new Text();
    
    /**
     * 图像类对象
     * @class ImageShape
     * @constructor
     * @extends painter.model.shapeModel.ImageShape.prototype 
     */
    ImageShape = function(){
       /**
         * 名称
         * @property 'ImageShape'
         * @type String
         * @default Shape
         */
        this.name = 'ImageShape';        
        
        /**
         * 绘制矩形图形
         * @method paint
         * @param {Object} context 绘图上下文 
         */
        this.paint = function(context){
           var 
               option = this.getOption(),
               x = option.x,
               y = option.y,
               src = option.src,
               width = option.width,
               height = option.height,
               image = new Image(),
               that = this;
            
            image.src = src;
            
            image.onload = function(){
                context.save();//保存上下文信息            
            
                //设置属性
                that.setAttributes(context); 
                
                //绘制图形      
                context.drawImage(image, x, y, width, height);          
                context.restore();//回复上下文
            };            
        };   
    };
        
    /**
     * 图像类原型
     * @class ImageShape.prototype
     * @static 
     * @extends painter.model.shapeModel.Shape
     */
    ImageShape.prototype = new Shape();
	
	//添加变量
	global.painter = global.painter || {};
	global.painter.model = global.painter.model || {};
	global.painter.model.shapeModel = global.painter.model.shapeModel || {};
	global.painter.model.shapeModel.Line = Line;
	global.painter.model.shapeModel.CurveClosed = CurveClosed;
	global.painter.model.shapeModel.Rect = Rect;
	global.painter.model.shapeModel.Circle = Circle;
	global.painter.model.shapeModel.Pen = Pen;
	global.painter.model.shapeModel.CurveClosedStroke = CurveClosedStroke;
	global.painter.model.shapeModel.RectStroke = RectStroke;
    global.painter.model.shapeModel.CircleStroke = CircleStroke;
	global.painter.model.shapeModel.Eraser = Eraser;
	global.painter.model.shapeModel.FloodFill = FloodFill;
	global.painter.model.shapeModel.EyeDropper = EyeDropper;
	global.painter.model.shapeModel.Cross = Cross;
	global.painter.model.shapeModel.Ellipes = Ellipes;
	global.painter.model.shapeModel.EllipesStroke = EllipesStroke;
	global.painter.model.shapeModel.Text = Text;
	global.painter.model.shapeModel.TextStroke = TextStroke;
	global.painter.model.shapeModel.ImageShape = ImageShape;
}(jQuery, window));;/**
 * 导航栏js
 * @author 颜海镜
 * @module nav
 * @namespace painter.controler
 */
(function($, global){
    "use strict";
    
    /**
     * 导航类
     * @class Nav
     * @static 
     */
    var Nav = {
       /**
        * 初始化
        * @method init 
        */
       init:function(){
           this.bindEvent();
       },
       
       /**
        * 帮顶事件
        * @event bindEvent 
        */
       bindEvent:function(){          
           var $document = $(document);
           //帮顶导出按钮事件
           $document.delegate("#nav-file-export", "click", function(e){
                var 
                    currentCanvas = global.painter.canvas.currentCanvasContainer.getCanvas(),
                    negativeCanvas=global.painter.canvas.negativeCanvasContainer.getCanvas(),
                    image = new Image(),
                    image2 = new Image();
               var canvas	= document.createElement("canvas");
               canvas.width  = currentCanvas.width;
               canvas.height = currentCanvas.height;
               var ctx	   = canvas.getContext("2d");
                   image.src=negativeCanvas.getCanvas().toDataURL('image/png');
                   image2.src=currentCanvas.getCanvas().toDataURL('image/png');
               ctx.drawImage(image,0,0);
               ctx.drawImage(image2,0,0);
                    var $imgView = $("#save-image").get(0);
                $imgView.src = canvas.toDataURL();
            });
            
            //绑定保存按钮事件
            $document.delegate("#nav-file-save", "click", function(e){
                var currentCanvas = global.painter.canvas.currentCanvasContainer.getCanvas();
                var negativeCanvas = global.painter.canvas.negativeCanvasContainer.getCanvas();
                currentCanvas.save();//撤销上一部
                negativeCanvas.save();
                $.fn.TorangeNotice({type:'success', content:'保存成功'});//弹出提示
                window.console.log("触发保存事件");
            });
            
            //帮顶撤销按钮事件
            $document.delegate("#nav-edit-undo", "click", function(e){
                var currentCanvas = global.painter.canvas.currentCanvasContainer.getCanvas();
                currentCanvas.undo();//撤销上一部
            });
            
            //帮顶清空按钮事件
            $document.delegate("#nav-edit-clear", "click", function(e){
                var currentCanvas = global.painter.canvas.currentCanvasContainer.getCanvas();
                currentCanvas.clear();//撤销上一部            
            });
            
            //帮顶清空底片按钮事件
            $document.delegate("#nav-edit-clear-negative", "click", function(e){
                var negativeCanvas = global.painter.canvas.negativeCanvasContainer.getCanvas();
                negativeCanvas.clear();//撤销上一部            
            });
            
            //帮顶倒置按钮事件
            $document.delegate("#nav-edit-convert", "click", function(e){
                var currentCanvas = global.painter.canvas.currentCanvasContainer.getCanvas();
                currentCanvas.convert();//撤销上一部
            });
            //帮顶水平按钮事件
            $document.delegate("#nav-edit-flipx", "click", function(e){
                var currentCanvas = global.painter.canvas.currentCanvasContainer.getCanvas();
                currentCanvas.flipX();//撤销上一部
            });
            //帮顶垂直翻转按钮事件
            $document.delegate("#nav-edit-flipy", "click", function(e){
                var currentCanvas = global.painter.canvas.currentCanvasContainer.getCanvas();
                currentCanvas.flipY();//撤销上一部
            });                        
       }
    };
    
    $(document).ready(function(){
       Nav.init();//初始化导航栏 
    });
}(jQuery, window));
;/**
 * @author yan
 * @module toolModel
 * @main toolModel
 * @namespace painter.model.toolModel
 */

(function($, global){
	"use strict";
	
	var
	   //所有工具超级父类 
	   Tool,
	   //图形工具父类
	   Shape,
	   Line,
	   CurveClosed,
	   Rect,
	   Circle,
	   //椭圆工具类
       Ellipes,
	   //轮廓工具父类
	   Stroke,
	   Pen,
	   CurveClosedStroke,
	   RectStroke,
       CircleStroke,
	   Eraser,
	   FloodFill,
	   EyeDropper,
	   //十字工具类
	   Cross,	   
	   EllipesStroke,
	   //文字类
	   Text,
	   //文字轮廓类
	   TextStroke;
	
	/**
	 * 工具对象
	 * @class Tool
	 * @constructor
	 * @param {Object} option 当前工具参数
	 * @extends painter.model.toolModel.Tool.prototype
	 */
	Tool = function(option){
	    /**
         * 当前工具对应的名称
         * @property name
         * @type String
         * @default 'Tool'
         */
		this.name = 'Tool';
		
		/**
         * 当前工具对应的类名
         * @property className
         * @type String
         * @default 'shape'
         */
		this.className = "shape";
		
		/**
		 * 当前工具对应的鼠标对象
		 * @property mouse
		 * @type String
		 * @default 'Mouse'
		 */
		this.mouse = "Mouse";
		
		/**
         * 当前工具对应的参数
         * @property option
         * @type Object
         * @default {
         *  strokeStyle:'#000',
         *  fillStyle:'#000',
         *  lineWidth:1
         *}
         */
		this.option = {
			strokeStyle:'#000',
			fillStyle:'#000',
			lineWidth:1
		};
		
		//设置参数
		option !== undefined ? $.extend(this.option, option) : 0;
	};
	
	/**
	 * 工具原型
	 * @class Tool.prototype
	 * @static
	 */
	Tool.prototype = {
	    /**
         * 获取类别名字
         * @method getClassName
         * @return {String} 当前的类别名字
         */
	    getClassName:function(){
	       return this.className; 
	    },
	     
		/**
		 * 获取名字
		 * @method getName
		 * @return {String} 当前的名字
		 */
		getName:function(){
			return this.name;	
		},
		
		/**
		 * 设置工具参数对象
		 * @method setOption
		 * @param {Object} option 设置的参数集和
		 * @return {Object} 成功返回设置对象，失败返回null
		 */
		setOption:function(option){
			//检查入口参数是否是对象
			if(typeof option === 'object'){
				$.extend(true, this.option, option);
				return this.getOption();
			} 
			
			return null;
		},
		
		/**
		 * 获取工具参数对象
		 * @method getOption 
		 * @return {Object} 返回当前工具参数对象
		 */
		getOption:function(){
			return $.extend(true, {}, this.option);//放回选项对象的深拷贝
		},
		
		/**
		 * 获取当前工具对应的鼠标
		 * @method getMouse
		 * @param {String} 鼠标的索引
		 */
		getMouse:function(){
		    return this.mouse;
		}
	};
	
	/**
     * 图形类工具超级父类
     * @class Shape
     * @constructor
     * @extends painter.model.toolModel.Shape.prototype
     */
	Shape = function(){
	    /**
         * 名称
         * @property name
         * @type String
         * @default 'Shape' 
         */
	    this.name = "Shape";
	    /**
         * 当前工具对应的鼠标对象
         * @property mouse
         * @type String
         * @default 'Cross'
         */
	    this.mouse = "Cross";
	    
	    /**
	     * 初始化图形类属性面板的参数
	     * @method initAttributes
	     * @return {Object} 当前工具 参数
	     */
	    this.initAttributes = function(){
	        //获取当前属性
            var 
              $attributePanel = $('#tool-shape-attribute-panel'),
              width = $('.width',$attributePanel).eq(0).val(),
              opacity = $('.opacity',$attributePanel).eq(0).val(),
              color = $('#tool-wrap .tool .color').eq(0).val(),
              lineJoin = $(':radio[name="line-join"]',$attributePanel).val(),
              shadowOffsetX = $('.shadow-offsetx',$attributePanel).eq(0).val(),
              shadowOffsetY = $('.shadow-offsety',$attributePanel).eq(0).val(),
              shadowBlur = $('.shadow-blur',$attributePanel).eq(0).val(),
              shadowColor = $('.shadow-color',$attributePanel).eq(0).val(),
              lineCap = $(':radio[name="line-cap"]',$attributePanel).val();       
            
            //设置参数
            return this.setOption({
                lineWidth: width,
                opacity: opacity,
                strokeStyle: color,
                fillStyle:color,
                lineJoin:lineJoin,
                lineCap:lineCap,
                shadowOffsetX:shadowOffsetX,
                shadowOffsetY:shadowOffsetY,
                shadowBlur:shadowBlur,
                shadowColor:shadowColor
            });
	    };
	};
	
	/**
	 * 图形类工具原型
	 * @class Shape.prototype
	 * @static
	 * @extends painter.model.toolModel.Tool
	 */
	Shape.prototype = new Tool();
	/**
	 * 直线工具对象
	 * @class Line
	 * @constructor
	 * @extends painter.model.toolModel.Line.prototype
	 */
	Line = function(){
	    /**
	     * 名称
	     * @property name
	     * @type String
	     * @default 'Line' 
	     */
		this.name = 'Line';
		
		/**
		 * 初始化
		 * @method init 
		 * @return {Bollean} 初始化是否成功
		 */
		this.init = function(){
		    this.initAttributes();//初始化属性面板参数
		};
		
		/**
		 * 设置坐标参数参数
		 * @method setPoint
		 * @param {Object} 参数
		 * @return {Object} 设置完的参数
		 */
		this.setPoint = function(pointList){
		    var 
               startPoint = pointList.getStart(),
               endPoint = pointList.getEnd(),
               startX = startPoint.x,
               startY = startPoint.y,
               endX = endPoint.x,
               endY = endPoint.y;
               
             return this.setOption({
                 startX: startX,
                 startY: startY,
                 endX: endX,
                 endY: endY
             });
		};
	};
	
	/**
	 * 直线工具原型
	 * @class Line.prototype
	 * @static
	 * @extends painter.model.toolModel.Shape
	 */
	Line.prototype = new Shape();
	
	/**
     * 闭合曲线工具对象
     * @class CurveClosed
     * @constructor
     * @extends painter.model.toolModel.CurveClosed.prototype
     */
    CurveClosed = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'CurveClosed' 
         */
        this.name = 'CurveClosed';
        
        /**
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            this.initAttributes();//初始化属性面板参数
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var 
               list = pointList.getList();
             
             this.option.list = [];//更新当前列表  
             return this.setOption({
                 list:list
             });
        };
    };
    
    /**
     * 闭合曲线工具原型
     * @class CurveClosed.prototype
     * @static
     * @extends painter.model.toolModel.Shape
     */
    CurveClosed.prototype = new Shape();
    
    
	/**
     * 矩形工具对象
     * @class Rect
     * @constructor
     * @extends painter.model.toolModel.Rect.prototype
     */
    Rect = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'Rect' 
         */
        this.name = 'Rect';
        /**
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            this.initAttributes();//初始化属性面板参数
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var 
               startPoint = pointList.getStart(),
               endPoint = pointList.getEnd(),
               left = startPoint.x,
               top = startPoint.y,
               width = endPoint.x - left,
               height = endPoint.y - top;
               
             return this.setOption({
                 left: left,
                 top: top,
                 width: width,
                 height: height
             });
        };
    };
    
    /**
     * 矩形工具原型
     * @class Rect.prototype
     * @static
     * @extends painter.model.toolModel.Shape
     */
    Rect.prototype = new Shape();      
    
    /**
     * 椭圆工具对象
     * @class Circle
     * @constructor
     * @extends painter.model.toolModel.Circle.prototype
     */
    Circle = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'Circle' 
         */
        this.name = 'Circle';
        
        /**
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            this.initAttributes();//初始化属性面板参数
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var 
               startPoint = pointList.getStart(),
               endPoint = pointList.getEnd(),
               x = (startPoint.x + endPoint.x) / 2,//计算园中心坐标
               y = (startPoint.y + endPoint.y) / 2,
               radius = Math.abs(Math.sqrt(Math.pow(startPoint.x, 2) + Math.pow(startPoint.y, 2)) - 
                    Math.sqrt(Math.pow(endPoint.x, 2) + Math.pow(endPoint.y, 2))) / 2;
               
             return this.setOption({
                 x:x,
                 y:y,
                 radius:radius
             });
        };
    };
    
    /**
     * 圆工具原型
     * @class Circle.prototype
     * @static
     * @extends painter.model.toolModel.Shape
     */
    Circle.prototype = new Shape();
    
    /**
     * 椭圆工具对象
     * @class Ellipes
     * @constructor
     * @extends painter.model.toolModel.Ellipes.prototype
     */
    Ellipes = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'Ellipes' 
         */
        this.name = 'Ellipes';
        
        /**
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            this.initAttributes();//初始化属性面板参数
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var
                startPoint = pointList.getStart(),
                endPoint = pointList.getEnd(),
                x = (startPoint.x + endPoint.x) / 2,//计算园中心坐标
                y = (startPoint.y + endPoint.y) / 2,
                width = Math.abs(startPoint.x - endPoint.x),
                height = Math.abs(startPoint.y - endPoint.y);
            return this.setOption({
                x:x,
                y:y,
                width:width,
                height:height
            });
        };
    };
    
    /**
     * 椭圆工具原型
     * @class Ellipes.prototype
     * @static
     * @extends painter.model.toolModel.Shape
     */
    Ellipes.prototype = new Shape();
    
    
    /**
     * 轮廓类工具超级父类
     * @class Stroke
     * @constructor
     * @extends painter.model.toolModel.Stroke.prototype
     */
    Stroke = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'Stroke' 
         */
        this.name = "Stroke";
        /**
         * 当前工具对应的鼠标对象
         * @property mouse
         * @type String
         * @default 'Cross'
         */
        this.mouse = "Cross";
        
        /**
         * 初始化图形类属性面板的参数
         * @method initAttributes
         */
        this.initAttributes = function(){
            //获取当前属性
            var 
              $attributePanel = $('#tool-stroke-attribute-panel'),
              width = $('.width',$attributePanel).eq(0).val(),
              opacity = $('.opacity',$attributePanel).eq(0).val(),
              color = $('#tool-wrap .tool .color').eq(0).val(),              
              shadowOffsetX = $('.shadow-offsetx',$attributePanel).eq(0).val(),
              shadowOffsetY = $('.shadow-offsety',$attributePanel).eq(0).val(),
              shadowBlur = $('.shadow-blur',$attributePanel).eq(0).val(),
              shadowColor = $('.shadow-color',$attributePanel).eq(0).val(),
              lineJoin = $(':radio[name="line-join"]',$attributePanel).val(),
              lineCap = $(':radio[name="line-cap"]',$attributePanel).val();       
            
            //设置参数
            return this.setOption({
                lineWidth: width,
                opacity: opacity,
                strokeStyle: color,
                lineJoin:lineJoin,
                lineCap:lineCap,
                shadowOffsetX:shadowOffsetX,
                shadowOffsetY:shadowOffsetY,
                shadowBlur:shadowBlur,
                shadowColor:shadowColor
            });
        }
    };
    
    /**
     * 轮廓类工具原型
     * @class Stroke.prototype
     * @static
     * @extends painter.model.toolModel.Tool
     */
    Stroke.prototype = new Tool();
    
    /**
     * 铅笔工具对象
     * @class Pen
     * @constructor
     * @extends painter.model.toolModel.Pen.prototype
     */
    Pen = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'Pen' 
         */
        this.name = 'Pen';
        
        /**
         * 工具类对应的鼠标
         * @property mouse
         * @type String
         * @default 'Pen' 
         */
        this.mouse ="Pen";
        
        /**
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            //获取当前属性
            this.initAttributes();
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var 
               list = pointList.getList();
             
             this.option.list = [];//更新当前列表  
             return this.setOption({
                 list:list
             });
        };
    };
           
    /**
     * 铅笔工具原型
     * @class Pen.prototype
     * @static
     * @extends painter.model.toolModel.Stroke
     */
    Pen.prototype = new Stroke();
    
    /**
     * 闭合曲线工具对象
     * @class CurveClosedStroke
     * @constructor
     * @extends painter.model.toolModel.CurveClosedStroke.prototype
     */
    CurveClosedStroke = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'CurveClosedStroke' 
         */
        this.name = 'CurveClosedStroke';
        
        /**
         * 工具类对应的鼠标
         * @property mouse
         * @type String
         * @default 'Cross' 
         */
        this.mouse = "Cross";
    };
    
    /**
     * 闭合曲线工具原型
     * @class CurveClosedStroke.prototype
     * @static
     * @extends painter.model.toolModel.Pen
     */
    CurveClosedStroke.prototype = new Pen();        
    
    /**
     * 矩形工具对象
     * @class RectStroke
     * @constructor
     * @extends painter.model.toolModel.RectStroke.prototype
     */
    RectStroke = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'RectStroke' 
         */
        this.name = 'RectStroke';
        
        /**
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            //获取当前属性
            this.initAttributes();
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var 
               startPoint = pointList.getStart(),
               endPoint = pointList.getEnd(),
               left = startPoint.x,
               top = startPoint.y,
               width = endPoint.x - left,
               height = endPoint.y - top;
               
             return this.setOption({
                 left: left,
                 top: top,
                 width: width,
                 height: height
             });
        };
    };
    
    /**
     * 矩形工具原型
     * @class RectStroke.prototype
     * @static
     * @extends painter.model.toolModel.Stroke
     */
    RectStroke.prototype = new Stroke();    
    
    /**
     * 椭圆工具对象
     * @class CircleStroke
     * @constructor
     * @extends painter.model.toolModel.CircleStroke.prototype
     */
    CircleStroke = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'CircleStroke' 
         */
        this.name = 'CircleStroke';
        
        /**
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            //获取当前属性
            this.initAttributes();
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var 
               startPoint = pointList.getStart(),
               endPoint = pointList.getEnd(),
               x = (startPoint.x + endPoint.x) / 2,//计算园中心坐标
               y = (startPoint.y + endPoint.y) / 2,
               radius = Math.abs(Math.sqrt(Math.pow(startPoint.x, 2) + Math.pow(startPoint.y, 2)) - 
                    Math.sqrt(Math.pow(endPoint.x, 2) + Math.pow(endPoint.y, 2))) / 2;
               
             return this.setOption({
                 x:x,
                 y:y,
                 radius:radius
             });
        };
    };
    
    /**
     * 椭圆工具原型
     * @class CircleStroke.prototype
     * @static
     * @extends painter.model.toolModel.Stroke
     */
    CircleStroke.prototype = new Stroke();
    
    /**
     * 十字工具对象
     * @class EllipesStroke
     * @constructor
     * @extends painter.model.toolModel.EllipesStroke.prototype
     */
    EllipesStroke = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'EllipesStroke' 
         */
        this.name = 'EllipesStroke';
        
        /**
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            //获取当前属性
            this.initAttributes();
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var
                startPoint = pointList.getStart(),
                endPoint = pointList.getEnd(),
                x = (startPoint.x + endPoint.x) / 2,//计算园中心坐标
                y = (startPoint.y + endPoint.y) / 2,
                width = Math.abs(startPoint.x - endPoint.x),
                height = Math.abs(startPoint.y - endPoint.y);
            return this.setOption({
                x:x,
                y:y,
                width:width,
                height:height
            });
        };      
    };
    
    /**
     * 十字工具原型
     * @class EllipesStroke.prototype
     * @static
     * @extends painter.model.toolModel.Stroke
     */
    EllipesStroke.prototype = new Stroke();
    
    /**
     * 橡皮工具对象
     * @class Eraser
     * @constructor
     * @extends painter.model.toolModel.Eraser.prototype
     */
    Eraser = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'Eraser' 
         */
        this.name = 'Eraser';
        
        /**
         * 鼠标名称
         * @property mouse
         * @type String
         * @default 'Eraser' 
         */
        this.mouse = "Eraser";
        
        /**
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            //获取当前属性
            var 
              $attributePanel = $('#tool-eraser-attribute-panel'),
              width = $('.width',$attributePanel).eq(0).val(),
              opacity = $('.opacity',$attributePanel).eq(0).val(),
              shadowOffsetX = $('.shadow-offsetx',$attributePanel).eq(0).val(),
              shadowOffsetY = $('.shadow-offsety',$attributePanel).eq(0).val(),
              shadowBlur = $('.shadow-blur',$attributePanel).eq(0).val(),
              shadowColor = $('.shadow-color',$attributePanel).eq(0).val(),
              lineJoin = $(':radio[name="line-join"]',$attributePanel).val(),
              lineCap = $(':radio[name="line-cap"]',$attributePanel).val();       
            
            //设置参数
            return this.setOption({
                opacity: opacity,
                lineWidth: width,
                color:'#fff',
                shadowOffsetX:shadowOffsetX,
                shadowOffsetY:shadowOffsetY,
                shadowBlur:shadowBlur,
                shadowColor:shadowColor,
                lineJoin: lineJoin,
                lineCap:lineCap
            });
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var 
               list = pointList.getList();
             
             this.option.list = [];//更新当前列表  
             return this.setOption({
                 list:list
             });
        };
    };
    
    /**
     * 橡皮工具原型
     * @class Eraser.prototype
     * @static
     * @extends painter.model.toolModel.Tool
     */
    Eraser.prototype = new Tool();
    
    /**
     * 油漆桶工具对象
     * @class FloodFill
     * @constructor
     * @extends painter.model.toolModel.FloodFill.prototype
     */
    FloodFill = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'FloodFill' 
         */
        this.name = 'FloodFill';
        
        /**
         * 鼠标名称
         * @property mouse
         * @type String
         * @default 'FloodFill' 
         */
        this.mouse = "FloodFill";
        
        /**
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            //获取当前属性
            var 
              $attributePanel = $('#tool-flood-fill-attribute-panel'),
              color = $('#tool-wrap .tool .color').eq(0).val(),
              allowance = parseInt($('.allowance',$attributePanel).eq(0).val(), 10),
              canvas = global.painter.canvas.currentCanvasContainer.getCanvas(),
              width = canvas.getWidth(),
              height = canvas.getHeight();       
            
            //设置参数
            return this.setOption({
                fillStyle:color,
                width:width,
                height:height,
                allowance:allowance
            });
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var
                endPoint = pointList.getEnd(),
                x = endPoint.x,
                y = endPoint.y;
            return this.setOption({
                x:x,
                y:y
            });
        };
    };
    
    /**
     * 油漆桶工具原型
     * @class FloodFill.prototype
     * @static
     * @extends painter.model.toolModel.Tool
     */
    FloodFill.prototype = new Tool();
    
    /**
     * 吸管工具对象
     * @class EyeDropper
     * @constructor
     * @extends painter.model.toolModel.EyeDropper.prototype
     */
    EyeDropper = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'EyeDropper' 
         */
        this.name = 'EyeDropper';
        
        /**
         * 鼠标名称
         * @property mouse
         * @type String
         * @default 'EyeDropper' 
         */
        this.mouse = "EyeDropper";
        
        /**
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            //设置参数
            return this.setOption({
                
            });
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var
                endPoint = pointList.getEnd(),
                x = endPoint.x,
                y = endPoint.y;
            return this.setOption({
                x:x,
                y:y
            });
        };
    };
    
    /**
     * 吸管工具原型
     * @class FloodFill.prototype
     * @static
     * @extends painter.model.toolModel.Tool
     */
    EyeDropper.prototype = new Tool();
    
    /**
     * 十字工具对象
     * @class Cross
     * @constructor
     * @extends painter.model.toolModel.Cross.prototype
     */
    Cross = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'Cross' 
         */
        this.name = 'Cross';
        
        /**
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            //设置参数
            return this.setOption({
                lineWidth:1,
                strokeStyle:'#000000',
                length:10
            });
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var
                endPoint = pointList.getEnd(),
                x = endPoint.x,
                y = endPoint.y;
            return this.setOption({
                x:x,
                y:y
            });
        };
    };
    
    /**
     * 十字工具原型
     * @class Cross.prototype
     * @static
     * @extends painter.model.toolModel.Tool
     */
    Cross.prototype = new Tool();        
        
    
    /**
     * 十字工具对象
     * @class Text
     * @constructor
     * @extends painter.model.toolModel.Text.prototype
     */
    Text = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'Text' 
         */
        this.name = 'Text';
        
        /**
         * 鼠标名称
         * @property mouse
         * @type String
         * @default 'Text' 
         */
        this.mouse = "Text";
        
        /**
         * 初始化
         * @method init 
         * @return {Bollean} 初始化是否成功
         */
        this.init = function(){
            this.initAttributes();
        };
        
        /**
         * 初始化图形类属性面板的参数
         * @method initAttributes
         */
        this.initAttributes = function(){           
            //获取当前属性
            var 
              $attributePanel = $('#tool-text-attribute-panel'),
              opacity = $('.opacity',$attributePanel).eq(0).val(),
              text = $('.text',$attributePanel).eq(0).val(),
              size = $('.size',$attributePanel).eq(0).val(),
              border = $('.border',$attributePanel).eq(0).val(),
              family = $('.font',$attributePanel).eq(0).val(),
              bold = $('.bold',$attributePanel).eq(0).attr("checked") === "checked" ? "bold" : "",
              italic = $('.italic',$attributePanel).eq(0).attr("checked") === "checked" ? "italic" : "",
              shadowOffsetX = $('.shadow-offsetx',$attributePanel).eq(0).val(),
              shadowOffsetY = $('.shadow-offsety',$attributePanel).eq(0).val(),
              shadowBlur = $('.shadow-blur',$attributePanel).eq(0).val(),
              shadowColor = $('.shadow-color',$attributePanel).eq(0).val(),
              color = $('#tool-wrap .tool .color').eq(0).val();
            //设置参数
            return this.setOption({
                strokeStyle:color,
                opacity:opacity,
                fillStyle:color,
                text:text,
                size:size,
                border:border,
                family:family,
                bold:bold,
                italic:italic,
                shadowOffsetX:shadowOffsetX,
                shadowOffsetY:shadowOffsetY,
                shadowBlur:shadowBlur,
                shadowColor:shadowColor
            });
        };
        
        /**
         * 设置坐标参数参数
         * @method setPoint
         * @param {Object} 参数
         * @return {Object} 设置完的参数
         */
        this.setPoint = function(pointList){
            var
                startPoint = pointList.getStart(),
                endPoint = pointList.getEnd(),
                x = startPoint.x,//计算园中心坐标
                y = startPoint.y,
                textAlign = x <= endPoint.x ? "left" : "right";
            return this.setOption({
                x:x,
                y:y,
                textAlign:textAlign
            });
        };      
    };
    
    /**
     * 十字工具原型
     * @class Text.prototype
     * @static
     * @extends painter.model.toolModel.Tool
     */
    Text.prototype = new Tool();
    
    /**
     * 十字工具对象
     * @class TextStroke
     * @constructor
     * @extends painter.model.toolModel.TextStroke.prototype
     */
    TextStroke = function(){
        /**
         * 名称
         * @property name
         * @type String
         * @default 'line' 
         */
        this.name = 'TextStroke';            
    };
    
    /**
     * 十字工具原型
     * @class TextStroke.prototype
     * @static
     * @extends painter.model.toolModel.Text
     */
    TextStroke.prototype = new Text();
	
	//添加工具到数据层
	global.painter = global.painter || {};
	global.painter.model = global.painter.model || {};
	global.painter.model.toolModel = global.painter.model.toolModel || {};
	global.painter.model.toolModel.Line = Line;
	global.painter.model.toolModel.CurveClosed = CurveClosed;
	global.painter.model.toolModel.Rect = Rect;
	global.painter.model.toolModel.Circle = Circle;
	global.painter.model.toolModel.Pen = Pen;
	global.painter.model.toolModel.CurveClosedStroke = CurveClosedStroke;
	global.painter.model.toolModel.RectStroke = RectStroke;
    global.painter.model.toolModel.CircleStroke = CircleStroke;
	global.painter.model.toolModel.Eraser = Eraser;
	global.painter.model.toolModel.FloodFill = FloodFill;
	global.painter.model.toolModel.EyeDropper = EyeDropper;
	global.painter.model.toolModel.Cross = Cross;
	global.painter.model.toolModel.Ellipes = Ellipes;
	global.painter.model.toolModel.EllipesStroke = EllipesStroke;
	global.painter.model.toolModel.Text = Text;
	global.painter.model.toolModel.TextStroke = TextStroke;
}(jQuery, window));
;/**
 * 工具容器对象
 * @author yan
 * @module toolContainerModel
 * @namespace painter.model
 */

(function($, global){
    "use strict";
    
    /**
     * 工具容器对象
     * @class ToolContainerModel
     * @static
     */
    var ToolContainerModel = {
        /**
         * 当前的工具对象
         * @property tool
         * @type Object
         * @default null
         */
        tool:null,
        
        /**
         * 初始化
         * @method init
         * @param {Object} tool 设置的工具对象
         */
        init:function(tool){
            tool.init();//初始化工具
            this.setTool(tool);
        },
        
        /**
         * 设置当前工具
         * @method setTool
         * @param {Object} tool 设置的工具对象
         * @return {Bollean} 是否设置成功
         */
        setTool:function(tool){           
            this.tool = tool;           
            return true;
        },
        
        /**
         * 获取当前工具
         * @method getTool
         * @return {Object} 当前工具对象
         */
        getTool:function(){
            return this.tool;
        }
    };
    
    //添加对象到model模块
    global.painter = global.painter || {};
    global.painter.model = global.painter.model || {};
    global.painter.model.ToolContainerModel = ToolContainerModel; 
}(jQuery, window));;/**
 * 工具模块
 * @author yan
 * @module tool
 * @namespace painter.controler
 */

(function($, global){
	"use strict";
	
	var Tool;
	
	/**
	 * 工具类
	 * @class Tool
	 * @constructor
	 * @extends painter.controler.Tool.prototype
	 */
	Tool = function(){
	    /**
	     * 当前打开的工具属性面板
	     * @property currentOpenAttributePanel
	     * @type $object
	     * @default null
	     */
	    this.currentOpenAttributePanel = null;
	};
	
	/**
	 * 工具类原型
	 * @class Tool.prototype
	 * @static
	 */
	Tool.prototype = {
		/**
		 * 初始化
		 * @method init
		 */
		init:function(){
			//绑定事件
			this.bindEvent();
			
			this.initAttributePanel();
			this.initColor();
			
			//初始化当前默认工具
			global.painter.tool = global.painter.tool || {};
			global.painter.tool.currentToolContainer = Object.create(global.painter.model.ToolContainerModel);
			global.painter.tool.currentToolContainer.init(new global.painter.model.toolModel.Line());
		},
		
		/**
		 * 初始化工具属性面板
		 * @method initAttributePanel 
		 */
		initAttributePanel:function(){
		    var
		          $toolWrap = $("#tool-wrap"),
		          $at = $("footer"),
		          $attributePanels = $('.tool-attribute-panel', $toolWrap),
		          $defaultAttributePanel = $attributePanels.filter('#tool-shape-attribute-panel');  
		            
		    $attributePanels.dialog({position: {my: "right bottom", at: "right bottom", of: $at}, autoOpen: false});//初始化所有属性面板
		    
		    this.setCurrentAttributePanel($defaultAttributePanel);//设置所有面板
		    this.openAttributePanel($defaultAttributePanel);//打开当前面板
		},
		
		/**
		 * 初始化颜色工具
		 * @method initColor
		 */
		initColor:function(){
		    var   
		      $color = $("#tool-wrap .tool .color").eq(0);
            
	        $color.spectrum({
                color: "#000",
                flat: false,
                showInput: true,
                showInitial: true,
                showAlpha: true,
                localStorageKey: "spectrum",
                showSelectionPalette: true,
                clickoutFiresChange: true,
                className: "spectrum-color",
                preferredFormat: "rgb",
                showPalette: true,
                palette: [
					["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
						"rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
					["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
						"rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
					["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
						"rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
						"rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
						"rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
						"rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
						"rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
						"rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
						"rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
						"rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
						"rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
				]
            });   
		},
		
		/**
		 * 打开当前属性面板 
		 * @method openCurrentAttributePanel
		 * @param {$object} [$attributePanel=currentAttributePanel] 腰带开的面版对象
		 */
		openAttributePanel:function($attributePanel){
		    var 
                  $attributePanels = $('.tool-attribute-panel'); 
		    $attributePanel = $attributePanel || this.getCurrentAttributePanel();
		    $attributePanels.dialog('close');
		    $attributePanel.dialog('open');
		},
		/**
		 * 获取当前工具属性面板对象
		 * @method getCurrentAttributePanel 
		 * @return $object 当前属性面板对象
		 */
		getCurrentAttributePanel:function(){
		    return this.currentOpenAttributePanel;
		},
		
		/**
		 *  设置当前工具属性面板对象
		 * @method setCurrentAttributePanel 
		 * @param {$object} $attributePanel 要设置的属性面板
		 * @return {Bollean} 是否设置成功
		 */
		setCurrentAttributePanel:function($attributePanel){
		    if($attributePanel !== undefined){
		        this.currentOpenAttributePanel = $attributePanel;
		        return true;
		    } 
		    
		    return false;
		},
		/**
		 * 绑定事件
		 * @event bindEvent
		 */
		bindEvent:function(){
			var 
			     $document = $(document),
			     $toolWrap = $('#tool-wrap'),
			     that = this;
			     
			//绑定工具栏按钮点击事件，所有按钮的点击效果
			$document.delegate('#tool-wrap .tool button', 'click', function(){
			    var 
			         $this = $(this),
			         temp = $this.attr('data-tool-panel'),
			         $toolPanel = $('.tool-panel .' + temp, $toolWrap),//点击要显示面板
			         $currentToolPanel = $('.tool-panel .wrap:visible', $toolWrap),//当前可见工具面板
			         $currentToolAttributePanel = $('#tool-' + temp + '-attribute-panel'),
			         currentTool = $this.attr('data-current-tool');//当前属性工具面板			         
			    
			    //为按钮添加点击效果     
			    $('.tool button.active', $toolWrap).removeClass('active');
			    $this.addClass('active');
			    
			    //操作工具面板
			    $currentToolPanel.hide();
			    $toolPanel.show();
			    
			    //操作属性面板
			    that.setCurrentAttributePanel($currentToolAttributePanel);//设置所有面板
                that.openAttributePanel($currentToolAttributePanel);//打开当前面板
                
                //新建工具类，更新当前工具类
                //初始化当前默认工具
                global.painter.tool.currentToolContainer.init(new global.painter.model.toolModel[currentTool]());
			});
			
			//工具面板按钮点击事件
			$document.delegate("#tool-wrap .tool-panel .wrap > button", 'click', function(e){
			    var 
			         $this = $(this),
			         dataTool = $this.attr('data-tool'),
			         dataToolClass = $this.attr('data-tool-class'),
			         $tool = $("#tool-wrap .tool button[data-tool-panel='" + dataTool + "']");
			         
		         $tool.attr('data-current-tool', dataToolClass);//更新按钮点击事件
		         $tool.trigger('click');//触发点击事件
			});
			
			//绑定颜色更改事件
			$document.delegate("#tool-wrap .color", "change", function(e){
			    var 
			         color = $(this).val(),
			         currentTool = global.painter.tool.currentToolContainer.getTool();
			         
			     currentTool.setOption({
			         fillStyle:color,
			         strokeStyle:color
			     });
			});
			
			//绑定属性面板属性更改事件
			$document.delegate('.tool-attribute-panel input[type!="checkbox"][type!="radio"],.tool-attribute-panel select', "change", function(e){
			    var
			         $this = $(this),
			         attr = $this.attr('data-attr'),
			         value = $this.val(),
			         currentTool = global.painter.tool.currentToolContainer.getTool(),
			         option = {},
			         $info = $this.next("span");
			    
			    //更新当前工具对象参数     
			    option[attr] = value;
			    currentTool.setOption(option);
			    
			    //更新提示
			    $info.html(value);
			});
			//绑定属性面板复选框属性更改事件
			$document.delegate('.tool-attribute-panel :checkbox', "change", function(e){
                var
                     $this = $(this),
                     attr = $this.attr('data-attr'),
                     value = $this.val(),
                     checked = $this.prop("checked"),
                     currentTool = global.painter.tool.currentToolContainer.getTool(),
                     option = {};
                
                //更新当前工具对象参数     
                option[attr] = checked === true ? value : "";//获取数据
                currentTool.setOption(option);
                
                window.console.log(checked);
                document.getA
            });
            //绑定属性面板单选框属性更改事件
            $document.delegate('.tool-attribute-panel :radio', "change", function(e){
                var
                     $this = $(this),
                     attr = $this.attr('data-attr'),
                     value = $this.val(),
                     currentTool = global.painter.tool.currentToolContainer.getTool(),
                     option = {};
                
                //更新当前工具对象参数     
                option[attr] = value;//获取数据
                currentTool.setOption(option);
            });
		}
	};
	
	$(document).ready(function(){
	    var tool = new Tool();
	    tool.init();
	});
}(jQuery, window));;/**
 * 画布对象
 * @author yan
 * @module canvasModel
 * @namespace painter.model
 */
(function($, global){
    "use strict";
    
    /**
     * 画布对象
     * @class CanvasModel
     * @constructor
     * @extends painter.model.CanvasModel.prototype
     */
    var CanvasModel = function(){
        /**
         * 当前画布对象帮顶的画布元素
         * @property canvas
         * @type {Object}
         * @default null
         */
        this.canvas = null;
        
        /**
         * 当前画布的名称
         * @property name
         * @type String
         * @default "Canvas"
         */
        this.name = "Canvas";
        
        /**
         * 当前画布上的图形对象队列
         * @property shapeList
         * @type Array
         * @default []
         */
        this.shapeList = [];
        
        /**
         * 当前画布的覆盖方式
         * @property convertStatus
         * @type String
         * @default 'source-over'
         */
        this.convertStatus = 'source-over';
        
        /**
         * 当前画布的x轴翻转状态
         * @property flipXStatus
         * @type Bollean
         * @default false
         */
        this.flipXStatus = false;
        
        /**
         * 当前画布的y轴翻转状态
         * @property flipYStatus
         * @type Bollean
         * @default false
         */
        this.flipYStatus = false;
        
        /**
         * 当前画布的宽度
         * @property width
         * @type Number
         * @default 1000
         */
        this.width = 1000;
        
        /**
         * 当前画布的高度
         * @property height
         * @type Number
         * @default 400
         */
        this.height = 400;
        
        /**
         * 当前的画布上下文
         * @property context2D
         * @type Object
         * @default null
         */
        this.context2D = null;
        
        /**
         * 当前画布元素距离页面顶端的高度
         * @property top
         * @type Number
         * @default 0
         */
        this.top = 0;
        
        /**
         * 当前画布元素距离页面左边的宽度
         * @property left
         * @type Number
         * @default 0
         */
        this.left = 0;        
    };
    
    /**
     * 画布对象原型
     * @class CanvasModel.prototype
     * @static
     */
    CanvasModel.prototype = {
        /**
         * 初始化画布类对象
         * @method init
         * @param {Object} canvas 要绑定的画布对象
         */
        init:function(canvas, name){
           this.initCanvas(canvas); //初始化画布对象
           this.initHeight();//初始化画布高度
           this.initWidth();//初始化画布宽度
           this.initLeft();//初始化left
           this.initTop();//初始化top
           this.initContext2D();//初始化上下文对象
           this.initName(name);
           this.load();//载入图形
        },
        
        /**
         * 初始化画布名称
         * @method initName
         * @param {String} name 名称
         */
        initName:function(name){
            this.setName(name);
        },
        
        /**
         * 设置画布名称
         * @method setName
         * @param {String} name 名称
         */
        setName:function(name){
            this.name = name;  
        },
        
        /**
         * 获取画布名称
         * @method getName
         * @return {String} 名称
         */
        getName:function(){
           return this.name; 
        },
        
        /**
         * 初始化画布对象
         * @method initCanvas
         * @param {object} canvas 画布对象
         */
        initCanvas:function(canvas){
           this.setCanvas(canvas);
        },
        
        /**
         * 设置当前画布对象帮顶的画布元素
         * @method setCanvas
         * @param {Object} 设置的对象
         */
        setCanvas:function(canvas){
            if(canvas !== undefined && canvas !== null){
                this.canvas = canvas;
                return true;
            }
            
            return false;
        },
        
        /**
         * 获取当前画布对象帮顶的画布元素
         * @method getCanvas
         * @return (Object) 当前画布对象
         */
        getCanvas:function(){
            return this.canvas;
        },
        
        /**
         * 初始化上下文对象
         * @method initContext2D
         */
        initContext2D:function(){
           this.setContext2D();
        },
        
        /**
         * 获取2d上下文
         * @method getContext2D
         * @return {Object} 画布2D上下文对象
         */
        getContext2D:function(){
            return this.context2D;
        },
        
        /**
         * 设置2d上下文
         * @method setContext2D
         * @param {Object} context2D 要设置的上下文对象，若唯恐默认为当前画布的上下文
         */
        setContext2D:function(context2D){
            context2D = context2D || this.getCanvas().getContext('2d');
            this.context2D = context2D;
        },
        
        /**
         * 清除当前上下文
         * @method clearContext
         * @return {Object} 画图上下文
         */
        clearContext:function(){
            var
                height = this.getHeight(),
                width = this.getWidth(),
                context = this.getContext2D();
            
            context.clearRect(0, 0, width, height);
            
            return context;
        },
        
        /**
         * 初始化left
         * @method initLeft
         */
        initLeft:function(){
            this.updateLeft();
        },
        
        /**
         * 更新top
         * @method updateLeft
         * @return {Number} 返回left值
         */
        updateLeft:function(){
            var
                canvas = this.getCanvas(),
                left = 0;
            function getElementLeft(element){
                var 
                    actuaLeft = element.offsetLeft,
                    current = element.offsetParent;
                    
                while(current !== null){
                    actuaLeft += current.offsetLeft;
                    current = current.offsetParent;
                }
                
                return actuaLeft;
            }
            left = getElementLeft(canvas);
            this.left =left;
            return left;
        },
        
        /**
         * 获取left
         * @method getLeft
         * @return {Number} left值
         */
        getLeft:function(){
            return this.left;
        },
        
        /**
         * 初始化top
         * @method initTop
         */
        initTop:function(){
            this.updateTop();
        },
        
        /**
         * 更新top
         * @method updateTop
         * @return {Number} 返回Top值
         */
        updateTop:function(){
            var
                canvas = this.getCanvas(),
                top = 0;
            function getElementTop(element){
                var 
                    actuaTop = element.offsetTop,
                    current = element.offsetParent;
                    
                while(current !== null){
                    actuaTop += current.offsetTop;
                    current = current.offsetParent;
                }
                
                return actuaTop;
            }
            
            top = getElementTop(canvas);
            this.top =top;
            return top;
        },
        
        /**
         * 获取Top
         * @method getTop
         * @return {Number} Top值
         */
        getTop:function(){
            return this.top;
        },
        
        /**
         * 更新尺寸
         * @method updateSize
         */
        updateSize:function(){
            this.updateHeight();
            this.updateWidth();
            this.repaint();//重绘画布
        },
        
        /**
         * 初始化高度
         * @method initHeight
         */
        initHeight:function(){
            this.updateHeight();  
        },
        
        /**
         * 更新高度,更新画布元素高度为父元素高度，并设置画布类高度
         * @method updateHeight
         * @return {Number} 更新后画布的高度
         */
        updateHeight:function(){
            var 
                canvas = this.getCanvas(),
                $canvas = $(canvas),
                $canvasWrap = $canvas.parent(),
                height = $canvasWrap.height();
                
            $canvas.attr('height', height);
            
            return this.setHeight(height);   
        },
        
        /**
         * 设置当前画布类对象高度
         * @method setHeight
         * @param {Number} [height=600] 要设置的高度
         * @return {Number} 设置的高度
         */
        setHeight:function(height){
           height = height || 600;
           this.height = height;
           return height;
        },
        
        /**
         * 获取当前花布列对象高度
         * @method getHieght
         * @return {Number} 高度
         */
        getHeight:function(){
           return this.height; 
        },
        
        /**
         * 初始化高度
         * @method initWidth
         */
        initWidth:function(){
            this.updateWidth();  
        },
        
        /**
         * 更新高度,从画布元素重新获取高度
         * @method updateWidth
         * @return {Number} 当前画布高度
         */
        updateWidth:function(){
            var 
                canvas = this.getCanvas(),
                $canvas = $(canvas),
                $canvasWrap = $canvas.parent(),
                width = $canvasWrap.width();
                
            $canvas.attr('width', width);
            return this.setWidth(width);
        },
        
        /**
         * 设置当前画布类对象高度
         * @method setWidth
         * @param {Number} [width=600] 要设置的高度
         * @return {Number} 当前画布高度
         */
        setWidth:function(width){
           width = width || 600;
           this.width = width;
           
           return this.width;
        },
        
        /**
         * 获取当前花布列对象高度
         * @method getWidth
         * @return {Number} 高度
         */
        getWidth:function(){
           return this.width; 
        },                
        
        /**
         * 初始化图形队列
         * @method initShapeList
         */
        initShapeList:function(){
           this.clearShapeList(); 
        },
        
        /**
         * 获取图形列表
         * @method getShapeList
         * @return {Array} 返回图形列表的深拷贝
         */
        getShapeList:function(){
           return $.extend(true, [], this.shapeList);
        },
        
        /**
         * 设置图形列表
         * @method setShapeList
         * @param {Array} list 图形列表
         * @return {Array} 图形列表 
         */
        setShapeList:function(list){
            this.clearShapeList();//先清除
            //深拷贝参数
            $.extend(true, this.shapeList, list);
            
            return list;
        },
        
        /**
         * 添加一个图形
         * @method addShape
         * @param {Object} shape 要添加的图形对象
         */
        addShape:function(shape){
            this.shapeList.push(shape);
        },
        
        /**
         * 删除队尾图形
         * @method deleteShape
         */
        deleteShape:function(){
            this.shapeList.pop();
        },
        
        /**
         * 清除图形队列
         * @method clearShapeList
         * 
         */
        clearShapeList:function(){
            this.shapeList = [];
        },
        
        /**
         * 绘制一个图形当当前画布
         * @method paint
         * @param {Object} shape 要绘制的图形
         */
        paint:function(shape){
            this.addShape(shape);
            shape.paint(this.getContext2D());//绘制图像到当前画布
        },
        
        /**
         * 重绘当前画布
         * @method repaint
         */
        repaint:function(){
            var 
                context = null,
                list = this.shapeList,
                len = list.length,
                i = 0;
           context = this.clearContext();//清除当前画布     
           
           for(i; i<len; i=i+1){
               list[i].paint(context);
           } 
        },
        
        /**
         * 撤销上一步操作
         * @method undo
         */
        undo:function(){
            this.deleteShape();
            this.repaint();
        },
        
        /**
         * 清除画布对象
         * @method clear
         */
        clear:function(){
            this.clearContext();
            this.clearShapeList();
        },
        
        /**
         * 反置图形
         * @method convert
         */
        convert:function(){
            var
                context = this.getContext2D(),
                tempx = context.globalCompositeOperation,
                globalCompositeOperation = (this.convertStatus === "source-over" ? "destination-over" : "source-over");
            this.convertStatus = globalCompositeOperation;
            context.globalCompositeOperation = globalCompositeOperation;
            this.repaint();
            context.globalCompositeOperation = tempx;
        },
        
        /**
         * 存储数据
         * @method save
         * @param {String} name 要保存的名字
         */
        save:function(name){
            var
                storage = new global.painter.model.StorageModel(),
                tempList = [],
                list = this.shapeList,
                len = list.length,
                i = 0,
                key = this.getName(),
                value = '';
            if(name!=undefined){
                key=name;
            }
            storage.init();    
            if(storage.getStorage() !== false){
                for(i; i<len; i=i+1){
                    tempList[i] = {
                        name:list[i].getName(),
                        option:list[i].getOption()
                    };
                }
                value = global.JSON.stringify(tempList);
                storage.save(key, value);               
            }                                   
        },
        
        /**
         * 载入数据
         * @method load
         * @param {String} name 要读取的名字
         */
        load:function(name){
            var
                storage = new global.painter.model.StorageModel(),
                tempList = [],
                len ,
                i = 0,
                key = this.getName(),
                value,
                list = this.shapeList;
            if(name!=undefined){
                key=name;
            }
            storage.init();    
            if(storage.getStorage() !== false){
                value = storage.load(key) || '[]';
                tempList = global.JSON.parse(value);//转换
                len = tempList.length;
                for(i; i<len; i=i+1){
                    list[i] = new global.painter.model.shapeModel[tempList[i].name]();
                    list[i].init(tempList[i].option);
                }
                
                //重绘
                this.repaint();
            }
        },
        
        /**
         * 自动保存
         * @method autoSave
         * @param {Number} time 多长时间自动保存一次
         */
        autoSave:function(time){
            var that = this;
            global.setInterval(function(){
                that.save();
                $.fn.TorangeNotice({type:'info', content:'自动为您保存图片'});//弹出提示
            }, time);
        },
        
        /**
         * 画布x轴翻转
         * @method flipX
         */
        flipX:function(){
            var
                context = this.getContext2D(),
                width = this.getWidth();
            // 水平“翻转”画布
            context.save();
            if(!this.flipXStatus){
                this.flipXStatus = true;
                context.translate(width, 0);
                context.scale(-1, 1);
            }else{
                this.flipXStatus = false;
            }            
            this.repaint();
            // 画布恢复正常
            context.restore();
        },
        
        /**
         * 画布y轴翻转
         * @method flipX
         */
        flipY:function(){
            var
                context = this.getContext2D(),
                height = this.getHeight();
            // 水平“翻转”画布
            context.save();
            if(!this.flipYStatus){
                this.flipYStatus = true;
                context.translate(0, height);
                context.scale(1, -1);
            }else{
                this.flipYStatus = false;
            } 
            this.repaint();
            // 画布恢复正常
            context.restore();
        }
    };
    
    global.painter = global.painter || {};
    global.painter.model = global.painter.model || {};
    global.painter.model.CanvasModel = CanvasModel;
}(jQuery, window));;/**
 * 画布容器对象
 * @author yan
 * @module canvasContainerModel
 * @namespace painter.model
 */
(function($, global){
    "use strict";
    
    /**
     * 画布容器对象
     * @class CanvasContainerModel
     * @static
     */
    var CanvasContainerModel = {
        /**
         * 画布对象
         * @property canvas
         * @type Object
         * @default null
         */
        canvas:null,
        
        /**
         * 初始化
         * @method init
         */
        init:function(canvas){
            this.setCanvas(canvas);
        },
        
        /**
         * 设置当前画布容器的画布对象
         * @method setCanvas
         * @param {Object} canvas 帮顶的画布对象
         * @return {Bollean} 是否设置成功
         */
        setCanvas:function(canvas){    
            this.canvas = canvas;       
            return true;
        },
        
        /**
         * 获取当前画布容器的画布对象
         * @method getCanvas
         * @return {Object} 当前画布对象
         */
        getCanvas:function(){
            return this.canvas;
        }
    };    
    
    //添加对象到model模块
    global.painter = global.painter || {};
    global.painter.model = global.painter.model || {};
    global.painter.model.CanvasContainerModel = CanvasContainerModel;
}(jQuery, window));;/**
 * 画布控制器
 * @author yan
 * @module canvas
 * @namespace painter.controler
 */

(function($, global){
    "use strict";
    
    /**
     * 画布类
     * @class Canvas
     * @static
     */
    var Canvas = {
        /**
         * 当前鼠标点击状态
         * @property clickStatus
         * @type Bollean
         * @default false
         */
        clickStatus:false,
        
        /**
         * 鼠标移动点的坐标
         * @property startPoint
         * @type Object
         */
        pointList:Object.create(global.painter.model.PointList),
        
        /**
         * 设置开始点 
         * @method getPointList
         * @return {Object} 坐标点列表对象
         */
        getPointList:function(){
            return this.pointList;
        },
        
        /*
         * 检查鼠标状态
         * @method getClickStatus
         * @return {Bollean} 当前鼠标点击状态
         */
        getClickStatus:function(){
           return this.clickStatus; 
        },
        /**
         * 设置鼠标点击状态
         * @method setClickStatus
         * @param {Bollean} status 是否按下鼠标
         * @return {Bollean} status
         */
        setClickStatus:function(status){
            status = status || false;
            this.clickStatus = status;
            return status; 
        },
        
        /**
         * 初始化
         * @method init
         */
        init:function(){
            var
            
                negativeCanvasDom = $('.canvas-negative').get(0),
                negativeCanvas = new global.painter.model.CanvasModel(),
                negativeCanvasContainer = Object.create(global.painter.model.CanvasContainerModel),
                
                currentCanvasDom = $('.canvas-layer').get(0),
                currentCanvas = new global.painter.model.CanvasModel(),
                currentCanvasContainer = Object.create(global.painter.model.CanvasContainerModel),
                
                bufferCanvasDom = $('.canvas-buffer').get(0),
                bufferCanvas = new global.painter.model.CanvasModel(),
                bufferCanvasContainer = Object.create(global.painter.model.CanvasContainerModel),
                
                mouseCanvasDom = $('.canvas-mouse').get(0),
                mouseCanvas = new global.painter.model.CanvasModel(),
                mouseCanvasContainer = Object.create(global.painter.model.CanvasContainerModel);
            
            //初始化当前缓冲画布
            negativeCanvas.init(negativeCanvasDom, "negativeCanvas");
            negativeCanvasContainer.init(negativeCanvas);
            global.painter = global.painter || {};
            global.painter.canvas = global.painter.canvas || {};
            global.painter.canvas.negativeCanvasContainer = negativeCanvasContainer;
                
            //初始化当前画布
            currentCanvas.init(currentCanvasDom, "currentCanvas");
            currentCanvas.autoSave(60000);//1分钟自动保存一次
            currentCanvasContainer.init(currentCanvas);
            global.painter = global.painter || {};
            global.painter.canvas = global.painter.canvas || {};
            global.painter.canvas.currentCanvasContainer = currentCanvasContainer;
            
            //初始化当前缓冲画布
            bufferCanvas.init(bufferCanvasDom, "bufferCanvas");
            bufferCanvasContainer.init(bufferCanvas);
            global.painter = global.painter || {};
            global.painter.canvas = global.painter.canvas || {};
            global.painter.canvas.bufferCanvasContainer = bufferCanvasContainer;
            
            //初始化鼠标画布
            mouseCanvas.init(mouseCanvasDom, "mouseCanvas");
            mouseCanvasContainer.init(mouseCanvas);
            global.painter = global.painter || {};
            global.painter.canvas = global.painter.canvas || {};
            global.painter.canvas.mouseCanvasContainer = mouseCanvasContainer;
            
            this.bindEvent();//版定事件
        },
        
        /**
         * 帮顶事件
         * @method bindEvent
         */
        bindEvent:function(){
            var
                $document = $(document),
                mouseCanvas = global.painter.canvas.mouseCanvasContainer.getCanvas(),
                bufferCanvas = global.painter.canvas.bufferCanvasContainer.getCanvas(),
                currentCanvas = global.painter.canvas.currentCanvasContainer.getCanvas(),
                offsetLeft = mouseCanvas.getLeft(),
                offsetTop = mouseCanvas.getTop(),
                that = this,
                
                //当前的工具
                currentTool = global.painter.tool.currentToolContainer.getTool();
               
            //绑定鼠标画布图层鼠标移动事件
            $document.delegate('#canvas-mouse', 'mousemove', function(e){
                var
                    point = null,
                    pointList = null,
                    index = "",
                    shape = null,
                    option = null,
                    status = that.getClickStatus(),
                    mouseTool = null,
                    mouse = '',
                    mouseOption = null,
                    mouseShape = null,
                    className = currentTool.getClassName();
                    
                //判断工具是否为图形类
                if(className === "shape"){
                    point = {
                        x:e.pageX - offsetLeft,
                        y:e.pageY - offsetTop
                    };                                
                    mouse = currentTool.getMouse();//获取鼠标名称
                    mouseOption = currentTool.getOption();//获取参数
                    mouseShape = new global.painter.model.mouseModel[mouse]();//创建鼠标对象                            
                    mouseShape.init(mouseOption, point);//初始化鼠标图形
                    //绘制鼠标图形到鼠标层
                    mouseCanvas.clear();
                    mouseCanvas.paint(mouseShape); 
                    
                    
                    //鼠标按下绘制图形操作
                    if(status){     
                        index = currentTool.getName();
                        //添加鼠标坐标
                        pointList = that.getPointList();
                        pointList.add(point);                                                                                               
                        option = currentTool.setPoint(pointList);  
                        
                        shape = new global.painter.model.shapeModel[index]();  
                        shape.init(option); 
                        bufferCanvas.clear();
                        bufferCanvas.paint(shape);  
                    }
                }                                           
            });
            
            //绑定鼠标按下事件
            $document.delegate('#canvas-mouse', 'mousedown', function(e){
                var
                    point = {
                        x:e.pageX - offsetLeft,
                        y:e.pageY - offsetTop
                    },
                    pointList = that.getPointList(),
                    index = '',
                    shape = null,
                    option = null;
                
                that.getPointList().init();//初始化坐标列表    
                that.getPointList().add(point);//添加鼠标坐标
                that.setClickStatus(true);                                
            });
            
            //绑定鼠标弹起事件
            $document.delegate('#canvas-mouse', 'mouseup', function(e){
                var
                    point = {
                        x:e.pageX - offsetLeft,
                        y:e.pageY - offsetTop
                    },
                    pointList = that.getPointList(),
                    index = currentTool.getName(),
                    shape = null,
                    option = null,
                    className = currentTool.getClassName();
                if(className === "shape"){
                    that.getPointList().add(point);//添加鼠标坐标
                    that.setClickStatus(false);//更新鼠标点击状态
                    //绘制图形
                    shape = new global.painter.model.shapeModel[index]()
                    option = currentTool.setPoint(pointList);    
                    shape.init(option); 
                    currentCanvas.paint(shape);
                    
                    bufferCanvas.clear();//清除缓冲画布
                }                    
            });
            
            //绑定鼠标离开
            $document.delegate('#canvas-mouse', 'mouseleave', function(e){
                mouseCanvas.clear();
            });
            
            //绑定鼠标进入
            $document.delegate('#canvas-mouse', 'mouseenter', function(e){
                mouseCanvas.clear();
                //更新当前工具
                currentTool = global.painter.tool.currentToolContainer.getTool();
            });
            
            //绑定鼠标画布图层鼠标移动事件
            document.getElementById('canvas-mouse').addEventListener('touchmove', function(e){
                var
                    point = null,
                    pointList = null,
                    index = "",
                    shape = null,
                    option = null,
                    status = that.getClickStatus(),
                    mouseTool = null,
                    mouse = '',
                    mouseOption = null,
                    mouseShape = null,
                    className = currentTool.getClassName(),
                    touch = e.changedTouches[0];
                
                e.preventDefault();    
                //判断工具是否为图形类
                if(className === "shape"){
                    point = {
                        x:touch.pageX - offsetLeft,
                        y:touch.pageY - offsetTop
                    };                                
                    mouse = currentTool.getMouse();//获取鼠标名称
                    mouseOption = currentTool.getOption();//获取参数
                    mouseShape = new global.painter.model.mouseModel[mouse]();//创建鼠标对象                            
                    mouseShape.init(mouseOption, point);//初始化鼠标图形
                    //绘制鼠标图形到鼠标层
                    mouseCanvas.clear();
                    mouseCanvas.paint(mouseShape); 
                    
                    
                    //鼠标按下绘制图形操作
                    if(status){     
                        index = currentTool.getName();
                        //添加鼠标坐标
                        pointList = that.getPointList();
                        pointList.add(point);                                                                                               
                        option = currentTool.setPoint(pointList);  
                        
                        shape = new global.painter.model.shapeModel[index]();  
                        shape.init(option); 
                        bufferCanvas.clear();
                        bufferCanvas.paint(shape);  
                    }
                }                                           
            }, false);
            
            //绑定鼠标按下事件
            document.getElementById('canvas-mouse').addEventListener('touchstart', function(e){
                var
                    touch = e.touches[0],
                    point = {
                        x:touch.pageX - offsetLeft,
                        y:touch.pageY - offsetTop
                    },
                    pointList = that.getPointList(),
                    index = '',
                    shape = null,
                    option = null;
                
                e.preventDefault();
                that.getPointList().init();//初始化坐标列表    
                that.getPointList().add(point);//添加鼠标坐标
                that.setClickStatus(true);                                
            }, false);
            
            //绑定鼠标弹起事件
            document.getElementById('canvas-mouse').addEventListener('touchend', function(e){
                var
                    touch = e.changedTouches[0],
                    point = {
                        x:touch.pageX - offsetLeft,
                        y:touch.pageY - offsetTop
                    },
                    pointList = that.getPointList(),
                    index = currentTool.getName(),
                    shape = null,
                    option = null,
                    className = currentTool.getClassName();
                    
                e.preventDefault();
                if(className === "shape"){
                    that.getPointList().add(point);//添加鼠标坐标
                    that.setClickStatus(false);//更新鼠标点击状态
                    //绘制图形
                    shape = new global.painter.model.shapeModel[index]()
                    option = currentTool.setPoint(pointList);    
                    shape.init(option); 
                    currentCanvas.paint(shape);
                    
                    bufferCanvas.clear();//清除缓冲画布
                }                    
            }, false);
        }
    };
    
    $(document).ready(function(){
       Canvas.init(); 
    });
}(jQuery, window));;/**
 * 主页js
 * @module index
 * @namespace painter.controler
 */
(function($, global){
    "use strict";
    
    /**
     * 主页
     * @class Index
     * @static 
     */
    var Index = {
        /**
         * 初始化
         * @method init 
         */  
         init:function(){
             this.bindEvent();
         },
         
         /**
          * 帮顶事件
          * @event bindEvent
          */
         bindEvent:function(){
             var
                $document = $(document),
                fileResult = null,
                imageResult = null;
             
             //帮顶关闭事件
             $(window).bind("beforeunload", function(e){
                 $("#nav-file-save").trigger('click');//触发撤销按钮事件
                 return "图片尚未导出，您确定离开吗？";
             });
             // $(window).unload(function(e){
             //     $("#nav-file-save").trigger('click');//触发撤销按钮事件
             // });
             //绑定撤销键盘事件ctrl+z   
             $document.bind("keydown", function(e){
                if(e.ctrlKey && e.keyCode === 90){
                    //撤销事件
                    $("#nav-edit-undo").trigger('click');//触发撤销按钮事件
                    e.preventDefault();//阻止默认事件
                }         
             });
             //帮顶保存键盘事件ctrl+s
             $document.bind("keydown", function(e){
                if(e.ctrlKey && e.keyCode === 83){
                    //撤销事件
                    $("#nav-file-save").trigger('click');//触发撤销按钮事件
                    e.preventDefault();//阻止默认事件
                }         
             });
             
             //帮顶清楚事件
             $document.bind("keydown", function(e){
                if(e.ctrlKey && e.keyCode === 68){
                    //撤销事件
                    $("#nav-edit-clear").trigger('click');//触发撤销按钮事件
                    e.preventDefault();//阻止默认事件
                }         
             });
             
             //帮顶导出事件
             $document.bind("keydown", function(e){
                if(e.ctrlKey && e.keyCode === 69){
                    //撤销事件
                    $("#nav-file-export").trigger('click');//触发撤销按钮事件
                    e.preventDefault();//阻止默认事件
                }         
             }); 
             //帮顶倒置事件
             $document.bind("keydown", function(e){
                if(e.ctrlKey && e.keyCode === 82){
                    //撤销事件
                    $("#nav-edit-convert").trigger('click');//触发撤销按钮事件
                    e.preventDefault();//阻止默认事件
                }         
             });
             
             //帮顶水平翻转快捷键事件
             $document.bind("keydown", function(e){
                if(e.ctrlKey && e.keyCode === 72){
                    //撤销事件
                    $("#nav-edit-flipx").trigger('click');//触发撤销按钮事件
                    e.preventDefault();//阻止默认事件
                }         
             });
             //帮顶垂直翻转反转事件
             $document.bind("keydown", function(e){
                if(e.ctrlKey && e.keyCode === 86){
                    //撤销事件
                    $("#nav-edit-flipy").trigger('click');//触发撤销按钮事件
                    e.preventDefault();//阻止默认事件
                }         
             });
             
             //绑定窗口大小改变事件
             $(global).bind("resize", function(e){
                 var 
                    canvas = global.painter.canvas,
                    currentCanvas = canvas.currentCanvasContainer.getCanvas(),
                    bufferCanvas = canvas.bufferCanvasContainer.getCanvas(),
                    mouseCanvas = canvas.mouseCanvasContainer.getCanvas(),
                    negativeCanvas = global.painter.canvas.negativeCanvasContainer.getCanvas();
                 //更新各个画布   
                 currentCanvas.updateSize();
                 bufferCanvas.updateSize();
                 mouseCanvas.updateSize();
                 negativeCanvas.updateSize();
             });
             
             //=================================================
             //帮顶导入底片模态框事件
             
             //文件输入框改变事件
             $document.delegate("#negative-modal-file", "change", function(e){
                 var
                    files = e.target.files,
                    reader = new FileReader();
                 
                 reader.readAsDataURL(files[0]);
                 
                 reader.onload = function(){
                     var
                     
                         $negativeModal = $("#negative-modal"),
                         $view = $("#negative-modal-view", $negativeModal);
                     fileResult = reader.result;
                     $view.attr("src", reader.result);
                     
                     $view.bind("load", function(){
                         var
                         
                             $negativeModal = $("#negative-modal"),
                             $width = $("#negative-modal-width", $negativeModal),
                             $height = $("#negative-modal-height", $negativeModal);
                         $width.val($(this).width());
                         $height.val($(this).height());
                     });                     
                 }; 
             });
             
             //确定事件
             $document.delegate("#negative-modal-ok", "click", function(e){
                 var
                    negativeCanvas = global.painter.canvas.negativeCanvasContainer.getCanvas(),
                    image = new global.painter.model.shapeModel.ImageShape(),
                    $negativeModal = $("#negative-modal"),
                    x = $("#negative-modal-x", $negativeModal).val(),
                    y = $("#negative-modal-y", $negativeModal).val(),
                    width = $("#negative-modal-width", $negativeModal).val(),
                    height = $("#negative-modal-height", $negativeModal).val();                 
                 
                 image.init({
                     x:x,
                     y:y,
                     width:width,
                     height:height,
                     src: fileResult
                 });
                 
                 negativeCanvas.paint(image);  
             });
             
              //=================================================
             //帮顶导入图片模态框事件
             
             //文件输入框改变事件
             $document.delegate("#image-modal-file", "change", function(e){
                 var
                    files = e.target.files,
                    reader = new FileReader();
                 
                 reader.readAsDataURL(files[0]);
                 
                 reader.onload = function(){
                     var
                     
                         $imageModal = $("#image-modal"),
                         $view = $("#image-modal-view", $imageModal);
                     imageResult = reader.result;
                     $view.attr("src", reader.result);
                     
                     $view.bind("load", function(){
                         var
                         
                             $imageModal = $("#image-modal"),
                             $width = $("#image-modal-width", $imageModal),
                             $height = $("#image-modal-height", $imageModal);
                         $width.val($(this).width());
                         $height.val($(this).height());
                     });                     
                 };                
             });
             
             //确定事件
             $document.delegate("#image-modal-ok", "click", function(e){
                 var
                    currentCanvas = global.painter.canvas.currentCanvasContainer.getCanvas(),
                    image = new global.painter.model.shapeModel.ImageShape(),
                    $imageModal = $("#image-modal"),
                    x = $("#image-modal-x", $imageModal).val(),
                    y = $("#image-modal-y", $imageModal).val(),
                    width = $("#image-modal-width", $imageModal).val(),
                    height = $("#image-modal-height", $imageModal).val();                 
                 
                 image.init({
                     x:x,
                     y:y,
                     width:width,
                     height:height,
                     src: imageResult
                 });
                 
                 currentCanvas.paint(image);                   
             });
         }
    };
    
    $(document).ready(function(){
        Index.init();
    });
}(jQuery, window));
;/*
	提示信息插件
	版权所有：橙译中科信息技术有限公司
	开发者：Xh
	修改者 颜海镜
	
	TorangeNotice:提示插件，在屏幕中央显示滑动消逝信息
	TorangeAlert:弹窗提示插件，类似于alert
	TorangeConfirm：类似于confirm

*/


$.fn.extend({  
	/**
	 *param {string} 提示框类型 error,warning,info,success
	*/
	TorangeNotice:function(setting){
		var 
			//消失速度
			speed=setting._speed||3000,
			doc_height=document.documentElement.clientHeight,
			doc_width=document.documentElement.clientWidth,
			type = setting.type || 'info',
			contentMap = {'error':'错误:',
						  'warning':'警告:',
						  'info':'提示:',
						  'success':'成功:'},
			content = setting.content || '...',
			colorMap = {'error':'rgba(197, 61, 54, 0.8)',
						'warning':'rgba(249, 163, 42, 0.8)',
						'info':'rgba(0, 68, 204, 0.8)',
						'success':'rgba(81, 163, 81, 0.8)'};

		var elem=$("<div></div>");
		elem.html(contentMap[type] + content);
		var cssObj={"position":"absolute","top":0,"left":0,"z-index":1000,"font-size":"22px","max-width":"500px","background-color":colorMap[type],"color":'#ffffff',"border-radius": "5px","-webkit-border-radius": "5px","padding":"20px 25px",
				"box-shadow": "12px 12px 20px #bbb","text-align":"center","opacity":"1"};
		elem.css(cssObj);
		elem.appendTo($("body"));
		elem.css("top",(doc_height-elem.height())/2);
		elem.css("left",(doc_width-elem.width())/2);
		
		elem.animate({
			opacity:'0.2',
			top:'-=50'
		},speed,function(){
			elem.remove();
		})
	},
});
!function( $ ){
	//确认框
	function TorangeConfirm(el,options)
	{
		this.el=$(el);
		this.confirmBtn=undefined;
		this.cancelBtn=undefined;
		this.options={
			"title":"提示",
			"onSuccess":null,
			"para1":"",
			"para2":"",
			"para3":null
			
		};
		this.setOptions(options);
		this.initialize();
	}
	
	$.fn.torangeConfirm=function(options){	
		return new TorangeConfirm(this.get(0),options);
		
	};
	
	TorangeConfirm.prototype={
		setOptions:function(options){
			var o = this.options;
			$.extend(o, options);
		},
		initialize:function(){
			var c='<div class="modal hidden" id="confirm_modal">';
				c+='	<form class="form-horizontal" onsubmit="return false;">';
				c+='<input type="hidden" id="confirm_hidden1"/>';
				c+='		<div class="modal-header">';
				c+='			<button type="button" class="close" data-dismiss="modal">×</button>';
				c+='			<h3>提示</h3>';
				c+='		</div>';
				c+='		<div class="modal-body">';
				c+='			<p>'+this.options.title+'</p>';
				
				c+=' </div>';
				c+='<div class="modal-footer"> '; 
				c+='	<button class="btn btn-primary" id="confirmbox_btn">&nbsp;确定&nbsp;</button>';
				c+='	<button class="btn" id="cancelbox_btn">&nbsp;取消&nbsp;</button>';
				
				c+=' </div>';
				c+='</form>	';
				c+='</div>';
			$(c).appendTo(this.el);
			if(this.confirmBtn==undefined)
				this.confirmBtn=$("#confirmbox_btn");
			if(this.cancelBtn==undefined)
				this.cancelBtn=$("#cancelbox_btn");
			var me=this;
			this.confirmBtn.bind("click",function(){me.confirmDo();});
			this.cancelBtn.bind("click",function(){me.cancelDo();});
			
			$("#confirm_modal").modal({"backdrop":'static','show':true});
		},
		confirmDo:function(){
			$("#confirm_modal").modal("hide");
			this.options.onSuccess(this.options.para1,this.options.para2,this.options.para3);
			this.confirmBtn.unbind("click");
			this.cancelBtn.unbind("click");
			$("#confirm_modal").remove();
		},
		cancelDo:function(){
			$("#confirm_modal").modal("hide");
			this.confirmBtn.unbind("click");
			this.cancelBtn.unbind("click");
			$("#confirm_modal").remove();
		}
	};
	
}( window.jQuery || window.ender );;/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-canvas-canvastext-input-inputtypes-localstorage-shiv-cssclasses-testprop-testallprops-domprefixes-load
 */
;window.Modernizr=function(a,b,c){function y(a){j.cssText=a}function z(a,b){return y(prefixes.join(a+";")+(b||""))}function A(a,b){return typeof a===b}function B(a,b){return!!~(""+a).indexOf(b)}function C(a,b){for(var d in a){var e=a[d];if(!B(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function D(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:A(f,"function")?f.bind(d||b):f}return!1}function E(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+o.join(d+" ")+d).split(" ");return A(b,"string")||A(b,"undefined")?C(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),D(e,b,c))}function F(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)s[c[d]]=c[d]in k;return s.list&&(s.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),s}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),r[a[d]]=!!e;return r}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={},r={},s={},t=[],u=t.slice,v,w={}.hasOwnProperty,x;!A(w,"undefined")&&!A(w.call,"undefined")?x=function(a,b){return w.call(a,b)}:x=function(a,b){return b in a&&A(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=u.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(u.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(u.call(arguments)))};return e}),q.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},q.canvastext=function(){return!!e.canvas&&!!A(b.createElement("canvas").getContext("2d").fillText,"function")},q.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}};for(var G in q)x(q,G)&&(v=G.toLowerCase(),e[v]=q[G](),t.push((e[v]?"":"no-")+v));return e.input||F(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)x(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},y(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return C([a])},e.testAllProps=E,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+t.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};;/**
 * @author yan
 * @module loading
 * @namespace painter.controler
 */

(function($, global){
    "use strict";
    var dataURL="";
    var load = 1;
    var w=0;
    var h=0;
    var LocString=String(window.document.location.href);
    function GetQueryString(str){
        var rs=new RegExp("(^|)"+str+"=([^&]*)(&|$)","gi").exec(LocString),tmp;
        if(tmp=rs)return tmp[2];
        return "";
    }
    var messagePrefix="data:";
    window.addEventListener("message",function(e){
        var origin= (e.originalEvent||e).origin;
        if(origin!=location.origin)
            return;
        if(typeof e.data!="string")
            return;
        if(e.data.slice(0,5)==messagePrefix){
            dataURL=e.data;
        }
    });
    //window.addEventListener("storage",function(e){
    //    console.log(e);
    //});
    function drawCanvas(){
        // var negativeCanvas = global.painter.canvas.negativeCanvasContainer.getCanvas();
        var currentCanvas = global.painter.canvas.currentCanvasContainer.getCanvas();
        var image = new global.painter.model.shapeModel.ImageShape();
        if(dataURL!=""){
            image.init({
                x:0,
                y:0,
                width:w,
                height:h,
                src: dataURL
            });
            currentCanvas.paint(image);
        }else {
            setTimeout(drawCanvas,1000);
        }

    }
    //载入成功后执行
    $(function(){
        $(function(){
            //载入完成，检测环境
            var
                $loading = $("#loading"),
                $load = $(".load", $loading),
                $check = $(".check", $loading),
                $checkResult = $(".check-result", $loading),
                checkCanvas = false,
                $checkCanvas = $(".check-canvas", $checkResult),
                $checkCanvasSpan = $("span", $checkCanvas),
                checkCanvasText = false,
                $checkCanvasText = $(".check-canvas-text", $checkResult),
                $checkCanvasTextSpan = $("span", $checkCanvasText),
                checkRange = false,
                $checkRange = $(".check-range", $checkResult),
                $checkRangeSpan = $("span", $checkRange),
                $select = $(".select", $checkResult),
                $sorry = $(".sorry", $checkResult),
                result = false;
                
            $load.hide();
            $check.show();
            $checkResult.show();
            
            //检查功能
            if(Modernizr.canvas === true){
                checkCanvas = true;
                $checkCanvasSpan.removeClass("unsupport").addClass("support");
            }
            if(Modernizr.canvastext){
                checkCanvasText = true;
                $checkCanvasTextSpan.removeClass("unsupport").addClass("support");
            }
            if(Modernizr.inputtypes.range){
                checkRange = true;
                $checkRangeSpan.removeClass("unsupport").addClass("support");
            }
            
            //全部通过检测自动跳转
            if(checkCanvas && checkCanvasText && checkRange){


                $loading.fadeOut();
                //var src=GetQueryString("src");
                 w=GetQueryString("w");
                 h=GetQueryString("h");
                if(w!=""&&h!=""){
                    drawCanvas();
                }
            }
            
            //主要功能通过检测
            if(checkCanvas){
                $select.show();
                $("button", $select).click(function(){
                    $loading.fadeOut();
                });
            }else{
                $sorry.show();
            }
        });        
    });           
}(jQuery, window));
