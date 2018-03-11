import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Icon } from 'antd';
import PageTitle from 'component/PageTitle';
import './style.less';

export default class Detail extends React.Component {
  state = {
    commodity: 0,
    user: 0,
    order: 0
  };
  render() {
    const { commodity, user, order } = this.state;
    return (
      <div class="detail">
        <PageTitle title={'首页'} />
        <Row gutter={96}>
          <Col span={8}>
            <Link to="/commodity" class="color-box brown">
              <p class="count">{commodity}</p>
              <p class="desc">
                <Icon type="shop" />
                <span>商品总数</span>
              </p>
            </Link>
          </Col>
          <Col span={8}>
            <Link to="/userlist" class="color-box green">
              <p class="count">{user}</p>
              <p class="desc">
                <Icon type="user" />
                <span>用户总数</span>
              </p>
            </Link>
          </Col>
          <Col span={8}>
            <Link to="/orderlist" class="color-box blue">
              <p class="count">{order}</p>
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
