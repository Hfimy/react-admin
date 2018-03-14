import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Category from './container/Category';
import Commodity from './container/Commodity';

export default class Product extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route path={`${match.url}/category`} exact component={Category} />
        <Route path={`${match.url}/commodity`} exact component={Commodity} />
        <Redirect to="/error/404" />
      </Switch>
    );
  }
}
