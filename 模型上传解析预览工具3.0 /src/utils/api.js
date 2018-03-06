import { removeRepeated } from '../Functions'


//公有化环境地址
export const baseaddress = 'http://api.rickricks.com/v1'
export const beinsideaddress = 'http://binside.rickricks.com/binside/ifcanalysis'

//上海环境地址   binside-rtm.rickricks.com/binside/ifcanalysis
// export const baseaddress = 'http://101.251.197.35:8080/v1-z'
// export const beinsideaddress = 'http://binside-rtm.rickricks.com/binside/ifcanalysis'


/**
 * @date:2017/12/20 09:34
 * @author:liuyuan
 * @description:  登录BOS接口
 * @params: { username } :登录BOS的账号
 * @params: { password } :登录BOS的密码
 * @return:
 * @example:

 */

export const loginBos = (username,password) =>{

    const headers = {"Content-Type":"application/json"}
    const body = JSON.stringify({name:username,password:password})
    return fetch(`${baseaddress}/account/login`,{method:'POST',headers,body:body})
            .then(da =>da.json())


}



/**
 * @date:2017/12/19 20:31
 * @author:liuyuan
 * @description:  解析三维模型接口
 * @params: { appkey }      : BOS账号的appkey
 * @params: { accessToken } : 登录BOS返回的accessToken
 * @params: { filekey }     : 需要解析的文件的filekey
 * @return:
 * @example:

 */

export const analyzeModel = (appkey,accessToken,filekey) =>{

 return fetch(`${beinsideaddress}?d=${baseaddress}/${appkey}/files/${filekey}/download?access_token=${accessToken}&appKey=${appkey}&i=${filekey}`)


}

/**
 * @date:2017/12/19 20:31
 * @author:liuyuan
 * @description:  取出files关联的components接口
 * @params: { appkey }      : BOS账号的appkey
 * @params: { accessToken } : 登录BOS返回的accessToken
 * @params: { filekey }     : 需要解析的文件的filekey
 * @return: 模型所关联的components的componentid数组
 * @example:

 */
export const fetchComponentsOfFilekey = (appkey,accessToken,filekey) =>{

    return fetch(`${baseaddress}/${appkey}/files/${filekey}`, {
        headers: {
            'Authorization': `AccessToken ${accessToken}`
        }
    }).then(response => response.json())
        .then(responseJson => {
            console.log("返回file的关联文件的数组为===========", responseJson)
            return responseJson.relationship.irIFCComponent.components
        })
        .then(components => {
            console.log("根据file模型关联的components为===========", components)
            return components.map(component => component.uri.split("/").pop())
        })
}

/**
 * @date:2017/12/20 10:58
 * @author:liuyuan
 * @description:  拿到appkey下status不等于3的，即没有解析成功的files
 * @params:
 * @params:
 * @return:
 * @example:

 */

export const fetchAnalyzeFailedFiles = (appkey,accessToken) =>{

    const body = {
        "condition":
            [
                {
                    "field":"status",

                    "operator":"!=",

                    "value":"3",

                    "logic":"and"
                }
                // ,
                // {
                //     "field":"status",
                //
                //     "operator":"!=",
                //
                //     "value":"-1",
                //
                //     "logic":""
                // }
            ]
    }

     return fetch(`${baseaddress}/${appkey}/prototype/query/files?noRelation=true&page=1&per_page=20`, {
        headers: {
            'Content-Type':'application/json',
            'Authorization': `AccessToken ${accessToken}`
        },
        method:'POST',
        body:JSON.stringify(body)
    })
        .then(response => {
            return response.json()
        })

        .then(filekeys => {
            console.log("返回的response=======",filekeys)

            // let deletesameFiles = removeRepeated(filekeys)

            // return deletesameFiles
            return filekeys
        })

}


/**
 * @date:2017/12/20 13:41
 * @author:liuyuan
 * @description:  拿到当前appkey下解析成功的模型文件，即status等于3的模型,并且去除重复的
 * @params:
 * @params:
 * @return:
 * @example:

 */

export const fetchAnalyzeSuccceedFiles = (appkey,accessToken) =>{

    const body = {
        "condition":
            [
                {
                    "field":"status",

                    "operator":"==",

                    "value":"3",

                    "logic":""
                }
            ]
    }

    return fetch(`${baseaddress}/${appkey}/prototype/query/files?noRelation=true&page=1&per_page=20`, {
        headers: {
            'Content-Type':'application/json',
            'Authorization': `AccessToken ${accessToken}`
        },
        method:'POST',
        body:JSON.stringify(body)
    })
        .then(response => {
            return response.json()
        })

        .then(filekeys => {
            console.log("返回的response=======",filekeys)

            let deletesameFiles = removeRepeated(filekeys)

            // return deletesameFiles
            return filekeys
        })

}


/**
 * @date:2017/12/20 14:22
 * @author:liuyuan
 * @description:  文件上传接口,将文件上传到BOS数据库
 * @params: { request }       : XMLHttpRequest 请求的实例化对象
 * @params: { appkey }        : BOS账号的appkey
 * @params: { accessToken }   : 登录BOS后返回的accessToken
 * @params: { updateProgress }: 监听上传进度的函数
 * @params: { stateChange }   : 监听发送请求后状态码改变的函数
 * @params: { formData }      :发送上传文件的formdata
 * @return:
 * @example:

 */

export const uploadFiles = (request,appkey,accessToken,updateProgress,stateChange,formData) =>{


    request.upload.addEventListener("progress", updateProgress, false);

    request.addEventListener('readystatechange',stateChange,false)

    request.open('POST',`${baseaddress}/${appkey}/files`,true)
    request.setRequestHeader( "Authorization",`AccessToken ${accessToken}`)
    request.send(formData)


}