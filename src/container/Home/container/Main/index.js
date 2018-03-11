import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Detail from '../Detail';
import Commodity from 'container/Commodity';
import Category from 'container/Category';
import UserList from 'container/UserList';
import OrderList from 'container/OrderList';
import NotFound from 'container/NotFound';

export default class Main extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Detail} />
        <Route path="/commodity" component={Commodity} />
        <Route path="/category" component={Category} />
        <Route path="/userlist" component={UserList} />
        <Route path="/orderlist" component={OrderList} />
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    );
  }
}
