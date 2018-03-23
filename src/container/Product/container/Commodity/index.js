import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import PageTitle from 'component/PageTitle';

import CommodityList from './CommodityList';
import CommodityDetail from './CommodityDetail';
import CommodityAdd from './CommodityAdd';

import 'public/style/product/commodity.less';

// @withRouter  通过...props直接获取赋值
export default class Commodity extends React.Component {
  componentDidMount() {
    document.title = '商品管理 - React-Antd';
  }
  render() {
    const { match } = this.props;
    return (
      <div class="product-page">
        <PageTitle title="商品页 / 商品管理" />
        <Switch>
          <Route path={`${match.url}/`} exact component={CommodityList} />
          <Route
            path={`${match.url}/detail`}
            exact
            component={CommodityDetail}
          />
          <Route path={`${match.url}/add`} exact component={CommodityAdd} />
          <Route path={`${match.url}/add/:id`} exact component={CommodityAdd} />
          <Redirect to="/error/404" />
        </Switch>
      </div>
    );
  }
}
