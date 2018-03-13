import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from './container/NotFound';

export default class ErrorPage extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route path={`${match.url}/404`} component={NotFound} />
        <Redirect to="error/404" />
      </Switch>
    );
  }
}
