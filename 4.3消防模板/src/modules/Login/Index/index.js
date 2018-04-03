/* 登录 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { withRouter, Link } from 'react-router-dom';
import { Form, Input, Button, message, Icon } from 'antd';
import Title from '../../../assembly/Title/index';
import '../../../assembly/Fonts/style.sass';
import style from './style.sass';
import { loginRequest, usersInforRequest } from '../store/reducer';
import roles from '../../../components/Role/roles';

/* state */
const state: Function = createStructuredSelector({});

/* dispatch */
const dispatch: Function = (dispatch: Function): Object=>({
  action: bindActionCreators({
    loginRequest,
    usersInforRequest
  }, dispatch)
});

@withRouter
@Form.create()
@connect(state, dispatch)
class Index extends Component{
  state: {
    btnLoading: boolean
  };

  constructor(): void{
    super(...arguments);

    this.state = {
      btnLoading: false   // 登录按钮loading
    };
  }
  // 登录
  onLogin(event: Event): void{
    event.preventDefault();
    this.props.form.validateFields(async(err: any, value: Object): Promise<void>=>{
      if(err) return void 0;
      this.setState({
        btnLoading: true
      });
      try{
        // 登录
        const step1: ?Object = await this.props.action.loginRequest({
          data: {
            code: value.username,
            password: value.password
          }
        });
        // 登陆失败
        if(!step1 || step1.status !== 200){
          this.setState({
            btnLoading: false
          });
          message.error('登录失败！');
          return void 0;
        }
        // 登录成功
        if(step1.data.code !== 2001){
          this.setState({
            btnLoading: false
          });
          message.error(step1.data.data);
          return void 0;
        }
        // 查询账号的信息
        const step2: ?Object = await this.props.action.usersInforRequest({
          data: {
            condition: [
              {
                field: 'bosclass',
                operator: '==',
                value: 'usersInfor',
                logic: 'AND'
              },
              {
                field: 'code',
                operator: '==',
                value: value.username,
                logic: 'AND'
              }
            ],
            select: ['active', 'code', 'infor', 'roles']
          },
          headers: {
            Authorization: `AccessToken ${ step1.data.data.access_token }`
          }
        });
        if(!step2 || step2.status !== 200 || step2.data.data.length === 0){
          this.setState({
            btnLoading: false
          });
          message.error('登录失败！');
          return void 0;
        }
        // 登录成功
        const parameter: Object = step2.data.data[0].parameter;
        sessionStorage.setItem('users', JSON.stringify(step1.data.data));
        sessionStorage.setItem('userInfor', JSON.stringify(parameter));
        sessionStorage.setItem('role', JSON.stringify(roles[parameter.roles]));
        message.success('登陆成功');
        this.props.history.push('/');
      }catch(err){
        this.setState({
          btnLoading: false
        });
        message.error('登录失败！');
        console.error(err);
      }

    });
  }
  render(): Array{
    const { getFieldDecorator }: { getFieldDecorator: Function } = this.props.form;
    return [
      <Title key={ 0 }>登录-消防产品库管理平台</Title>,
      <div key={ 1 } className={ style.login }>
        <div className={ style.loginBody }>
          <h1 className={ style.title }>消防产品库管理平台</h1>
          <Form className={ style.form } layout="horizontal" hideRequiredMark={ true } onSubmit={ this.onLogin.bind(this) }>
            <div className={ style.group }>
              <Form.Item labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
                {
                  getFieldDecorator('username', {
                    rules: [
                      {
                        required: true,
                        message: '请输入用户名！'
                      }
                    ]
                  })(
                    <Input className={ style.input } size="large" aria-label="用户名" placeholder="请输入用户名" addonBefore={
                      <Icon className={ style.inputB } type="user" />
                    } />
                  )
                }
              </Form.Item>
            </div>
            <div className={ style.group }>
              <Form.Item className={ style.group } labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
                {
                  getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: '请输入密码！'
                      }
                    ]
                  })(
                    <Input className={ style.input } type="password" size="large" aria-label="密码" placeholder="请输入密码" addonBefore={
                      <Icon className={ style.inputB } type="key" />
                    } />
                  )
                }
              </Form.Item>
            </div>
            <Button className={ style.btn } type="primary" htmlType="submit" size="large" title="登录" loading={ this.state.btnLoading }>登录</Button>
            <p className="clearfix">
              <Link className={ style.fl } to="/Login/Single">注册账号</Link>
              <Link className={ style.fr } to="/Login/RecoverPassword">找回密码</Link>
            </p>
          </Form>
        </div>
      </div>
    ];
  }
}

export default Index;