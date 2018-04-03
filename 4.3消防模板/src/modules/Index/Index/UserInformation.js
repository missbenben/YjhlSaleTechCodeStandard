/* 用户信息 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Avatar } from 'antd';
import style from './style.sass';

class UserInformation extends Component{
  render(): Object{
    const users: string = sessionStorage.getItem('users');
    const name: ?string = users ? JSON.parse(users).user.fullName : null;
    const userInfor: Object = sessionStorage.getItem('userInfor');
    const item: Object = userInfor ? JSON.parse(userInfor) : {};
    return (
      <Card>
        <div className={ style.nameSpace }>
          <Avatar className={ style.human } size="large">{ name ? name[0].toUpperCase() : '' }</Avatar>
          <b className={ style.name }>{ name }</b>
          <Link className={ style.changePassword } to="/Index/ChangePassword">修改密码</Link>
        </div>
        <p>
          <b className={ style.keys }>
            <span>姓</span>
            <span>名</span>
          </b>
          <span className={ style.maohao }>：</span>
          { name }
        </p>
        <p>
          <b className={ style.keys }>
            <span>角</span>
            <span>色</span>
          </b>
          <span className={ style.maohao }>：</span>
          { item.roles }
        </p>
      </Card>
    );
  }
}

export default UserInformation;