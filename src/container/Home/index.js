import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Layout, Button } from 'antd';

import TopHeader from './container/TopHeader';
import SideNav from './container/SideNav';
import Detail from './container/Detail';

import Product from 'container/Product';
import User from 'container/User';
import Order from 'container/Order';
import ErrorPage from 'container/ErrorPage';
import 'public/style/home/index.less';

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
      <div>
        {sessionStorage.getItem('sessionId') === null ? (
          <Redirect
            to={`/login?redirectTo=${encodeURIComponent(
              // window.location.pathname
              this.props.location.pathname
            )}`}
          />
        ) : (
          <Layout id="layout">
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={this.handleCollapse}
            >
              <SideNav />
            </Sider>
            <Layout>
              <Header>
                <TopHeader />
              </Header>
              <Content>
                <Switch>
                  <Route path="/" exact component={Detail} />
                  <Route path="/product" component={Product} />
                  <Route path="/user" component={User} />
                  <Route path="/order" component={Order} />
                  <Route path="/error" component={ErrorPage} />
                  <Redirect to="/error/404" />
                </Switch>
              </Content>
              <Footer>Copyright &copy; 2018 Hfimy. All rights reserved</Footer>
            </Layout>
          </Layout>
        )}
      </div>
    );
  }
}
