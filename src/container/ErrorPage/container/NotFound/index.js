import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'component/PageTitle';
import { Row, Col } from 'antd';
import 'public/style/errorPage/not-found.less';

export default class NotFound extends React.Component {
  componentWillMount() {
    document.title = '404 - React-Antd';
  }
  render() {
    return (
      <div class="error-page">
        <PageTitle title="异常页 / 404" />
        <Row class="error-container">
          <Col span={4} />
          <Col span={7}>
            <div class="bg-box" />
          </Col>
          <Col span={2} />
          <Col span={7} class="error-content">
            <div>
              <h1>404</h1>
              <span>抱歉，你访问的页面不存在</span>
              <Link to="/">点击返回首页</Link>
            </div>
          </Col>
          <Col span={4} />
        </Row>
      </div>
    );
  }
}
