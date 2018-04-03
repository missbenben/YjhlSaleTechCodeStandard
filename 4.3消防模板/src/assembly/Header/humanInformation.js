/**
 * 登录人信息
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal, Avatar } from 'antd';
import style from './style.sass';
import icon from '../Icon/style.sass';

@withRouter
class HumanInformation extends Component{
  // 退出系统
  onExitSystem(event: Event): void{
    const ref: Modal = Modal.confirm({
      content: '确认要退出系统吗？',
      onCancel: (event: Event): void=>{
        ref.destroy();
      },
      onOk: (event: Event): void=>{
        ref.destroy();
        sessionStorage.removeItem('users');
        sessionStorage.removeItem('usersInfor');
        sessionStorage.removeItem('role');
        this.props.history.push('/Login');
      }
    });
  }
  render(): Object{
    const users: string = sessionStorage.getItem('users');
    const name: ?string = users ? JSON.parse(users).user.fullName : null;
    return (
      <div className={ style.humanInformation }>
        <button className={ style.tools } type="button" title="退出系统" onClick={ this.onExitSystem.bind(this) }>
          <i className={ icon['icon-exit'] } />
        </button>
        <Avatar className={ style.human }>{ name ? name[0].toUpperCase() : '' }</Avatar>
        <span className={ style.username }>{ name }</span>
      </div>
    );
  }
}

export default HumanInformation;