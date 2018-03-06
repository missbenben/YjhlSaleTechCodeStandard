import React,{ Component } from 'react'
import VizBim from './VizBim'
import Tree from './Tree'

class ShowModel extends Component{


    render(){
        const storage = window.sessionStorage
        const accessToken = storage.getItem('accessToken')
        const appkey = storage.getItem('appkey')

        return(
            <VizBim  accessToken={accessToken} appKey={appkey}>
                <Tree />
            </VizBim>
        )
    }

}

export default ShowModel

