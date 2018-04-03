/* 生产厂家注册 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import style from './style.sass';

@Form.create()
class GeneralUserSingle extends Component{
  render(): Object{
    const { getFieldDecorator }: { getFieldDecorator: Function } = this.props.form;
    return (
      <Form>
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
        <Form.Item label="厂家名称" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          {
            getFieldDecorator('factoryName')(<Input />)
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