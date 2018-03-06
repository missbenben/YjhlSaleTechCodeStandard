/**
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
			$document.delegate('.tool-attribute-panel,textarea,input[type!="checkbox"][type!="radio"],.tool-attribute-panel select', "change", function(e){
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
                // document.getA
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
}(jQuery, window));