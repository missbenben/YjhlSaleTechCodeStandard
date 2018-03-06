import React,{Component}from 'react';
import {Button,Icon} from 'antd'
import { analyzeModel } from '../utils/api'
import {message, notification, } from "antd/lib/index";

class AnalyzeFailedButton extends Component {


    clickBtn = (filekey,filename) => {

        const storage = window.sessionStorage

        const accessToken = storage.getItem('accessToken')
        const appkey = storage.getItem('appkey')
        const hide = message.loading(`服务器正在拼命解析${filename}中，请耐心等待...`,0)

        analyzeModel(appkey,accessToken,filekey)
            .then(respones => {
                console.log("解析后的返回值是什么=========",respones)
                if(respones.status === 200) {
                    return respones.json()
                    console.log("模型解析成功后的返回值是什么=========",respones.json())

                }
            })
            .then(responsJson =>{
                if(responsJson.status === "3.0"){
                    console.log("responsJson.status === 3.0后的返回值是什么=========",responsJson)

                    hide()
                    notification.open({
                        message: '解析成功',
                        description: `恭喜你，${filename}解析成功了！`,
                        duration: 0,
                        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
                    })
                }
                if(responsJson.status === "-1") {
                    hide()
                    notification.open({
                        message: '解析成功',
                        description: `非常抱歉，${filename}解析失败！`,
                        duration: 0,
                        icon: <Icon type="frown" style={{ color: '#108ee9' }} />,
                    })
                }
                return responsJson
            })
            .catch(error => {
                console.log("解析发生错误=========",error)
                hide()
                notification.open({
                    message: '超时',
                    description: `非常抱歉，${filename}解析超时`,
                    duration: 0,
                    icon: <Icon type="meh" style={{ color: '#108ee9' }} />,
                });
            })

    }


    render() {

        const {filekey,  file,} = this.props


            return (
                <Button className='tree_btn'
                        onClick={() => this.clickBtn(filekey,file.name)}>
                    {file.name.split(".")[0]}
                    {file.status && `-------status:${file.status}`}
                </Button>
            )


    }



}





export default AnalyzeFailedButton