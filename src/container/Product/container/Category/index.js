import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PageTitle from 'component/PageTitle';
import CategoryList from './CategoryList';
import CategoryAdd from './CategoryAdd';

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
          <Route path={`${match.url}/add`} exact component={CategoryAdd} />
          <Route
            path={`${match.url}/:categoryId?`}
            exact
            component={CategoryList}
          />
          <Redirect to="/error/404" />
        </Switch>
      </div>
    );
  }
}
