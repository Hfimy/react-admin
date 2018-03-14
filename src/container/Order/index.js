import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import OrderList from './container/OrderList';

export default class Order extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route path={`${match.url}/list`} exact component={OrderList} />
        <Redirect to="/error/404" />
      </Switch>
    );
  }
}
