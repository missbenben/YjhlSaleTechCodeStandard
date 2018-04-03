/**
 * 根据权限，判断模块是否渲染
 * 传入参数props.id
 */
import React, { Component } from 'react';

class RoleModule extends Component{
  render(): ?Object{
    const role: string[] = JSON.parse(sessionStorage.getItem('role')) || [];  // 判断权限
    return role.includes(this.props.id) ? this.props.children : null;
  }
}

export default RoleModule;