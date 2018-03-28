import React from 'react';
import Immutable from 'immutable';
import { message, Pagination } from 'antd';
import PageTitle from 'component/PageTitle';
import Table from 'component/Table';
import { getUserList } from 'api';
import 'public/style/user/user-list.less';
const customWidth = ['12%', '16%', '18%', '26%', '28%'];
export default class UserList extends React.Component {
  state = {
    current: 1,
    // pageSize:10,//默认为10
    total: 0,
    data: [],
    columns: [
      { title: 'ID', dataIndex: 'id', width: customWidth[0] },
      { title: '用户名', dataIndex: 'username', width: customWidth[1] },
      { title: '电话', dataIndex: 'phone', width: customWidth[2] },
      { title: '邮箱', dataIndex: 'email', width: customWidth[3] },
      { title: '注册时间', dataIndex: 'createTime', width: customWidth[4] }
    ]
  };
  componentDidMount() {
    this._isMounted = true;
    document.title = '用户列表 - React-Antd';
    getUserList(this.state.current, res => {
      if (!this._isMounted) {
        return;
      }
      if (res.status === 0) {
        this.setState({
          data: res.data.list,
          total: res.data.total
        });
      } else {
        if (typeof res.msg === 'string') {
          message.error(res.msg);
        } else {
          message.error('未知获取数据错误');
        }
        this.setState({ data: [] });
      }
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  onChange = pageNum => {
    this.setState(
      {
        current: pageNum
      },
      () => {
        getUserList(this.state.current, res => {
          if (!this._isMounted) {
            return;
          }
          if (res.status === 0) {
            this.setState({ data: res.data.list, total: res.data.total });
          } else {
            if (typeof res.msg === 'string') {
              message.error(res.msg);
            } else {
              message.error('未知获取数据错误');
            }
            this.setState({ data: [] });
          }
        });
      }
    );
  };
  render() {
    const { columns, current, total, data } = this.state;
    const dataSource = data.map((item, index) => {
      const { id, username, email, phone, createTime } = item;
      return {
        key: index,
        id,
        username,
        phone,
        email,
        createTime: new Date(createTime).toLocaleString()
      };
    });
    return (
      <div class="userlist-page">
        <PageTitle title="用户页 / 用户列表" />
        <div class="table-container">
          <Table columns={columns} dataSource={Immutable.fromJS(dataSource)} />
        </div>
        <Pagination
          showQuickJumper
          hideOnSinglePage
          current={current}
          total={total}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
