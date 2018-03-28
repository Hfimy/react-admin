import React from 'react';
import { Button, message, Modal } from 'antd';
import Immutable from 'immutable';
import Table from 'component/Table';
import { getDetailByOrderNo, sendGoods } from 'api/order';
import 'public/style/order/order-detail.less';

const customWidth = ['20%', '35%', '15%', '15%', '15%'];
export default class OrderDetail extends React.Component {
  state = {
    detail: {},
    columns: [
      { title: '商品图片', dataIndex: 'productImage', width: customWidth[0] },
      { title: '商品信息', dataIndex: 'productName', width: customWidth[1] },
      { title: '单价', dataIndex: 'currentUnitPrice', width: customWidth[2] },
      { title: '数量', dataIndex: 'quantity', width: customWidth[3] },
      { title: '合计', dataIndex: 'totalPrice', width: customWidth[4] }
    ]
  };
  componentWillMount() {
    this._isMounted = true;
    this.handleGetOrderDetail();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  handleGetOrderDetail = () => {
    const orderNo = this.props.match.params.orderNumber;
    getDetailByOrderNo(orderNo, res => {
      if (res.status === 0) {
        this.setState({ detail: res.data });
      } else {
        if (typeof res.msg === 'string') {
          message.error(res.msg);
        } else {
          message.error('获取数据失败');
        }
      }
    });
  };
  goBack = () => {
    this.props.history.push('/order/manage');
  };
  onSendGoods = () => {
    Modal.confirm({
      title: '确认发货吗？',
      okText: '确认',
      okType: 'danget',
      cancelText: '取消',
      onOk: () => {
        sendGoods(this.props.match.params.orderNumber, res => {
          if (res.status === 0) {
            message.success('发货成功');
            this.handleGetOrderDetail();
          } else {
            if (typeof res.msg === 'string') {
              message.error(res.msg);
            } else {
              message.error('发货失败');
            }
          }
        });
      },
      onCancel() {}
    });
  };
  render() {
    const {
      orderNo,
      createTime,
      shippingVo,
      status,
      statusDesc,
      paymentTypeDesc,
      payment,
      imageHost,
      orderItemVoList
    } = this.state.detail;
    let {
      receiverName,
      receiverPhone,
      receiverMobile,
      receiverProvince,
      receiverCity,
      receiverDistrict,
      receiverAddress
    } =
      shippingVo || {};
    const { columns } = this.state;
    const dataSource =
      orderItemVoList &&
      orderItemVoList.map((item, index) => {
        const {
          productImage,
          productName,
          currentUnitPrice,
          quantity,
          totalPrice
        } = item;
        return {
          key: index,
          productImage: productImage ? (
            <div class="img-box">
              <img src={imageHost + productImage} alt={productName} />
            </div>
          ) : (
            <div class="img-box" />
          ),
          productName,
          currentUnitPrice,
          quantity,
          totalPrice
        };
      });
    if (!receiverName) {
      receiverName = '';
    }
    if (!receiverPhone) {
      receiverPhone = '';
    }
    if (!receiverMobile) {
      receiverMobile = '';
    }
    if (!receiverProvince) {
      receiverProvince = '';
    }
    if (!receiverCity) {
      receiverCity = '';
    }
    if (!receiverDistrict) {
      receiverDistrict = '';
    }
    if (!receiverAddress) {
      receiverAddress = '';
    }
    return (
      <div class="orderdetail-page">
        <div class="title">
          <h3>订单详情</h3>
          <Button type="primary" ghost onClick={this.goBack}>
            返回上一页
          </Button>
        </div>
        <div class="content">
          <div class="form-group">
            <label>订单编号：</label>
            <p>{orderNo}</p>
          </div>
          <div class="form-group">
            <label>创建时间：</label>
            <p>{createTime}</p>
          </div>
          <div class="form-group">
            <label>收件人：</label>
            <p>{`${receiverName}  ${receiverPhone}  ${receiverMobile}`}</p>
          </div>
          <div class="form-group">
            <label>收货地址：</label>
            <p>
              {`${receiverProvince}  ${receiverCity}  ${receiverDistrict}  ${receiverAddress}`}
            </p>
          </div>
          <div class="form-group">
            <label>订单状态：</label>
            <p>
              {statusDesc}
              {status === 20 ? (
                <Button
                  size="small"
                  ghost
                  type="primary"
                  class="btn-send-goods"
                  onClick={this.onSendGoods}
                >
                  立即发货
                </Button>
              ) : null}
            </p>
          </div>
          <div class="form-group">
            <label>支付方式：</label>
            <p>{paymentTypeDesc}</p>
          </div>
          <div class="form-group">
            <label>订单金额：</label>
            <p>{payment} ¥</p>
          </div>
          <Table
            columns={columns}
            dataSource={Immutable.fromJS(dataSource || [])}
          />
        </div>
      </div>
    );
  }
}
