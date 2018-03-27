import React from 'react';
import { Menu, Icon } from 'antd';
import { Link, NavLink, withRouter } from 'react-router-dom';
import data from './data';
import 'public/style/home/side-nav.less';

const SubMenu = Menu.SubMenu;

@withRouter
export default class SideNav extends React.Component {
  state = {
    selectedKeys: ['1'],
    defaultOpenKeys: []
  };
  componentWillMount() {
    const { routeData, subMenuData } = data;
    let pathname = this.props.location.pathname;
    //此处对commodity页面内部的子页面进行处理，统一在侧边栏的导航显示
    if (/^\/product\/commodity\S*$/.test(pathname)) {
      pathname = '/product/commodity';
    }
    if (/^\/product\/category\S*$/.test(pathname)) {
      pathname = '/product/category';
    }
    const selectedKey = routeData.get(pathname);
    //如在componentDidMount中设置defaultOpenKeys无效
    const openKey = subMenuData.has(selectedKey)
      ? subMenuData.get(selectedKey)
      : undefined;
    this.setState({ selectedKeys: [selectedKey], defaultOpenKeys: [openKey] });
  }
  //主要针对重定向404页面侧边导航的更新
  componentWillReceiveProps(nextProps) {
    //defaultOpenKeys仅在组件第一次挂载时才有效，后续更新该值无效
    const { routeData } = data;
    let pathname = nextProps.location.pathname;
    if (/^\/product\/commodity\S*$/.test(pathname)) {
      pathname = '/product/commodity';
    }
    if (/^\/product\/category\S*$/.test(pathname)) {
      pathname = '/product/category';
    }
    const selectedKey = routeData.get(pathname);
    this.setState({
      selectedKeys: [selectedKey]
    });
  }
  handleSelect = e => {
    this.setState({ selectedKeys: [e.key] });
  };
  render() {
    const { selectedKeys, defaultOpenKeys } = this.state;
    return (
      <nav class="side-nav">
        <h2>
          <Link to="/" onClick={() => this.handleSelect({ key: '1' })}>
            <img src={require('public/image/logo.svg')} />React Antd
          </Link>
        </h2>
        <Menu
          selectedKeys={selectedKeys}
          defaultOpenKeys={defaultOpenKeys}
          mode="inline"
          theme="dark"
          inlineCollapsed={false}
          onSelect={this.handleSelect}
        >
          <Menu.Item key="1">
            <NavLink to="/">
              <Icon type="home" />
              <span>首页</span>
            </NavLink>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="shop" />
                <span>商品页</span>
              </span>
            }
          >
            <Menu.Item key="2">
              <NavLink to="/product/commodity">商品管理</NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/product/category">品类管理</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="user" />
                <span>用户页</span>
              </span>
            }
          >
            <Menu.Item key="4">
              <NavLink to="/user/list">用户列表</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="file" />
                <span>订单页</span>
              </span>
            }
          >
            <Menu.Item key="5">
              <NavLink to="/order/list">订单管理</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub4"
            title={
              <span>
                <Icon type="warning" />
                <span>异常页</span>
              </span>
            }
          >
            <Menu.Item key="6">
              <NavLink to="/error/404">404</NavLink>
            </Menu.Item>
            <Menu.Item key="7">
              <NavLink to="/error/breakdown">breakdown</NavLink>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </nav>
    );
  }
}
