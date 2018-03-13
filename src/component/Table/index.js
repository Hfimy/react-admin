import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

export default class Table extends React.Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    dataSource: PropTypes.array.isRequired
  };
  render() {
    const { columns, dataSource, firstLoading } = this.props;
    const listBody = dataSource.map(item => (
      <tr key={item.key}>
        <td title={item.id}>{item.id}</td>
        <td title={item.username}>{item.username}</td>
        <td title={item.email}>{item.email}</td>
        <td title={item.phone}>{item.phone}</td>
        <td title={item.createTime}>{item.createTime}</td>
      </tr>
    ));
    const errorBody = (
      <tr>
        <td class="error-td">没有找到相应的结果 ~</td>
      </tr>
    );
    const firstBody = (
      <tr>
        <td class="first-td">加载中...</td>
      </tr>
    );
    return (
      <table class="custom-table">
        <thead>
          <tr>
            {columns.map(item => (
              <th key={item.key} title={item.title}>
                {item.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {firstLoading ? firstBody : dataSource.length ? listBody : errorBody}
        </tbody>
      </table>
    );
  }
}
