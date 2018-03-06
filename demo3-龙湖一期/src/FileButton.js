import React,{Component}from 'react';
import Button from 'antd/lib/button'

class FileButton extends Component {

    state={
        show:true,
        currentModel:null,
        currentComponents:null
    }

    clickBtn = (code,status) => {
        console.log("当前点击的filekey是============", code)
        console.log("当前点击的file的status是============", status)


        this.state.currentModel ===null && this.props.bim.showModelByDocumentId(code, (id) => {
            //let startTime  = new Date().getTime();
            console.log("加载成功的模型id为————————————————————————————————————", id)

            this.setState({currentModel:code})

            // let endTime  = new Date().getTime();
            // alert(`模型加载总用时:${(endTime-startTime)/60000}min`)
        })

        this.state.currentComponents === null && fetch(`http://api.rickricks.com/v1/ma05576872d6444eb09fde7bf56a3e6a/files/${code}`, {
            headers: {
                'Authorization': `AccessToken ${this.props.access}`
            }
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log("根据模型模型的构建为===========", responseJson)
                return responseJson.relationship.irIFCComponent.components
            })
            .then(components => {
                console.log("根据模型模型的components为===========", components)
                return components.map(component => component.uri.slice(82))
            })
            .then(componentCodeArray => {
                console.log("根据模型模型的componentCode为===========", componentCodeArray)
                // console.log("根据模型模型的this.props.bim为===========", this.props.bim)
                // this.props.changeCurComponents(componentCodeArray)
                // this.props.bim.hideObjs(componentCodeArray)
                // this.props.bim.highlightObjs(componentCodeArray)
                this.setState({currentComponents:componentCodeArray})


            })

                if ( this.state.currentComponents ) {
                            if(!this.state.show){

                                this.props.bim.showObjs(this.state.currentComponents)
                                this.setState((preState)=>({show:!preState.show}))

                             }
                            else {
                                this.props.bim.hideObjs(this.state.currentComponents)
                                this.setState((preState)=>({show:!preState.show}))
                            }

                    console.log("当前点击的button的currentComponents——————————————————————————====",this.state.currentComponents)
                    console.log("当前点击的button的show——————————————————————————====",this.state.show)
                }

    }


    render(){

        const {fkey,fstatus,fname} = this.props
        return(
            <Button className='tree_btn' onClick={()=>this.clickBtn(fkey,fstatus)}>{fname.split(".")[0]}</Button>
        )
    }



 }

 export default FileButton