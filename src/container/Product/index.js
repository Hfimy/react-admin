import React from 'react';
import ErrorBoundary from 'component/ErrorBoundary';
import { Switch, Route, Redirect } from 'react-router-dom';
import Category from './container/Category';
import Commodity from './container/Commodity';

//此处该组件挂在路由上，具有路由传入的props,需要传入子组件
const CommodityWithErrorBoundary = props => (
  <ErrorBoundary redirectTo="/error/breakdown">
    <Commodity {...props} />
  </ErrorBoundary>
);
export default class Product extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route path={`${match.url}/category`} component={Category} />
        <Route
          path={`${match.url}/commodity`}
          component={CommodityWithErrorBoundary}
        />
        <Redirect to="/error/404" />
      </Switch>
    );
  }
}
