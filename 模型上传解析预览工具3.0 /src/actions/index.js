import {fetchAnalyzeSuccceedFiles,fetchAnalyzeFailedFiles } from '../utils/api'
export const GET_FILES_OF_APPKEY = 'GET_FILES_OF_APPKEY'
export const GET_FAILED_FILES_OF_APPKEY = 'GET_FAILED_FILES_OF_APPKEY'
export const CLEAR_OUT_BOS_STATE = 'CLEAR_OUT_BOS_STATE'
export const GET_UPLOADED_MODELS = 'GET_UPLOADED_MODELS'

/**
 * @date:2017/12/12 13:32
 * @author:liuyuan
 * @description:拿到当前appkey下的所有文件
 * @params:   { access }  登录BOS所返回的AccessToken
 * @params: { appKey } BOS账户下你创建的appkey
 * @return: 返回所有的filekey
 * @example:

 */

export const fetchFilesOfAppKey = (appkey,access)  =>dispatch=>{

    fetchAnalyzeSuccceedFiles(appkey,access)
        .then(filekeys => {
            console.log("返回的response=======",filekeys)
            dispatch(getFilesOfAppKey(filekeys))
        })

}

export const getFilesOfAppKey = (files) =>({
    type:GET_FILES_OF_APPKEY,
    files
})


export const fetchFailedFilesOfAppKey = (appkey,access)  =>dispatch=>{

    fetchAnalyzeFailedFiles(appkey,access)
        .then(filekeys => {
            console.log("返回的response=======",filekeys)

            dispatch(getFailedFilesOfAppKey(filekeys))
        })

}

export const getFailedFilesOfAppKey = (files) =>({
    type:GET_FAILED_FILES_OF_APPKEY,
    files
})

export const clearOutBosState = () =>({
    type:CLEAR_OUT_BOS_STATE
})


export const getUploadedFiles = (files) =>({
    type:GET_UPLOADED_MODELS,
    files
})