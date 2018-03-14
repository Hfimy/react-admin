import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

export default class Table extends React.Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    dataSource: PropTypes.object.isRequired //immutable对象
  };
  state = {
    isFirstLoading: true
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({ isFirstLoading: false });
    }
  }
  render() {
    let { columns, dataSource } = this.props;
    dataSource = dataSource.toJS(); //自身为immutable对象，拥有toJS()方法，无需再次引入immutable
    const listBody = dataSource.map(item => (
      <tr key={item.key}>
        {columns.map(column => {
          if (column.dataIndex === 'createTime') {
            return (
              <td
                key={column.key}
                title={new Date(item[column.dataIndex]).toLocaleString()}
              >
                {new Date(item[column.dataIndex]).toLocaleString()}
              </td>
            );
          }
          return (
            <td key={column.key} title={item[column.dataIndex]}>
              {item[column.dataIndex]}
            </td>
          );
        })}
      </tr>
    ));
    const listInfo = this.state.isFirstLoading ? (
      <tr>
        <td class="first-td">加载中...</td>
      </tr>
    ) : (
      <tr>
        <td class="error-td">没有找到相应的结果 ~</td>
      </tr>
    );
    return (
      <table class="custom-table">
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.key} title={column.title}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{dataSource.length ? listBody : listInfo}</tbody>
      </table>
    );
  }
}
