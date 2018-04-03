import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { request } from '../../../function';

const initData: Object = {};

/* Action */
// 登录
export const loginRequest: Function = request({
  url: window.config.login,
  method: 'POST'
});
// 获取其他信息
export const usersInforRequest: Function = request({
  url: window.config.query + 'usersInfor?page=1&per_page=1',
  method: 'POST'
});
// 注册
export const singleRequest: Function = request({
  url: window.config.single,
  method: 'POST'
});
// 账户加入用户组
export const rolesAllUsers: Function = request({
  url: window.config.api + 'roles/_ALL/users',
  method: 'POST'
});
// 信息写入
export const addUsersInforRequest: Function = request({
  url: window.config.query + 'usersInfor',
  method: 'POST'
});

/* 找回密码相关 */
// 发送验证码
export const validateCodeRequest: Function = request({
  url: window.config.validateCode,
  method: 'POST',
  defaultData: {
    validateType: 'telephone'
  }
});
// 验证验证码
export const checkValidateCodeRequest: Function = request({
  url: window.config.checkValidateCode,
  method: 'POST',
  defaultData: {
    validateType: 'telephone'
  }
});
// 重置密码
export const resetPassword: Function = request({
  url: window.config.resetPassword,
  method: 'POST',
  defaultData: {
    idenType: 'telephone'
  }
});

/* reducer */
const reducer: Function = handleActions({}, fromJS(initData));

export default {
  login: reducer
};