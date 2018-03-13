import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Detail from '../Detail';
import Product from 'container/Product';
import User from 'container/User';
import Order from 'container/Order';
import ErrorPage from 'container/ErrorPage';

export default class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Detail} />
        <Route path="/product" component={Product} />
        <Route path="/user" component={User} />
        <Route path="/order" component={Order} />
        <Route path="/error" component={ErrorPage} />
        <Redirect to="error/404" />
      </Switch>
    );
  }
}
