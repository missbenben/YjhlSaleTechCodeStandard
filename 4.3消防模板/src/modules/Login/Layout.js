import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Index from './Index/index';
import Single from './Single/index';
import RecoverPassword from './RecoverPassword/index';

class ModuleLayout extends Component{
  componentWillMount(): void{
    sessionStorage.removeItem('users');
    sessionStorage.removeItem('userInfor');
    sessionStorage.removeItem('role');
  }
  render(): Array{
    return (
      <Switch>
        <Route path="/Login" component={ Index } exact={ true } />
        <Route path="/Login/Single" component={ Single } exact={ true } />
        <Route path="/Login/RecoverPassword" component={ RecoverPassword } exact={ true } />
      </Switch>
    );
  }
}

export default ModuleLayout;