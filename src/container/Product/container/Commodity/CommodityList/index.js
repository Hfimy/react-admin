import React from 'react';
import { Link } from 'react-router-dom';
import Immutable from 'immutable';
import { message, Pagination, Button, Modal, Icon, Row, Col } from 'antd';
import Table from 'component/Table';
import Search from 'container/Product/component/Search';
import { getProductList, updateProductStatus } from 'api';

import 'public/style/product/commodity-list.less';

const customWidth = ['10%', '42%', '15%', '18%', '15%'];
export default class Commodity extends React.Component {
  state = {
    current: 1, // pageSize:10,//默认为10
    total: 0,
    data: [],
    searchType: '',
    searchKeyWord: '',
    columns: [
      {
        title: 'ID',
        dataIndex: 'id',
        width: customWidth[0]
      },
      {
        title: '商品名称',
        dataIndex: 'name',
        width: customWidth[1]
      },
      {
        title: '价格 (¥)',
        dataIndex: 'price',
        width: customWidth[2]
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: customWidth[3]
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: customWidth[4]
      }
    ]
  };

  //将请求商品列表与搜索商品合并，共用代码
  handleGetProductList = (isSearch = false, searchType, searchKeyWord) => {
    const { current } = this.state;
    const params = { pageNum: current };
    if (isSearch) {
      params.type = 'search';
      params.searchType = searchType;
      params.searchKeyWord = searchKeyWord;
    }
    getProductList(params, res => {
      if (!this._isMounted) {
        return;
      }
      if (res.status === 0) {
        message.success('获取数据成功');
        this.setState({
          data: res.data.list,
          total: res.data.total
        });
      } else {
        if (typeof res.msg === 'string') {
          message.error(res.msg);
        } else {
          message.error('获取数据失败');
        }
        this.setState({ data: [] });
      }
    });
  };

  componentDidMount() {
    this._isMounted = true;
    this.handleGetProductList();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  onChange = pageNum => {
    this.setState({ current: pageNum }, this.handleGetProductList);
  };
  handleAction = (id, status) => {
    const data = {
      productId: id,
      status
    };
    updateProductStatus(data, res => {
      if (res.status === 0) {
        message.success(res.data);
        const { searchKeyWord, searchType } = this.state;
        if (searchKeyWord === '') {
          this.handleGetProductList();
        } else {
          this.handleGetProductList(true, searchType, searchKeyWord);
        }
      } else {
        message.error(res.data);
      }
    });
  };
  handleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 2 : 1;
    const confirmTip =
      newStatus === 1 ? '确认上架该商品吗？' : '确认下架该商品吗？';
    Modal.confirm({
      title: confirmTip,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.handleAction(id, newStatus);
            resolve();
          }, 1000);
        });
      },
      onCancel() {}
    });
  };
  onSearch = (searchType, searchKeyWord) => {
    this.setState({ current: 1, searchType, searchKeyWord }, () => {
      if (searchKeyWord === '') {
        this.handleGetProductList();
      } else {
        this.handleGetProductList(true, searchType, searchKeyWord);
      }
    });
  };
  render() {
    const { columns, current, total, data } = this.state;
    const dataSource = data.map((item, index) => {
      const { id, name, price, status, subtitle } = item;
      return {
        key: index,
        id,
        name: (
          <div class="product-name">
            <span
              class="title"
              key="productName"
              title={`${name} （${subtitle}）`}
            >
              {name}
            </span>
            <span class="subtitle" key="productSubTitle">
              （{subtitle}）
            </span>
          </div>
        ),
        price,
        status: (
          <div class="product-status">
            <span key="productStatus">{status === 1 ? '在售' : '已下架'}</span>
            <Button
              key="action"
              ghost
              type="danger"
              size="small"
              onClick={() => {
                this.handleStatus(id, status);
              }}
            >
              {status === 1 ? '下架' : '上架'}
            </Button>
          </div>
        ),
        operation: (
          <div class="product-operation">
            <Link key="detail" to={`${this.props.match.url}/detail/${id}`}>
              详情
            </Link>
            <Link key="edit" to={`${this.props.match.url}/add/${id}`}>
              编辑
            </Link>
          </div>
        )
      };
    });
    const { match } = this.props;
    return (
      <div class="productlist-page">
        <div class="header">
          <Search onSearch={this.onSearch} />
          <div class="product-add">
            <Link to={`${this.props.match.url}/add`}>
              <Button type="primary">
                <Icon type="plus" />添加商品
              </Button>
            </Link>
          </div>
        </div>

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
