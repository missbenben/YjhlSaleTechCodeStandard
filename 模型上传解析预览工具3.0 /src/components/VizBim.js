/**
 * @date:2017/12/14 09:23
 * @author:liuyuan
 * @description:组件说明：    被包裹的子组件会被传入一个值为 vizBIM 的对象，即在子组件内部可通过this.props.vizBIM访问。
 * @params:  { accessToken }  ：登录BOS后返回的 accessToken
 * @params:  { appKey }       ：BOS平台所创建的 appKey
 * @return:  BIMWINNER.Viewer 对象, 会被放到id为"viwport"的div里，设置样式
 * @example:

 */



import React, { Component, } from 'react'
import { baseaddress,beinsideaddress } from '../utils/api'

function renderChildren(props,state) {

    return React.Children.map(props.children,child => React.cloneElement(child,{vizBIM:state.vizBim}))
}


class VizBim extends Component{

    state={
        vizBim:null
    }


    componentDidMount(){

        console.log(" VizBim的componentDidUpdate方法的props================------------=========",this.props)


        let op = {
            //注意这里需要和上面创建<div>的id名称一样
            viewport:'viewport',
            baseaddress: `${baseaddress}/`,
            type:"app",
            accessToken:this.props.accessToken,
            appKey:this.props.appKey,
            imgURL:"https://bp-alpha.rickricks.com/vizbimRepository/libs/viewerplus/3.0.0/css/img"
        };

        //创建一个主对象，将上面配置好的参数放入
        let vizBim = new window.BIMWINNER.Viewer(op)

        vizBim.autoResize=false

        vizBim.resize(780,1000)

        vizBim.listentoSelectObjs( (aaa, bbb) =>{
            console.log("你点击的组件是---------------",aaa)
            console.log("你点击的组件是---------------",bbb)
        });

        // 创建工具栏。 创建Tool对象时需要上一步中创建的主对象作为参数传递到Tool对象中去。
        var tool = new window.BIMWINNER.Tool(vizBim)
        tool.createTool()

        console.log("创建的BIMWINNER====================", vizBim)

        this.setState({vizBim})

    }


    render(){
        console.log("VizBIM的state============",this.state)
        return(
            <div  className='container'>
                <div className="model" id="viewport"/>
                {renderChildren(this.props,this.state)}
            </div>
        )
    }

}


export default VizBim




