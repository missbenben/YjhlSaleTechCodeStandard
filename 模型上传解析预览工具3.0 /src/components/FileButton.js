import React,{Component}from 'react';
import {Button,message} from 'antd'
import { fetchComponentsOfFilekey } from '../utils/api'

class FileButton extends Component {

    state={
        button:true,
        show:false,
        components:null
    }


    clickBtn = (filekey) => {

        const { vizBIM, } = this.props
        const storage = window.sessionStorage

        const accessToken = storage.getItem('accessToken')
        const appkey = storage.getItem('appkey')

        if (!this.state.components) {

            console.log("fetchComponentsOfFileKey的参数----------------", appkey, accessToken, filekey)

            this.setState((preState) => ({button: !preState.button}))


            vizBIM.showModelByDocumentId(filekey, (id) => {
                console.log("加载成功的模型id为————————————————————————————————————", id)
                this.setState((preState)=>({show:!preState.show}))
            })

            const hide = message.loading('正在获取模型组件', 0);


            fetchComponentsOfFilekey(appkey,accessToken,filekey)
                .then(componentCodeArray => {
                    console.log("根据模型模型的componentCode为===========", componentCodeArray)
                    this.setState((preState) => ({components: componentCodeArray, button: !preState.button}))
                    hide()
                    return componentCodeArray
                })
        } else {

            if (!this.state.show) {

                vizBIM.showObjs(this.state.components)
                this.setState((preState) => ({show: !preState.show}))

            }
            else {

                vizBIM.hideObjs(this.state.components)
                this.setState((preState) => ({show: !preState.show}))
            }

        }

    }


    render() {

            console.log("FileButton的state============",this.state)

        const {fkey,  fname,} = this.props

            if (!this.state.button) {
                return (
                    <Button className='tree_btn'
                            disabled
                            icon={this.state.show ? "folder-open" : "folder"}
                            onClick={() => this.clickBtn(fkey)}>
                            {fname.split(".")[0]}
                    </Button>
                )

            }

            return (
                <Button className='tree_btn'
                        icon={this.state.show ? "folder-open" : "folder"}
                        onClick={() => this.clickBtn(fkey)}>
                    {fname.split(".")[0]}
                </Button>

            )
    }



 }





export default FileButton