import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import { request } from '../../../function';

const initData: {} = {};

/* Action */
// 修改密码
export const changePasswordRequest: Function = request({
  url: window.config.changePassword,
  method: 'PUT'
});

/* reducer */
const reducer: Function = handleActions({}, fromJS(initData));

export default {
  index: reducer
};