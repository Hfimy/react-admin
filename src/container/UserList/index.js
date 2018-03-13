import React from 'react';
import { message, Pagination, Table } from 'antd';
import PageTitle from 'component/PageTitle';
import { getUserList } from 'api';
export default class UserList extends React.Component {
  state = {
    current: 1,
    // pageSize:10,//默认为10
    total: 0,
    data: [],
    columns: [
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: '用户名', dataIndex: 'username', key: 'username' },
      { title: '邮箱', dataIndex: 'eamil', key: 'email' },
      { title: '电话', dataIndex: 'phone', key: 'phone' },
      { title: '注册时间', dataIndex: 'createTime', key: 'createTime' }
    ]
  };
  componentWillMount() {
    getUserList(this.state.current, res => {
      console.log('res', res);
      if (res.status === 0) {
        this.setState({ data: res.data.list, total: res.data.total });
      } else {
        if (typeof res.msg === 'string') {
          message.error(res.msg);
        } else {
          message.error('未知获取数据错误');
        }
      }
    });
  }
  onChange = pageNum => {
    this.setState(
      {
        current: pageNum
      },
      () => {
        getUserList(this.state.current, res => {
          if (res.status === 0) {
            console.log(res);
            this.setState({ data: res.data.list, total: res.data.total });
          } else {
            if (typeof res.msg === 'string') {
              message.error(res.msg);
            } else {
              message.error('未知获取数据错误');
            }
          }
        });
      }
    );
  };
  render() {
    const { columns, current, total, data } = this.state;
    const dataSource = data.map((item, index) => {
      const { id, username, email, phone, createTime } = item;
      return { key: index, id, username, email, phone, createTime };
    });
    return (
      <div>
        <PageTitle title="用户页 / 用户列表" />
        <div>
          <Table columns={columns} dataSource={dataSource} />
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
