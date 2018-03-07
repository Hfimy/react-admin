import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import Layout from './component/Layout';
import Home from 'page/Home';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default hot(module)(App);
