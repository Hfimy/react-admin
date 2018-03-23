import React from 'react';
import { Button, Form, Input, Icon, message } from 'antd';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Selector from 'container/Product/component/Selector';
import UploadImage from 'container/Product/component/UploadImage';
import RichEditor from 'container/Product/component/RichEditor';
import { addOrUpdateProduct, getProductDetail } from 'api/product';
import 'public/style/product/commodity-add.less';

const FormItem = Form.Item;

class CommodityAdd extends React.Component {
  constructor(props) {
    super(props);
    const { id } = this.props.match.params;
    this.state = {
      id,
      status: 1,
      name: '',
      subtitle: '',
      price: '',
      stock: '',
      subImages: '',
      imageHost: '',
      detail: '',
      categoryId: 0,
      firstCategoryId: 0,
      secodeCategoryId: 0,
      currentCategoryId: 0
    };
  }
  componentWillMount() {
    this._isMounted = true;
    const { id } = this.state;
    if (id === undefined) {
      return;
    }
    getProductDetail(id, res => {
      if (res.status === 0) {
        const {
          status,
          name,
          subtitle,
          price,
          stock,
          subImages,
          imageHost,
          detail
        } = res.data;
        this.setState({
          status,
          name,
          subtitle,
          price,
          stock,
          subImages,
          imageHost,
          detail
        });
      } else {
        if (typeof res.msg === 'string') {
          message.error(res.msg);
        } else {
          message.error('服务器错误');
        }
      }
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  goBack = () => {
    this.props.history.push('/product/commodity');
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      //编码规则，错误优先
      if (err) return;
      const status = this.state.status;
      const { name, subtitle = '', price, stock } = value;
      let { categoryId, subImages, detail } = value;
      // categoryId = 0;
      detail = this.handleDraftToHtml(detail);
      subImages = this.handleSubImagesToString(subImages);
      this.setState(
        { name, subtitle, price, stock, subImages, detail },
        this.handleAddOrUpdate
      );
    });
  };
  handleAddOrUpdate = () => {
    const { id, ...data } = this.state;
    addOrUpdateProduct(id, data, res => {
      if (!this._isMounted) {
        return;
      }
      if (res.status === 0) {
        message.success(res.data);
        // const url = this.props.match.url.replace('/add', '');
        // this.props.history.push(url);
        this.goBack();
      } else {
        if (res.data && typeof res.data === 'string') {
          message.error(res.data);
        } else {
          message.error('服务器错误');
        }
      }
    });
  };
  handleSubImagesToArray = subImages => {
    let imageList;
    if (!subImages || subImages.trim() === '') {
      imageList = [];
    } else {
      const { imageHost } = this.state;
      imageList = subImages.split(',');
      imageList = imageList.map((item, index) => ({
        status: 'done',
        url: imageHost + item,
        uid: index,
        uri: item
      }));
    }
    return imageList;
  };
  handleSubImagesToString = subImages => {
    const imageList = subImages.map(item => item.uri.trim());
    return imageList.join(',');
  };
  handleDraftToHtml = detail => {
    const editorState = detail;
    if (editorState === undefined) {
      return '';
    }
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };
  handleHtmlToDraft = detail => {
    // if (detail === '') {
    //   return EditorState.createEmpty();
    // }
    // const blocksFromHtml = htmlToDraft(detail);
    // const { contentBlocks, entityMap } = blocksFromHtml;
    // const contentState = ContentState.createFromBlockArray(
    //   contentBlocks,
    //   entityMap
    // );
    // const editorState = EditorState.createWithContent(contentState);
    let editorState = EditorState.createEmpty();
    const contentBlock = htmlToDraft(detail);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      editorState = EditorState.createWithContent(contentState);
    }
    return editorState;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        // xs: { span: 24 },
        // sm: { span: 8 },
        // md:{span:8},
        // lg:{span:8},
        span: 4
      },
      wrapperCol: {
        // xs: { span: 24 },
        // sm: { span: 16 },
        span: 20
      }
    };
    const {
      id,
      name,
      subtitle,
      price,
      stock,
      subImages,
      detail,
      firstCategoryId,
      secondCategoryId,
      currentCategoryId
    } = this.state;
    return (
      <div class="productadd-page">
        <div class="title">
          <h3>{id === undefined ? '商品添加页' : '商品编辑页'}</h3>
          <Button type="primary" ghost onClick={this.goBack}>
            返回上一页
          </Button>
        </div>
        <div class="form-container">
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              wrapperCol={{ span: 14 }}
              label="商品名称"
            >
              {getFieldDecorator('name', {
                initialValue: name,
                rules: [{ required: true, message: '请输入商品名称' }]
              })(<Input placeholder="请输入商品名称" />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              wrapperCol={{ span: 14 }}
              label="商品描述"
            >
              {getFieldDecorator('subtitle', {
                initialValue: subtitle
                // rules: [{ required: true, message: '请输入商品描述' }]
              })(<Input placeholder="请输入商品描述" />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              wrapperCol={{ span: 14 }}
              label="商品分类"
            >
              {getFieldDecorator('categoryId', {
                initialValue: {
                  firstCategoryId,
                  secondCategoryId,
                  currentCategoryId
                },
                rules: [{ required: true }]
                // rules: [{ validator:this.customCheckCategoryId }]
              })(<Selector />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              wrapperCol={{ span: 5 }}
              label="商品价格"
            >
              {getFieldDecorator('price', {
                initialValue: price,
                rules: [{ required: true, message: '请输入商品价格' }]
              })(<Input type="number" addonAfter="元" placeholder="价格" />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              wrapperCol={{ span: 5 }}
              label="商品库存"
            >
              {getFieldDecorator('stock', {
                initialValue: stock,
                rules: [{ required: true, message: '请输入商品库存' }]
              })(<Input type="number" addonAfter="件" placeholder="库存" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="商品图片">
              {getFieldDecorator('subImages', {
                initialValue: this.handleSubImagesToArray(subImages)
                // rules:[{validator:this.customCheckUploadImage}]
              })(<UploadImage />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              wrapperCol={{ span: 16 }}
              label="商品详情"
            >
              {getFieldDecorator('detail', {
                initialValue: this.handleHtmlToDraft(detail)
              })(<RichEditor />)}
            </FormItem>
            <FormItem wrapperCol={{ offset: 4 }}>
              <Button type="primary" htmlType="submit">
                {id === undefined ? '添加' : '更新'}
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

export default Form.create()(CommodityAdd);
