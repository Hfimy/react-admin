import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PageTitle from 'component/PageTitle';

import CommodityList from './CommodityList';
import CommodityDetail from './CommodityDetail';
import CommodityEdit from './CommodityEdit';
import CommodityAdd from './CommodityAdd';

export default class Commodity extends React.Component {
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
          <Route path={`${match.url}/edit`} exact component={CommodityEdit} />
          <Route path={`${match.url}/add`} exact component={CommodityAdd} />
          <Redirect to="/error/404" />
        </Switch>
      </div>
    );
  }
}
