import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { getCategoryId } from 'api/product';
import './style.less';

export default class Selector extends React.Component {
  static propTypes = {
    value: PropTypes.shape({
      one: PropTypes.number,
      two: PropTypes.number,
      current: PropTypes.number
    }),
    onChange: PropTypes.func
  };
  constructor(props) {
    super(props);
    const { one, two, current } = this.props.value;
    this.state = {
      one,
      two,
      current,
      oneLevelList: [],
      twoLevelList: []
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.initCategoryList(0, 'oneLevelList');
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  initCategoryList = (id, listType) => {
    getCategoryId(id, res => {
      if (!this._isMounted) {
        return;
      }
      if (res.status === 0) {
        this.setState({
          [listType]: res.data
        });
      } else {
        if (typeof res.msg === 'string') {
          message.error(res.msg);
        } else {
          message.error('未知获取数据错误');
        }
        this.setState({ listType: [] });
      }
    });
  };

  handleOneChange = e => {
    const one = Number(e.target.value);
    if (one === 0) {
      this.initCategoryList(0, 'oneLevelList');
    } else {
      this.initCategoryList(one, 'twoLevelList');
    }
    const newState = { one, two: 0, current: one };
    this.setState(newState);
    this.triggerChange(newState);
  };
  handleTwoChange = e => {
    const two = Number(e.target.value);
    let newState;
    if (two === 0) {
      newState = {
        one: this.state.one,
        two,
        current: this.state.one
      };
    } else {
      newState = {
        one: this.state.one,
        two,
        current: two
      };
    }
    this.setState(newState);
    this.triggerChange(newState);
  };
  triggerChange = value => {
    this.props.onChange(value);
  };

  render() {
    const { one, two, oneLevelList, twoLevelList, current } = this.state;
    return (
      <div class="selector">
        <select value={one} onChange={this.handleOneChange}>
          <option value={0}>请选择一级分类（默认一级）</option>
          {oneLevelList.map((item, key) => (
            <option key={key} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {current !== 0 ? (
          <select value={two} onChange={this.handleTwoChange}>
            <option value={0}>请选择二级分类</option>
            {twoLevelList.map((item, key) => (
              <option key={key} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        ) : null}
      </div>
    );
  }
}
