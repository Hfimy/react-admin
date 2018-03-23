import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
import { getCategoryId } from 'api/product';
import './style.less';

export default class Selector extends React.Component {
  static propTypes = {
    value: PropTypes.shape({
      firstCategoryId: PropTypes.number,
      secondCategoryId: PropTypes.number,
      currentCategoryId: PropTypes.number
    }),
    onChange: PropTypes.func
  };
  constructor(props) {
    super(props);
    const {
      firstCategoryId,
      secondCategoryId,
      currentCategoryId
    } = this.props.value;
    this.state = {
      firstCategoryId,
      secondCategoryId,
      currentCategoryId,
      firstCategoryIdLevelList: [],
      secondCategoryIdLevelList: []
    };
  }
  componentWillReceiveProps(nextProps) {
    const {
      firstCategoryId,
      secondCategoryId,
      currentCategoryId
    } = nextProps.value;
    if (currentCategoryId !== this.props.currentCategoryId) {
      // this.setState({
      //   value: {
      //     firstCategoryId,
      //     secondCategoryId,
      //     currentCategoryId
      //   }
      // });
      if (firstCategoryId === 0) {
        this.setState({
          value: {
            firstCategoryId,
            secondCategoryId: 0,
            currentCategoryId
          }
        });
      } else {
        this.setState(
          {
            value: {
              firstCategoryId,
              secondCategoryId,
              currentCategoryId
            }
          },
          () => {
            this.initCategoryList(firstCategoryId, 'secondCategoryIdLevelList');
          }
        );
      }
    }
  }
  componentDidMount() {
    this._isMounted = true;
    this.initCategoryList(0, 'firstCategoryIdLevelList');
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
    const newState = {
      firstCategoryId,
      secondCategoryId: 0,
      currentCategoryId: firstCategoryId
    };
    this.setState(newState);
    this.triggerChange(newState);
  };
  handleSecondCategoryIdChange = e => {
    const secondCategoryId = Number(e.target.value);
    let newState;
    if (secondCategoryId === 0) {
      newState = {
        firstCategoryId: this.state.firstCategoryId,
        secondCategoryId,
        currentCategoryId: this.state.firstCategoryId
      };
    } else {
      newState = {
        firstCategoryId: this.state.firstCategoryId,
        secondCategoryId,
        currentCategoryId: secondCategoryId
      };
    }
    this.setState(newState);
    this.triggerChange(newState);
  };
  triggerChange = value => {
    this.props.onChange(value);
  };

  render() {
    const {
      firstCategoryId,
      secondCategoryId,
      firstCategoryIdLevelList,
      secondCategoryIdLevelList,
      currentCategoryId
    } = this.state;
    return (
      <div class="selector">
        <select
          value={firstCategoryId}
          onChange={this.handleFirstCategoryIdChange}
        >
          <option value={0}>请选择一级分类（默认一级）</option>
          {firstCategoryIdLevelList.map((item, key) => (
            <option key={key} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {currentCategoryId !== 0 ? (
          <select
            value={secondCategoryId}
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
