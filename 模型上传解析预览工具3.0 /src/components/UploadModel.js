import React,{ Component } from 'react'
import {  Icon,  Button, Upload,message,List,notification } from 'antd';
import { uploadFiles,analyzeModel } from '../utils/api'
import {getUploadedFiles} from '../actions'
import { connect } from 'react-redux'

class UploadModel extends Component{

    state = {
        files:[],
        appkey:window.sessionStorage.getItem('appkey'),
        accessToken:window.sessionStorage.getItem('accessToken'),
    }

    /**
     * @date:2017/12/9 18:33
     * @author:liuyuan
     * @description:重写文件上传方法，因为需要监听上传进度，所以用了原始的XMLHttpRequest方法
     * @params: { object }  obj   : 回调函数的参数
     * @params:
     * @return:
     * @example:

     */




    customRequest = (obj) =>{

        let form = new FormData()
        form.append('file',obj.file)

        const updateProgress = (event) => {
            obj.onProgress({percent:(event.loaded/event.total*100)})
        }

        const stateChange = (event) =>{
            if(request.readyState === 4){
                if(request.status === 201) {
                    obj.onSuccess(message.success(`${obj.file.name} 上传成功了！`))
                    const fileLocation = request.getResponseHeader('Location')
                    const file = {fileName:obj.file.name,fileKey:fileLocation.split('/').pop()}
                    this.setState((preState)=>({files:[...preState.files,file]}))
                    this.props.dispatch(getUploadedFiles(file))
                    this.analyzeSingleModel(file.fileKey,file.fileName)

                }else{
                    obj.onError( message.error(`${obj.file.name} 文件上传失败！请重试！`))
                }
            }
        }
        const request = new XMLHttpRequest()
        uploadFiles(request,this.state.appkey,this.state.accessToken,updateProgress,stateChange,form)

    }

    analyzeModels =() =>{

        let fileArray = this.props.uploadFiles

        fileArray.length !== 0 && fileArray.forEach((file) =>this.analyzeSingleModel(file.fileKey,file.fileName))

    }


    analyzeSingleModel = (fk,filename) =>{
        const hide = message.loading(`服务器正在拼命解析${filename}中，请耐心等待...`,0)

        analyzeModel(this.state.appkey,this.state.accessToken,fk)
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
                        message: '解析失败',
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

    render(){

        console.log("UploadMpdel的this.state=========",this.state)

        const props={
            customRequest:this.customRequest,
            multiple : true
        }
        // let fileKeys = this.state.files.map(file =>file.fileKey)
        let fileKeys = this.props.uploadFiles.map(file =>(`fileName:${file.fileName} fileyKey:${file.fileKey}`))


        return(
            <div className='upload-container'>

                <Button onClick={this.analyzeModels} className='analyzeBtn'>一键解析</Button>

                <div className='uaBtn'>
                    <Upload {...props} className='upload'>
                        <Button>
                            <Icon type="upload" /> 点击上传文件
                        </Button>
                    </Upload>

                </div>

                <div className='apartAnaBtn'>
                        <List
                            header={<div>已经上传成功的filesKey</div>}
                            footer={<div>盈嘉互联</div>}
                            bordered
                            dataSource={fileKeys}
                            renderItem={item => (<List.Item>{item}</List.Item>)}
                        />
                        {this.props.uploadFiles.length !== 0  && this.props.uploadFiles.map(file =>
                            <Button className='analyza-btn'
                                    key={file.fileName}
                                    onClick={()=>this.analyzeSingleModel(file.fileKey,file.fileName)}>解析{file.fileName}
                            </Button>

                        )}
                 </div>
            </div>
        )
    }

}

const mapStateToProps = (state) =>({
    uploadFiles:state.bos.uploadedFiles
})

export default connect(mapStateToProps)(UploadModel)

