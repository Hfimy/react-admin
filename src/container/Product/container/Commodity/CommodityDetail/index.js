import React from 'react';
import { Button } from 'antd';

export default class CommodityDetail extends React.Component {
  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <div>
        商品详情页
        <Button onClick={this.goBack}>返回</Button>
      </div>
    );
  }
}
