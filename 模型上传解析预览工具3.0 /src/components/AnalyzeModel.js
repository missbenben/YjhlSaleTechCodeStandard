import React,{Component} from 'react'
import { Card} from 'antd';
import { fetchFailedFilesOfAppKey } from '../actions'
import { connect } from 'react-redux'
import AnalyzeFailedButton from './AnalyzeFailedButton'





class AnalyzeModel extends Component{



    componentDidMount(){

        const storage = window.sessionStorage

        const accessToken = storage.getItem('accessToken')
        const appkey = storage.getItem('appkey')
        this.props.failedFiles.length === 0 && this.props.fetchFailedFiles(appkey,accessToken)

    }



    render(){
        console.log("this.props=========",this.props)

        return(
            <div className="analyze-model">
                <div className="analyze-model-card">
                    <Card title="说明" bordered={false} style={{ width: 300 }}>
                        <p>右侧显示的是已经上传到数据库但是没有解析成功的files</p>
                        <p>点击相应的按钮会进行解析</p>
                    </Card>
                </div>

                <div  className="analyze-model-tree">
                    {this.props.failedFiles.length === 0 && '没有失败的数据'}
                {this.props.failedFiles.length !== 0  && this.props.failedFiles.map(file =>
                    <AnalyzeFailedButton
                        key={file.code}
                        filekey={file.code}
                        file={file}


                />)
                }
                </div>
            </div>

        )
    }

}
//.filter(f =>f.hasOwnProperty('status') === false)
//.filter(file =>file.name.substr(0,1) === 'R' || file.name.substr(0,1) === 'S')
//.filter(file =>file.name.substr(0,1) === 'R' || file.name.substr(0,1) === 'S')
const mapStateToProps = (state) =>({
    failedFiles:state.bos.failedFiles
})

const mapDispatchToProps = (dispatch) =>({
    fetchFailedFiles:(appkey,accessToken)=>dispatch(fetchFailedFilesOfAppKey(appkey,accessToken))
})


export default connect(mapStateToProps,mapDispatchToProps)(AnalyzeModel)

