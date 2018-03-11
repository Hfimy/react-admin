import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import './style.less';

export default class PageTitle extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };
  render() {
    return (
      <Row class="page-title">
        <h2>{this.props.title}</h2>
      </Row>
    );
  }
}
