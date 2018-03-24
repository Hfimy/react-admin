import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { getCategoryId } from 'api/product';
import './style.less';

export default class Selector extends React.Component {
  static propTypes = {
    value: PropTypes.shape({
      categoryId: PropTypes.number.isRequired,
      parentCategoryId: PropTypes.number.isRequired
    }),
    onChange: PropTypes.func
  };
  constructor(props) {
    super(props);
    const { categoryId, parentCategoryId } = this.props.value;
    this.state = {
      categoryId,
      parentCategoryId,
      firstCategoryIdLevelList: [],
      secondCategoryIdLevelList: []
    };
  }
  componentWillMount() {
    this._isMounted = true;
    this.initCategoryList(0, 'firstCategoryIdLevelList');
  }
  componentWillReceiveProps(nextProps) {
    const { categoryId, parentCategoryId } = nextProps.value;
    if (categoryId !== this.props.value.categoryId) {
      this.setState({ categoryId, parentCategoryId }, () => {
        //一级分类
        if (parentCategoryId === 0) {
          //如果是默认分类，则什么都不做
          if (categoryId === 0) {
            return;
          }
          this.initCategoryList(categoryId, 'secondCategoryIdLevelList');
        } else {
          //二级分类
          this.initCategoryList(parentCategoryId, 'secondCategoryIdLevelList');
        }
      });
    }
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

  handleFirstCategoryIdChange = e => {
    const firstCategoryId = Number(e.target.value);
    if (firstCategoryId === 0) {
      this.initCategoryList(0, 'firstCategoryIdLevelList');
    } else {
      this.initCategoryList(firstCategoryId, 'secondCategoryIdLevelList');
    }
    this.setState({
      categoryId: firstCategoryId,
      parentCategoryId: 0
    });
    this.triggerChange({
      categoryId: firstCategoryId,
      parentCategoryId: 0
    });
  };
  handleSecondCategoryIdChange = e => {
    const secondCategoryId = Number(e.target.value);
    let { categoryId, parentCategoryId } = this.state;
    if (secondCategoryId === 0) {
      categoryId = parentCategoryId;
      parentCategoryId = 0;
    } else {
      if (parentCategoryId === 0) {
        parentCategoryId = categoryId;
      }
      categoryId = secondCategoryId;
    }
    this.setState({
      categoryId,
      parentCategoryId
    });
    this.triggerChange({
      categoryId,
      parentCategoryId
    });
  };
  triggerChange = value => {
    this.props.onChange(value);
  };

  render() {
    const {
      firstCategoryIdLevelList,
      secondCategoryIdLevelList,
      categoryId,
      parentCategoryId
    } = this.state;
    let isFirst = true;
    if (parentCategoryId !== 0) {
      isFirst = false;
    }
    return (
      <div class="selector">
        <select
          value={isFirst ? categoryId : parentCategoryId}
          onChange={this.handleFirstCategoryIdChange}
        >
          <option value={0}>请选择一级分类（默认一级）</option>
          {firstCategoryIdLevelList.map((item, key) => (
            <option key={key} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {categoryId !== 0 ? (
          <select
            value={isFirst ? 0 : categoryId}
            onChange={this.handleSecondCategoryIdChange}
          >
            <option value={0}>请选择二级分类</option>
            {secondCategoryIdLevelList.map((item, key) => (
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
