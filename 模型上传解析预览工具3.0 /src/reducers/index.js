import { combineReducers } from 'redux'
import {  routerReducer, } from 'react-router-redux'

import {
    GET_FILES_OF_APPKEY,
    GET_FAILED_FILES_OF_APPKEY,
    CLEAR_OUT_BOS_STATE,
    GET_UPLOADED_MODELS
} from '../actions'

const initialState ={
    succeedfiles:[],
    failedFiles:[],
    uploadedFiles:[]
}

const bos = (state=initialState,action) =>{
    const {files} = action
    switch(action.type){

        case GET_FILES_OF_APPKEY:
            return{
                ...state,
                succeedfiles:files,
            }
        case GET_FAILED_FILES_OF_APPKEY:
            return{
                ...state,
                failedFiles:files
            }
        case GET_UPLOADED_MODELS:
            return{
                ...state,
                uploadedFiles:[
                    ...state.uploadedFiles,
                    files
                ]
            }
        case CLEAR_OUT_BOS_STATE:
            return initialState
        default:
            return state
    }
}

export default combineReducers({
    bos,
    router:routerReducer,
})