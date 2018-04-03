import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import store from '../store/store';
import '../common.sass';
import Layout from '../assembly/Layout/index';
import Login from '../modules/Login/Layout';

/**
 * 项目入口
 */
class AppModule extends Component{
  render(): Object{
    return (
      <Provider store={ store }>
        <LocaleProvider locale={ zhCN }>
          <BrowserRouter>
            <Switch>
              <Route path="/Login" component={ Login } />
              <Route component={ Layout } />
            </Switch>
          </BrowserRouter>
        </LocaleProvider>
      </Provider>
    );
  }
}

export default AppModule;