import  { Component } from 'react'
import {Form} from 'antd'
import LoginForm from './LoginForm'

class WrappedLoginForm extends Component{
    render(){
        return(
            null
        )
    }
}

WrappedLoginForm = Form.create()(LoginForm)

export default WrappedLoginForm