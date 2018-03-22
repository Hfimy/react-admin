import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Icon, message } from 'antd';
import PageTitle from 'component/PageTitle';
import { getStatisticData } from 'api';
import 'public/style/home/detail.less';

export default class Detail extends React.Component {
  state = {
    productCount: 0,
    userCount: 0,
    orderCount: 0
  };
  componentDidMount() {
    this._isMounted = true;
    document.title = '首页 - React-Antd';
    getStatisticData(res => {
      if (!this._isMounted) {
        return;
      }
      if (res.status === 0) {
        this.setState(res.data);
      } else {
        if (typeof res.msg === 'string') {
          message.error(res.msg);
        } else {
          message.error('未知获取数据错误');
        }
      }
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { productCount, userCount, orderCount } = this.state;
    return (
      <div class="detail">
        <PageTitle title={'首页'} />
        <Row gutter={96}>
          <Col span={8}>
            <Link to="/product/commodity" class="color-box brown">
              <p class="count">{productCount}</p>
              <p class="desc">
                <Icon type="shop" />
                <span>商品总数</span>
              </p>
            </Link>
          </Col>
          <Col span={8}>
            <Link to="/user/list" class="color-box green">
              <p class="count">{userCount}</p>
              <p class="desc">
                <Icon type="user" />
                <span>用户总数</span>
              </p>
            </Link>
          </Col>
          <Col span={8}>
            <Link to="/order/list" class="color-box blue">
              <p class="count">{orderCount}</p>
              <p class="desc">
                <Icon type="file" />
                <span>订单总数</span>
              </p>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}
