/* 公共函数 */
import $ from 'jquery';

/**
 * 将对象转换成一个数组
 * @param { Object } obj
 * @return { Array }
 */
export function objectToArray(obj: Object): Function[]{
  const arr: Function[] = [];
  for(const key: string in obj){
    arr.push(obj[key]);
  }
  return arr;
}

/**
 * ajax请求函数
 * @param { string } url             : 请求地址
 * @param { string } method          : 请求方式
 * @param { ?Function } successAction: 成功请求数据后的action
 * @param { Object } defaultHeaders  : 默认的请求头
 */
type requestArg = {
  url: string,
  method: string,
  successAction: ?Function,
  defaultHeaders: Object,
  defaultData: Object
};
export function request({ url, method = 'GET', successAction, defaultHeaders = {}, defaultData }: requestArg): Function{
  /**
   * 异步action
   * @param { ?Object } pathname: 替换模板的对象
   * @data { ?Object } data     : 传递的参数
   * @headers { Object } headers: 请求头
   */
  type actionArg = {
    pathname: ?Object,
    data: ?Object,
    headers: Object
  };
  return function(arg: actionArg): Function{
    const { pathname, data, headers }: actionArg = arg || {};
    // 格式化请求头和请求地址
    // headers
    const headers1: Object = Object.assign({}, defaultHeaders);
    if(headers) Object.assign(headers1, headers);
    // url
    const tpUrl: string = pathname ? templateReplace(url, pathname) : url;
    // data
    let data1: Object | Array;
    if(defaultData){
      data1 = Object.assign(defaultData instanceof Array ? [] : {}, defaultData);
      if(data) Object.assign(data1, data);
    }else{
      if(data) data1 = data;
    }
    // dispatch
    return function(dispatch: Function): Promise{
      const option: Object = { // ajax配置
        url: tpUrl,
        type: method,
        dataType: 'text',
        async: true,
        data: JSON.stringify(data1),
        headers: {
          ...headers1,
          'Content-Type': 'application/json'
        }
      };
      return new Promise((resolve: Function, reject: Function): void=>{
        // 如果成功，resolve会传出data和status，
        // 否则，会返回undefined
        $.ajax({
          ...option,
          success(data: string, status: string, xhr: XMLHttpRequest): void{
            resolve({
              data: !data || data === '' ? {} : JSON.parse(data),
              status: xhr.status
            });
          },
          error(xhr: XMLHttpRequest, err: any): void{
            reject(xhr);
          }
        });
      }).then((result: Object): Object=>{
        if(successAction) dispatch(successAction(result.data));  // successAction
        return result;
      }).catch((err: any): void=>{
        console.error(method, tpUrl, err);
      });
    };
  };
}

/**
 * 模板替换
 * @param { String } template: 模板
 * @param { Object } data    : 数据
 */
export function templateReplace(template: string, data: Object = {}): string{
  return template.replace(/{{\s*[a-zA-Z0-9_]+\s*}}/g, (text: string): string=>{
    const key: string = text.match(/[a-zA-Z0-9_]+/g)[0];
    return key in data ? data[key] : '';
  });
}

/**
 * 随机字符串
 * @param { number } len: 字符串长度
 * @return { string }
 */
const STR_GROUP: string = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
const STR_GROUP_LEN: number = STR_GROUP.length;
export function randomStr(len: number = 50): string{
  let str: string = '';
  for(let i: number = 0; i < len; i++){
    str += STR_GROUP[Math.floor(Math.random() * STR_GROUP_LEN)];
  }
  return str;
}

/**
 * 将对象内的undefined转换成空字符串
 * @param { Object } obj
 * @return { Object }
 */
export function undefinedToSpace(obj: Object): Object{
  for(const key: string in obj){
    if(obj[key] === undefined) obj[key] = '';
  }
  return obj;
}

/**
 * 搜索
 * 将关键字生成数组
 * @param { string } keywords: 关键字（空格分隔）
 * @return { Array }
 */
export function formatKeywords(keywords: string): string[]{
  const keywords2: string[] = keywords.split(/\s+/);
  for(let i: number = keywords2.length - 1; i >= 0; i--){
    if(keywords2[i] === ''){
      keywords2.splice(i, 1);
    }
  }
  return keywords2;
}

/**
 * 返回access_token
 * @return { string }
 */
export function accessToken(): string{
  const userInformation: Object = JSON.parse(sessionStorage.getItem('users'));
  return userInformation.access_token;
}

/**
 * 返回headers
 * @return { Object }
 */
export function headers(): Object{
  return {
    'Authorization': `AccessToken ${ accessToken() }`
  };
}