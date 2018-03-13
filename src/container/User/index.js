import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserList from './container/UserList';

export default class User extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route path={`${match.url}/list`} component={UserList} />
        <Redirect to="error/404" />
      </Switch>
    );
  }
}
