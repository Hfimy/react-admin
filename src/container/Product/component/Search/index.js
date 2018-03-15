import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

import './style.less';

export default class Search extends React.Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
    width: PropTypes.string
  };
  state = {
    searchType: 'productId',
    searchKeyword: ''
  };
  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };
  onSearch = () => {
    // console.log(this.state);
    const { searchType, searchKeyword } = this.state;
    this.props.onSearch(searchType, searchKeyword.trim());
  };
  onKeyUp = e => {
    if (e.keyCode === 13) {
      this.onSearch();
    }
  };
  render() {
    const { searchType, searchKeyword } = this.state;
    const { width = '1000px' } = this.props;
    return (
      <div class="search" style={{ width: width }}>
        <select
          name="searchType"
          defaultValue="productId"
          onChange={this.onChange}
        >
          <option value="productId">商品ID</option>
          <option value="productName">商品名称</option>
        </select>
        <input
          name="searchKeyword"
          type="text"
          placeholder="关键字"
          value={searchKeyword}
          onChange={this.onChange}
          onKeyUp={this.onKeyUp}
        />
        <Button type="primary" onClick={this.onSearch}>
          搜索
        </Button>
      </div>
    );
  }
}
