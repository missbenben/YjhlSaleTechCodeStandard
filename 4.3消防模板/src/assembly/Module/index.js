/**
 * 根据权限渲染左侧sider和右侧的路由
 * ModuleLayout继承自该类
 */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class Module extends Component{
  power(options: Array): Array{
    const role: string[] = JSON.parse(sessionStorage.getItem('role'));  // 判断权限
    const render: Array = [];
    let first: ?Object = null;
    options.map((item: Object, index: number): void=>{
      if(role.includes(item.id) && item.component){
        render.push(
          <Route key={ item.id } path={ item.url } component={ item.component } exact={ true } />
        );
        if(!first){
          first = <Route key="__FIRST_ROUTE" path={ '/' + item.url.split(/\//)[1] } component={ item.component } exact={ true } />;
          render.unshift(first);
        }
      }
    });
    return render;
  }
}

export default Module;