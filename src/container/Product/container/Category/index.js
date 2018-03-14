import React from 'react';
import PageTitle from 'component/PageTitle';

export default class Category extends React.Component {
  componentWillMount() {
    document.title = '品类管理 - React-Antd';
  }
  render() {
    return (
      <div>
        <PageTitle title="商品页 / 品类管理" />
      </div>
    );
  }
}
