import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import OrderManage from './container/OrderManage';

export default class Order extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route path={`${match.url}/manage`} component={OrderManage} />
        <Redirect to="/error/404" />
      </Switch>
    );
  }
}
