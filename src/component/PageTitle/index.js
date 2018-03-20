import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import './style.less';

export default class PageTitle extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };
  render() {
    return (
      <Row class="page-title">
        <Col span={6} class="left">
          <h3>{this.props.title}</h3>
        </Col>
        <Col span={6} class="right">
          {this.props.children}
        </Col>
      </Row>
    );
  }
}
