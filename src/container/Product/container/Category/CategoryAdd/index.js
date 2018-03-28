import React from 'react';
import { Button, message } from 'antd';
import { getCategoryId, addCategory } from 'api/product';
import 'public/style/product/category-add.less';

export default class CategoryAdd extends React.Component {
  state = {
    parentId: 0,
    categoryName: '',
    categoryList: []
  };
  componentWillMount() {
    this._isMounted = true;
    this.handleGetCategoryList(0);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleGetCategoryList = id => {
    getCategoryId(id, res => {
      if (!this._isMounted) {
        return;
      }
      if (res.status === 0) {
        // message.success('获取数据成功');
        this.setState({ categoryList: res.data });
      } else {
        if (typeof res.msg === 'string') {
          message.error(res.msg);
        } else {
          message.error('获取数据失败');
        }
        this.setState({ categoryList: [] });
      }
    });
  };
  onChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };
  handleAdd = () => {
    const { categoryName, parentId } = this.state;
    if (!categoryName.trim()) {
      message.warning('品类名称不能为空');
      return;
    }
    addCategory({ categoryName, parentId }, res => {
      if (res.status === 0) {
        message.success('添加成功');
        this.goBack();
      } else {
        if (typeof res.msg === 'string') {
          message.error(res.msg);
        } else {
          message.error('添加失败，服务器错误');
        }
      }
    });
  };
  goBack = () => {
    this.props.history.push('/product/category');
  };
  render() {
    const { categoryName, categoryList } = this.state;
    return (
      <div class="categoryadd-page">
        <div class="form-group">
          <label>所属品类</label>
          <select name="parentId" onChange={this.onChange}>
            <option value={0}>根品类/</option>
            {categoryList.map((item, index) => (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div class="form-group">
          <label>品类名称</label>
          <input
            name="categoryName"
            placeholder="请输入品类名称"
            value={categoryName}
            onChange={this.onChange}
          />
        </div>
        <div class="form-group">
          <Button class="btn-add" type="primary" onClick={this.handleAdd}>
            添加
          </Button>
          <Button class="btn-goback" type="primary" ghost onClick={this.goBack}>
            返回
          </Button>
        </div>
      </div>
    );
  }
}
