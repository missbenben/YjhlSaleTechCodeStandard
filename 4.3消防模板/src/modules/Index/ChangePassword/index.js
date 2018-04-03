/* 修改密码 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import style from './style.sass';
import { headers } from '../../../function';
import { changePasswordRequest } from '../store/reducer';

/* state */
const state: Function = createStructuredSelector({});

/* dispatch */
const dispatch: Function = (dispatch: Function): Object=>({
  action: bindActionCreators({
    changePasswordRequest
  }, dispatch)
});

@Form.create()
@connect(state, dispatch)
class ChangePassword extends Component{
  // 提交
  onSubmit(event: Event): void{
    event.preventDefault();
    const { form }: { form: Object } = this.props;
    form.validateFields(async(err: any, value: Object): Promise<void>=>{
      if(err) return void 0;
      // 修改密码传入参数：oldPassword、newPassword、token
      if(value.newPassword !== value.confirmPassword){
        message.error('新密码和确认新密码不相同！');
        return void 0;
      }
      try{
        const users: string = sessionStorage.getItem('users');
        const step1: ?Object = await this.props.action.changePasswordRequest({
          pathname: {
            key: JSON.parse(users).user.code
          },
          data: {
            password: value.oldPassword,
            newPassword: value.newPassword
          },
          headers: headers()
        });
        if(!(step1 && step1.status >= 200 && step1.status < 300)){
          message.error('修改密码失败！');
          return void 0;
        }
        // 判断
        const data: Object = step1.data;
        if(data.code === 201){
          message.success('修改密码成功！');
          form.resetFields();
        }else{
          message.error('修改密码失败！');
        }
      }catch(err){
        message.error('修改密码失败！');
        console.error(err);
      }
    });
  }
  render(): Object{
    const { getFieldDecorator }: { getFieldDecorator: Function } = this.props.form;
    const label: number = 6;
    const wrapper: number = 24 - label;
    return (
      <Form className={ style.form } onSubmit={ this.onSubmit.bind(this) }>
        <Form.Item label="旧密码" labelCol={{ span: label }} wrapperCol={{ span: wrapper }}>
          {
            getFieldDecorator('oldPassword', {
              rules: [
                {
                  required: true,
                  message: '请输入旧密码！'
                }
              ]
            })(<Input type="password" />)
          }
        </Form.Item>
        <Form.Item label="新密码" labelCol={{ span: label }} wrapperCol={{ span: wrapper }}>
          {
            getFieldDecorator('newPassword', {
              rules: [
                {
                  required: true,
                  message: '请输入新密码！'
                }
              ]
            })(<Input type="password" />)
          }
        </Form.Item>
        <Form.Item label="确认新密码" labelCol={{ span: label }} wrapperCol={{ span: wrapper }}>
          {
            getFieldDecorator('confirmPassword', {
              rules: [
                {
                  required: true,
                  message: '请输入确认新密码！'
                }
              ]
            })(<Input type="password" />)
          }
        </Form.Item>
        <div className={ style.tc }>
          <Link className={ style.btn } to="/Index">
            <Button type="danger">返回</Button>
          </Link>
          <Button className={ style.btn } type="primary" htmlType="submit">修改</Button>
        </div>
      </Form>
    );
  }
}

export default ChangePassword;