/**
 * layout
 * 页面整体布局
 * Header 显示页面header
 * Footer 显示版权信息
 * Routers 根据路由渲染页面
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import style from './style.sass';
import Header from '../Header/index';
import Routers from '../../router/routers';

@withRouter
class MyLayout extends Component{
  componentWillMount(): void{
    // 判断账号是否登录
    const users: string = sessionStorage.getItem('users');
    const userInfor: string = sessionStorage.getItem('userInfor');
    const role: string = sessionStorage.getItem('role');
    if(!(users && userInfor && role)){
      this.props.history.push('/Login');
    }
  }
  render(): Object{
    return (
      <Layout className={ style.layout }>
        <Layout.Header className={ style.header }>
          <Header />
        </Layout.Header>
        <Routers />
        <Layout.Footer className={ style.footer }>
          <span className={ style.footerText }>版权所有&nbsp;盈嘉互联</span>
          <span>BOS@盈嘉互联&nbsp;提供数据服务</span>
        </Layout.Footer>
      </Layout>
    );
  }
}

export default MyLayout;