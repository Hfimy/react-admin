import React from 'react';
import { Button, message } from 'antd';
import PropTypes from 'prop-types';

import './style.less';

export default class Search extends React.Component {
  static propTypes = {
    defaultSearchType: PropTypes.string.isRequired,
    optionList: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired
    // width: PropTypes.string
  };
  state = {
    searchType: this.props.defaultSearchType,
    searchKeyword: ''
  };
  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value.trim()
    });
  };
  onSearch = () => {
    const { searchType, searchKeyword } = this.state;
    // if (searchKeyword === '') {
    //   message.warning('关键字不能为空');
    //   return;
    // }
    this.props.onSearch(searchType, searchKeyword);
  };
  onKeyUp = e => {
    if (e.keyCode === 13) {
      this.onSearch();
    }
  };
  render() {
    const { searchType, searchKeyword } = this.state;
    const { defaultSearchType, optionList } = this.props;
    return (
      <div class="search">
        <select
          name="searchType"
          defaultValue={defaultSearchType}
          onChange={this.onChange}
        >
          {optionList.map((item, index) => (
            <option key={index} value={item.key}>
              {item.value}
            </option>
          ))}
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
