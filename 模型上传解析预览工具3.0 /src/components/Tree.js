import React, { Component } from 'react';
import FileButton from './FileButton'
import { connect } from 'react-redux'
import { fetchFilesOfAppKey } from '../actions'


class Tree extends Component {


    componentDidMount(){
        const { getFiles} = this.props

        const storage = window.sessionStorage

        const accessToken = storage.getItem('accessToken')
        const appkey = storage.getItem('appkey')

        console.log("执行Tree的componentDidUpdate")
        console.log("Tree的DidUpdate执行的时候都有没有accessToken",appkey,accessToken)
         getFiles(appkey,accessToken)

    }

    nameOrder = (a,b) =>{
        return (a.name < b.name )? -1 : 1
    }

    render(){
        const {vizBIM,files} = this.props

        console.log("Tree的files====================",files)

            return (
                <div className="tree" >
                    {!this.props.files && <h3>没有文件</h3>}
                    {this.props.files &&  this.props.files.map( f => <FileButton key={f.code}
                                                                               fname={f.name}
                                                                               fkey={f.code}
                                                                               fstatus={f.status}
                                                                               vizBIM={vizBIM}

                    />)}
                </div>
            )
        }

}

const mapStateToProps = (state) =>({
    files:state.bos.succeedfiles
})

const mapDispatchToProps = (dispatch) =>({
    getFiles:(appkey,access)=>dispatch(fetchFilesOfAppKey(appkey,access))
})

export default connect(mapStateToProps,mapDispatchToProps)(Tree)
