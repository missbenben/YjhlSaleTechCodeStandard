/**
 * Created by win7 on 2016/6/7.
 */
jQuery(function($){
    //var LocString=String(window.document.location.href);
    //function GetQueryString(str){
    //    var rs=new RegExp("(^|)"+str+"=([^&]*)(&|$)","gi").exec(LocString),tmp;
    //    if(tmp=rs)return tmp[2];
    //    return "";
    //}
    //var src=GetQueryString("src");
    //var w=GetQueryString("w");
    //var h=GetQueryString("h");
    //if(src!=""&&w!=""&&h!=""){
    //    var currentCanvas = global.painter.canvas.currentCanvasContainer.getCanvas();
    //    var image = new global.painter.model.shapeModel.ImageShape();
    //    image.init({
    //        x:0,
    //        y:0,
    //        width:w,
    //        height:h,
    //        src: src
    //    });
    //    currentCanvas.paint(image);
    //}

    var base64EncodeChars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var base64DecodeChars=newArray(
        -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
        -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
        -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,
        52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,
        -1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,
        15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,
        -1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
        41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);
    function base64encode(str)
    {
        var returnVal,i,len;
        var c1,c2,c3;
        len=str.length;
        i=0;
        returnVal="";
        while(i<len)
        {
            c1=str.charCodeAt(i++)&0xff;
            if(i==len)
            {
                returnVal+=base64EncodeChars.charAt(c1>>2);
                returnVal+=base64EncodeChars.charAt((c1&0x3)<<4);
                returnVal+="==";
                break;
            }
            c2=str.charCodeAt(i++);
            if(i==len)
            {
                returnVal+=base64EncodeChars.charAt(c1>>2);
                returnVal+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));
                returnVal+=base64EncodeChars.charAt((c2&0xF)<<2);
                returnVal+="=";
                break;
            }
            c3=str.charCodeAt(i++);
            returnVal+=base64EncodeChars.charAt(c1>>2);
            returnVal+=base64EncodeChars.charAt(((c1&0x3)<<4)|((c2&0xF0)>>4));
            returnVal+=base64EncodeChars.charAt(((c2&0xF)<<2)|((c3&0xC0)>>6));
            returnVal+=base64EncodeChars.charAt(c3&0x3F);
        }
        return returnVal;
    }
    function base64decode(str)
    {
        var c1,c2,c3,c4;
        var i,len,returnVal;
        len=str.length;
        i=0;
        returnVal="";
        while(i<len)
        {
            /*c1*/
            do
            {
                c1=base64DecodeChars[str.charCodeAt(i++)&0xff];
            }while(i<len&&c1==-1);
            if(c1==-1)
                break;
            /*c2*/
            do
            {
                c2=base64DecodeChars[str.charCodeAt(i++)&0xff];
            }while(i<len&&c2==-1);
            if(c2==-1)
                break;
            returnVal+=String.fromCharCode((c1<<2)|((c2&0x30)>>4));
            /*c3*/
            do
            {
                c3=str.charCodeAt(i++)&0xff;
                if(c3==61)
                    return returnVal;
                c3=base64DecodeChars[c3];
            }while(i<len&&c3==-1);
            if(c3==-1)
                break;
            returnVal+=String.fromCharCode(((c2&0XF)<<4)|((c3&0x3C)>>2));
            /*c4*/
            do
            {
                c4=str.charCodeAt(i++)&0xff;
                if(c4==61)
                    return returnVal;
                c4=base64DecodeChars[c4];
            }while(i<len&&c4==-1);
            if(c4==-1)
                break;
            returnVal+=String.fromCharCode(((c3&0x03)<<6)|c4);
        }
        return returnVal;
    }

});