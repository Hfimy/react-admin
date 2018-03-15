import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from 'container/Login';
import Home from 'container/Home';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* 第一级按照是否登录页划分路由 ，默认模糊匹配,比如/login/*也能被登录页匹配，
          但最终实际被匹配的页面路由应该为完全匹配*/}
          <Route path="/login" exact component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);
