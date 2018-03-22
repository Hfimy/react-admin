import React from 'react';
import { withRouter } from 'react-router-dom';
import { Icon, message, Modal, Button } from 'antd';
import { handleLogout } from 'api';
import 'public/style/home/top-header.less';

@withRouter
export default class TopHeader extends React.Component {
  showConfirm = () => {
    Modal.confirm({
      title: '确认退出吗',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.onLogout();
            resolve();
          }, 1000);
        });
      },
      onCancel() {}
    });
  };
  onLogout = () => {
    handleLogout(res => {
      if (res.status === 0) {
        sessionStorage.removeItem('sessionId');
        sessionStorage.removeItem('username');
        this.props.history.push('/login');
        message.success('退出成功');
      } else {
        if (typeof res.msg === 'string') {
          message.error(res.msg);
        } else {
          message.error('未知注销错误');
        }
      }
    });
  };
  render() {
    return (
      <div class="top-header">
        <Icon type="user" />
        {`欢迎，${sessionStorage.getItem('username')}`}
        <Icon
          type="logout"
          class="logout-icon"
          title="点击退出"
          onClick={this.showConfirm}
        />
      </div>
    );
  }
}
