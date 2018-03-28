import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PageTitle from 'component/PageTitle';
import OrderList from './OrderList';
import OrderDetail from './OrderDetail';

export default class OrderManage extends React.Component {
  componentWillMount() {
    document.title = '订单管理 - React-Antd';
  }
  render() {
    const { match } = this.props;
    return (
      <div>
        <PageTitle title="订单页 / 订单管理" />
        <Switch>
          <Route path={`${match.url}/`} exact component={OrderList} />
          <Route
            path={`${match.url}/detail/:orderNumber`}
            exact
            component={OrderDetail}
          />
          <Redirect to="/error/404" />
        </Switch>
      </div>
    );
  }
}
