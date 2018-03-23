import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'component/PageTitle';
import { Row, Col } from 'antd';
import 'public/style/errorPage/not-found.less';

export default class NotFound extends React.Component {
  componentWillMount() {
    document.title = 'breakdown - React-Antd';
  }
  render() {
    return (
      <div class="error-page">
        <PageTitle title="异常页 / 崩溃了" />
        <Row class="error-container">
          <Col span={4} />
          <Col span={7}>
            <div class="bg-box" />
          </Col>
          <Col span={2} />
          <Col span={7} class="error-content">
            <div>
              <h1>Error</h1>
              <span>发生错误，之前的页面崩溃了</span>
              <Link to="/">点击返回首页</Link>
            </div>
          </Col>
          <Col span={4} />
        </Row>
      </div>
    );
  }
}
