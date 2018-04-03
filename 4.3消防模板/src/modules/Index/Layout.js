import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../../assembly/Main/index';
import Content from '../../assembly/Content/index';
import Title from '../../assembly/Title/index';
import Index from './Index/index';
import ChangePassword from './ChangePassword/index';

class ModuleLayout extends Component{
  render(): Object{
    return (
      <Main>
        <Content>
          <Switch>
            <Route path="/" component={ Index } exact={ true } />
            <Route path="/Index" component={ Index } exact={ true } />
            <Route path="/Index/ChangePassword" component={ ChangePassword } exact={ true } />
          </Switch>
        </Content>
      </Main>
    );
  }
}

export default ModuleLayout;