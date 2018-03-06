import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox,message, } from 'antd';
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { loginBos } from '../utils/api'

const FormItem = Form.Item;

class LoginForm extends Component{

    state = {
        files:[],

    }


    handleSubmit = (e) => {
        e.preventDefault();
        const username = this.props.form.getFieldValue('userName')
        const password = this.props.form.getFieldValue('password')
        const appkey = this.props.form.getFieldValue('appkey')

        const storage = window.sessionStorage

        loginBos(username,password)
            .then(access =>{
                if(access.code === 0) {
                    if(appkey){
                        message.success('恭喜你🎉！你输入的账号/密码正确!')

                        storage.setItem('accessToken',access.data.access_token)
                        storage.setItem('appkey',appkey)
                        this.props.jumpToUpload()
                    }else {
                        message.warn('请输入你的appkey!')
                    }

                }else {
                    if(access.code ===1){
                        message.error('你输入的账号/密码有误，请检查后重新输入...')
                    }
                }
            }).catch(error =>  message.error(error.message))

        console.log('Received values of form: ', this.state);

    }
    render(){
        const { getFieldDecorator } = this.props.form
        console.log("this.state=========",this.state)

              return(
                    <div className='login'>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: '请输入你的用户名!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入你的密码!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('appkey', {
                                    rules: [{ required: true, message: '请输入你的appKey!' }],
                                })(
                                    <Input prefix={<Icon type="appstore-o" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Appkey" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>记住我</Checkbox>
                                )}
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                            </FormItem>
                        </Form>
                    </div>

        )
    }

}

const mapDispatchToProps = (dispatch)=>({
    jumpToUpload:() =>dispatch(push('uploadModel'))
})

export default connect(null,mapDispatchToProps)(LoginForm);

