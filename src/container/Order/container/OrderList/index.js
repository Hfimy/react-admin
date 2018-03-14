import React from 'react';
import PageTitle from 'component/PageTitle';

export default class OrderList extends React.Component {
  componentWillMount() {
    document.title = '订单管理 - React-Antd';
  }
  render() {
    return (
      <div>
        <PageTitle title="订单页 / 订单管理" />
      </div>
    );
  }
}
