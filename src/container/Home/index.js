import React from 'react';
import { Layout } from 'antd';
import SideNav from './container/SideNav';
import Main from './container/Main';
import './style.less';

const { Header, Content, Footer, Sider } = Layout;

export default class Home extends React.Component {
  state = {
    collapsed: false
  };
  handleCollapse = collapsed => {
    this.setState({ collapsed });
  };
  render() {
    const { collapsed } = this.state;
    return (
      <Layout id="layout">
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.handleCollapse}
        >
          <SideNav />
        </Sider>
        <Layout>
          <Header>header</Header>
          <Content>
            <Main />
          </Content>
          <Footer>Copyright &copy; 2018 Hfimy. All rights reserved</Footer>
        </Layout>
      </Layout>
    );
  }
}
