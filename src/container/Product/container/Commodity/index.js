import React from 'react';
import PageTitle from 'component/PageTitle';

export default class Commodity extends React.Component {
  componentWillMount() {
    document.title = '商品管理 - React-Antd';
  }
  render() {
    return (
      <div>
        <PageTitle title="商品页 / 商品管理" />
      </div>
    );
  }
}
