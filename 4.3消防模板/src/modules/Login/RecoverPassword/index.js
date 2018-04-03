/* 找回密码 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { Link, withRouter } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import Title from '../../../assembly/Title/index';
import style from './style.sass';
import { validateCodeRequest, checkValidateCodeRequest, resetPassword } from '../store/reducer';

/* state */
const state: Function = createStructuredSelector({});

/* dispatch */
const dispatch: Function = (dispatch: Function): Object=>({
  action: bindActionCreators({
    validateCodeRequest,
    checkValidateCodeRequest,
    resetPassword
  }, dispatch)
});

@withRouter
@Form.create()
@connect(state, dispatch)
class RecoverPassword extends Component{
  verificationCodeTimer: ?number;
  verificationCodeDisabled: Function;
  state: {
    endTimes: number
  };

  constructor(): void{
    super(...arguments);

    this.verificationCodeTimer = null;  // 验证码定时器
    this.verificationCodeDisabled = this._verificationCodeDisabled.bind(this);
    this.state = {
      endTimes: 0   // 发送验证码的时间
    };
  }
  componentWillUnmount(): void{
    if(this.verificationCodeTimer !== null){
      clearInterval(this.verificationCodeTimer);
      this.verificationCodeTimer = null;
    }
  }
  // 时间验证
  _verificationCodeDisabled(): void{
    const t: number = this.state.endTimes;
    if(t !== 0){
      this.setState({
        endTimes: t - 1
      });
    }else{
      clearInterval(this.verificationCodeTimer);
      this.verificationCodeTimer = null;
    }
  }
  // 发送验证码
  async onSendVerificationCodeTimer(event: Event): Promise<void>{
    const tel: string = this.props.form.getFieldValue('telephone');
    if(!(tel !== undefined && /^1[3-9][0-9]{9}$/.test(tel))){
      message.warn('请输入正确的手机号！');
      return void 0;
    }
    // 发送验证码
    const step1: ?Object = await this.props.action.validateCodeRequest({
      data: {
        receiver: tel
      }
    });

    if(!(step1 && step1.status === 200 && step1.data.code === 200)){
      message.error('验证码发送失败！');
      return void 0;
    }
    message.success('验证码发送成功！');
    this.setState({
      endTimes: 60
    });
    this.verificationCodeTimer = setInterval(this.verificationCodeDisabled, 1000);
  }
  // 找回密码
  onRecoverPassword(event: Event): void{
    event.preventDefault();
    const { form }: { form: Object } = this.props;
    form.validateFields(async(err: any, value: Object): Promise<void>=>{
      if(err) return void 0;
      const step1: Object = await this.props.action.checkValidateCodeRequest({
        data: {
          validateCode: value.verificationCode,
          receiver: value.telephone
        }
      });
      if(!(step1 && step1.status === 200 && step1.data.code === 2001)){
        message.error('验证码错误！');
        return void 0;
      }
      const step2: Object = await this.props.action.resetPassword({
        data: {
          identifier: value.telephone,
          newPassword: value.newPassword
        }
      });
      if(!(step2 && step2.status === 201 && step2.data.code === 201)){
        message.error('密码修改失败！');
        return void 0;
      }
      message.success('密码修改成功！');
      this.props.history.push('/Login');
    });
  }
  render(): Array{
    const { getFieldDecorator }: { getFieldDecorator: Function } = this.props.form;
    return [
      <Title key={ 0 }>找回密码</Title>,
      <div key={ 1 } className={ style.recoverPassword }>
        <Form className={ style.recoverPasswordMain } onSubmit={ this.onRecoverPassword.bind(this) }>
          <h1 className={ style.title }>找回密码</h1>
          <Form.Item label="手机号" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            {
              getFieldDecorator('telephone', {
                rules: [
                  {
                    required: true,
                    message: '请输入手机号！'
                  }
                ]
              })(<Input />)
            }
          </Form.Item>
          <Form.Item label="验证码" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            {
              getFieldDecorator('verificationCode', {
                rules: [
                  {
                    required: true,
                    message: '请输入验证码！'
                  }
                ]
              })(
                <div className={ `${ style.sendGroup } clearfix` }>
                  <Input className={ style.verificationCode } />
                  <Button className={ style.send } type="primary" disabled={ this.state.endTimes !== 0 } onClick={ this.onSendVerificationCodeTimer.bind(this) }>
                    发送验证码
                    { this.state.endTimes === 0 ? null : `（${ this.state.endTimes }）` }
                  </Button>
                </div>
              )
            }
          </Form.Item>
          <Form.Item label="新密码" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            {
              getFieldDecorator('newPassword', {
                rules: [
                  {
                    required: true,
                    message: '请输入新密码！'
                  }
                ]
              })(<Input />)
            }
          </Form.Item>
          <div className={ style.btnGroup }>
            <Link className={ style.btn } to="/Login">
              <Button type="danger">返回</Button>
            </Link>
            <Button className={ style.btn } type="primary" htmlType="submit">修改</Button>
          </div>
        </Form>
      </div>
    ];
  }
}

export default RecoverPassword;