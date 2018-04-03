/* 普通用户注册 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import style from './style.sass';
import { singleRequest, rolesAllUsers, addUsersInforRequest } from '../store/reducer';
import { addGaclRequest } from '../../../store/publicReducers';
import { interface_users, interface_roles2Users, interface_usersInfor, interface_gacl } from './unit';

/* state */
const state: Function = createStructuredSelector({});

/* dispatch */
const dispatch: Function = (dispatch: Function): Object=>({
  action: bindActionCreators({
    singleRequest,
    rolesAllUsers,
    addUsersInforRequest,
    addGaclRequest
  }, dispatch)
});

@withRouter
@Form.create()
@connect(state, dispatch)
class GeneralUserSingle extends Component{
  // 用户注册
  async singleUser(value: Object): Promise<void>{
    try{
      // 注册账号
      const step1: ?Object = await this.props.action.singleRequest({
        data: interface_users(value)
      });
      if(!step1 || step1.data.code !== 201){
        message.error(step1.data.data);
        return void 0;
      }
      const accessToken: string = step1.data.data.access_token;
      const headers: Object = {
        'Authorization': `AccessToken ${ accessToken }`
      };
      // 将账号加入到用户组
      const step2: ?Object = await this.props.action.rolesAllUsers({
        headers,
        data: interface_roles2Users(value.username)
      });
      if(!(step2 && step2 >= 200 && step < 300)){
        message.error('用户注册失败！');
        return void 0;
      }
      // 写入usersInfor
      const step3: ?Object = await this.props.action.addUsersInforRequest({
        headers,
        data: interface_usersInfor(value, 'general_user', true)
      });
      if(!(step3 && step3 >= 200 && step < 300)){
        message.error('用户注册失败！');
        return void 0;
      }
      // 修改interface的权限
      const step4: ?Object = await this.props.action.addGaclRequest({
        headers,
        data: interface_gacl(value.username)
      });
      if(!(step4 && step4 >= 200 && step < 300)){
        message.error('用户注册失败！');
        return void 0;
      }
      message.success('用户注册成功！');
      this.props.history.push('/Login');
    }catch(err){
      console.error(err);
      message.error('用户注册失败！');
    }
  }
  // 表单提交
  onSingleUser(event: Event): void{
    event.preventDefault();
    const { form }: { form: Object } = this.props;
    form.validateFields((err: any, value: Object): void=>{
      if(err) return void 0;
      if(value.password !== value.password2){
        message.error('密码和确认密码不同！');
      }else{
        this.singleUser(value);
      }
    });
  }
  render(): Object{
    const { getFieldDecorator }: { getFieldDecorator: Function } = this.props.form;
    return (
      <Form onSubmit={ this.onSingleUser.bind(this) }>
        <Form.Item label="用户名" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          {
            getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请输入用户名！'
                }
              ]
            })(<Input />)
          }
        </Form.Item>
        <Form.Item label="密码" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          {
            getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码！'
                }
              ]
            })(<Input type="password" />)
          }
        </Form.Item>
        <Form.Item label="确认密码" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          {
            getFieldDecorator('password2', {
              rules: [
                {
                  required: true,
                  message: '请确认密码！'
                }
              ]
            })(<Input type="password" />)
          }
        </Form.Item>
        <Form.Item label="手机号" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          {
            getFieldDecorator('telephone', {
              rules: [
                {
                  required: true,
                  message: '请确认密码！'
                }
              ]
            })(<Input />)
          }
        </Form.Item>
        <div className={ style.btnGroup }>
          <Link className={ style.btn } to="/Login">
            <Button type="danger">返回</Button>
          </Link>
          <Button className={ style.btn } type="primary" htmlType="submit">注册</Button>
        </div>
      </Form>
    );
  }
}

export default GeneralUserSingle;