import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PageTitle from 'component/PageTitle';
import CategoryList from './CategoryList';

export default class Category extends React.Component {
  componentDidMount() {
    document.title = '品类管理 - React-Antd';
  }
  render() {
    const { match } = this.props;
    return (
      <div class="product-page">
        <PageTitle title="商品页 / 品类管理" />
        <Switch>
          <Route
            path={`${match.url}/:categoryId?`}
            exact
            component={CategoryList}
          />
          {/* <Route
            path={`${match.url}/detail/:id`}
            exact
            component={CommodityDetail}
          /> */}
          {/* <Route path={`${match.url}/add`} exact component={CommodityAdd} /> */}
          {/* <Route
            path={`${match.url}/add/:id?`}
            exact
            component={CommodityAdd}
          /> */}
          <Redirect to="/error/404" />
        </Switch>
      </div>
    );
  }
}
