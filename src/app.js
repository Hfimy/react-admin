import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from 'container/Login';
import Home from 'container/Home';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);
