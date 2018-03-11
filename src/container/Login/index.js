import React from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button, message } from 'antd';
import { handleLogin } from 'api';
import './style.less';

const FormItem = Form.Item;

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = { username: values.userName, password: values.password };
        handleLogin(data, res => {
          if (res.status === 0) {
            sessionStorage.setItem('sessionId', res.data.id);
            this.props.history.push('/');
            message.success('登录成功');
          } else {
            if (typeof res.msg === 'string') {
              message.error(res.msg);
            } else {
              message.error('未知登录错误');
            }
          }
        });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div class="login">
        {/* 判断是否登录，已登录则跳转至首页 */}
        {sessionStorage.getItem('sessionId') !== null ? (
          <Redirect to="/" />
        ) : null}
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            <h2>React-Antd 后台管理系统</h2>
          </FormItem>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder="Username"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Login);
