import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NotFound from './container/NotFound';
import BreakDown from './container/BreakDown';
export default class ErrorPage extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route path={`${match.url}/404`} exact component={NotFound} />
        <Route path={`${match.url}/breakdown`} exact component={BreakDown} />
        <Redirect to="/error/404" />
      </Switch>
    );
  }
}
