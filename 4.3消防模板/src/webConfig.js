/**
 *  网站地址配置
 *  从“config”更名为“webConfig”
 *  因为配置exclude的config会和react-hot-loader的config冲突，导致报错
 */
(function(_window){
  // bos相关配置
  var bosUrl = 'http://api.rickricks.com/';            // bos服务器地址
  var bosVersion = 'v1-2';                             // 版本
  var bosKey = 'td1b92f7c6d94685a82372f6d8a1cdb6';     // key
  var api = bosUrl + bosVersion + '/' + bosKey + '/';  // api接口地址

  // 网站配置
  _window.config = {
    // bos
    bosUrl: bosUrl,
    bosKey: bosKey,
    bosVersion: bosVersion,
    api: api,
    login: api + 'users/login',                                 // 登录
    single: api + 'users/single',                               // 注册
    changePassword: api + 'users/{{ key }}/auth',               // 修改密码
    validateCode: api + 'users/validateCode',                   // 发送验证码（手机）
    checkValidateCode: api + 'users/check/validateCode',        // 验证验证码
    resetPassword: api + 'auths/resetPassword',                 // 【一个具有严重安全问题的接口，不用说估计也知道是干什么的】
    prototype: api + 'prototype/',                              // prototype
    query: api + 'prototype/query/',                            // 多条件查询
    upload: bosUrl + bosVersion + '/' + bosKey + '/files',      // 文件上传
    ifc: `http://binside.rickricks.com/binside-v1-1/ifc/parse?d={{ d }}&appKey=${ bosKey }&i={{ i }}` // 模型解析
  };
})(window);