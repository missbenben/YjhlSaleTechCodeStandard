import React, { Component } from 'react';
import '../App.css';
import  WrappedLoginForm from './WrappedLoginForm'
import { Route,Switch } from 'react-router'
import MyLayout from './MyLayout'


class App extends Component {


  render() {

      return (
          <div className="App">
              <Switch>
                  <Route  path="/login"  component={WrappedLoginForm} exact/>
                  <Route  component={MyLayout} exact/>
              </Switch>
          </div>
    )
  }
}


export default App
