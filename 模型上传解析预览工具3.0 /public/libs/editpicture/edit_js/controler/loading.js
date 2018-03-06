/**
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
                $loading = $("#loadingcheck"),
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
