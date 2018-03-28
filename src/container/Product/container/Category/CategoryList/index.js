import React from 'react';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import { message, Modal, Button, Icon } from 'antd';
import Table from 'component/Table';
import { getCategoryId, modifyCategoryName } from 'api/product';
import 'public/style/product/category-list.less';
import 'public/style/product/ant-modal.less';

const customWidth = ['33%', '33%', '34%'];
export default class CategoryList extends React.Component {
  state = {
    parentId: this.props.match.params.categoryId || 0,
    columns: [
      { title: '品类ID', dataIndex: 'id', width: customWidth[0] },
      { title: '品类名称', dataIndex: 'name', width: customWidth[1] },
      { title: '操作', dataIndex: 'operation', width: customWidth[2] }
    ],
    categoryList: []
  };
  componentWillMount() {
    this._isMounted = true;
    document.title = '品类管理 - React-Antd';
    this.handleGetCategoryList(this.state.parentId);
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
  onChangeName = (id, name) => {
    const newName = window.prompt('修改名称', name);
    if (newName) {
      const data = { categoryId: id, categoryName: newName };
      modifyCategoryName(data, res => {
        if (res.status === 0) {
          message.success('修改成功');
          this.handleGetCategoryList(this.state.parentId);
        } else {
          if (typeof res.msg === 'string') {
            message.error(res.msg);
          } else {
            message.error('修改失败');
          }
        }
      });
    }
  };
  componentDidUpdate(prevProps, prevState) {
    const preId = prevProps.match.params.categoryId || 0;
    const curId = this.props.match.params.categoryId || 0;
    if (preId !== curId) {
      this.setState({ parentId: curId });
      this.handleGetCategoryList(curId);
    }
  }
  render() {
    const { parentId, categoryList, columns } = this.state;
    const dataSource = categoryList.map((item, index) => {
      const { id, name } = item;
      return {
        key: index,
        id,
        name,
        operation: (
          <div class="operation">
            <a key="modify" onClick={e => this.onChangeName(id, name)}>
              修改名称
            </a>
            {parentId === 0 ? (
              <Link key="see" to={`/product/category/${id}`}>
                查看子品类
              </Link>
            ) : null}
          </div>
        )
      };
    });
    return (
      <div class="categorylist-page">
        <p>
          <span>父级品类Id ：{parentId}</span>
          {parentId !== 0 ? (
            <Link to="/product/category">
              <Button type="primary" ghost>
                返回上一级
              </Button>
            </Link>
          ) : (
            <Link to="/product/category/add">
              <Button type="primary">
                <Icon type="plus" />新增品类
              </Button>
            </Link>
          )}
        </p>
        <div class="table-container">
          <Table columns={columns} dataSource={Immutable.fromJS(dataSource)} />
        </div>
      </div>
    );
  }
}
