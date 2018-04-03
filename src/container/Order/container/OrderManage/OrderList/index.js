import React from 'react';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import Table from 'component/Table';
import Search from 'component/Search';
import { Pagination, message } from 'antd';
import { getOrderList } from 'api/order';
import 'public/style/order/order-list.less';

const customWidth = ['20%', '16%', '16%', '16%', '16%', '16%'];
export default class OrderList extends React.Component {
  state = {
    current: 1,
    total: 0,
    data: [],
    columns: [
      {
        title: '订单号',
        dataIndex: 'orderNo',
        width: customWidth[0]
      },
      {
        title: '收件人',
        dataIndex: 'receiverName',
        width: customWidth[1]
      },
      {
        title: '订单状态',
        dataIndex: 'statusDesc',
        width: customWidth[2]
      },
      {
        title: '订单总价',
        dataIndex: 'payment',
        width: customWidth[3]
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        width: customWidth[4]
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: customWidth[5]
      }
    ],
    searchKeyWord: '',
    optionList: [{ key: 'orderNo', value: '按订单号查询' }]
  };
  componentDidMount() {
    this._isMounted = true;
    this.handleGetOrderList();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleGetOrderList = (isSearch = false, searchKeyWord) => {
    const { current } = this.state;
    const params = { pageNum: current };
    if (isSearch) {
      params.type = 'search';
      params.searchKeyWord = searchKeyWord;
    }
    getOrderList(params, res => {
      if (!this._isMounted) {
        return;
      }
      if (res.status === 0) {
        this.setState({ data: res.data.list, total: res.data.total });
      } else {
        if (typeof res.msg === 'string') {
          message.error(res.msg);
        } else {
          message.error('获取数据失败');
        }
        this.setState({ data: [], total: 0 });
      }
    });
  };
  onChange = pageNum => {
    this.setState({ current: pageNum }, () => {
      const { searchKeyWord } = this.state;
      if (searchKeyWord === '') {
        this.handleGetOrderList();
      } else {
        this.handleGetOrderList(true, searchKeyWord);
      }
    });
  };
  onSearch = (searchType, searchKeyWord) => {
    if (searchType === 'orderNo') {
      if (Object.is(Number(searchKeyWord), NaN)) {
        message.warning('请输入数字');
        return;
      }
      this.setState({ current: 1, searchKeyWord }, () => {
        if (searchKeyWord === '') {
          this.handleGetOrderList();
        } else {
          this.handleGetOrderList(true, searchKeyWord);
        }
      });
    }
  };
  render() {
    const { match } = this.props;
    const { columns, current, total, data, optionList } = this.state;
    const dataSource = data.map((item, index) => {
      const { orderNo, receiverName, statusDesc, payment, createTime } = item;
      return {
        key: index,
        orderNo: <Link to={`${match.url}/detail/${orderNo}`}>{orderNo}</Link>,
        receiverName,
        statusDesc,
        payment,
        createTime,
        operation: <Link to={`${match.url}/detail/${orderNo}`}>详情</Link>
      };
    });
    console.log('total', total);
    return (
      <div class="orderlist-page">
        <Search
          defaultSearchType="orderNo"
          optionList={optionList}
          onSearch={this.onSearch}
        />
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
