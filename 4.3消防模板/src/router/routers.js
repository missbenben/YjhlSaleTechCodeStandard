import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncModule from './asyncModule';
import Page404 from '../assembly/Page404/index';
import Index from '../modules/Index/Layout';
import ComponentParts from 'bundle-loader?lazy&name=component_parts!../modules/ComponentParts/Layout';

// 路由
const routers: {
  id: string,
  path: string,
  component: Object
}[] = [
  { // 首页
    id: 'index',
    path: '/Index',
    component: Index
  },
  { // 部品部件管理
    id: 'componentParts',
    path: '/ComponentParts',
    component: asyncModule(ComponentParts)
  }
];

/**
 * 路由模块
 */
class Router extends Component{
  // 根据权限判断是否配置router
  power(): Array{
    // const role: string[] = JSON.parse(sessionStorage.getItem('role')) || [];  // 判断权限
    const render: Array = [];
    let first: ?Object = null;
    routers.map((item: Object, index: number): void=>{
      // if(role.includes(item.id) && item.component){}
      render.push(
        <Route key={ item.id } path={ item.path } component={ item.component } />
      );
      if(!first){
        first = <Route key="__FIRST_ROUTE__" path="/" component={ item.component } exact={ true } />;
        render.unshift(first);
      }
    });
    return render;
  }
  render(): Object{
    return (
      <Switch>
        { this.power() }
        {/* 404 */}
        <Route component={ Page404 } />
      </Switch>
    );
  }
}

export default Router;