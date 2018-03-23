import React from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, Modal, message } from 'antd';
import { uploadImage } from 'api/product';
import './style.less';

export default class UploadImage extends React.Component {
  static propTypes = {
    value: PropTypes.array,
    onChange: PropTypes.func
  };
  constructor(props) {
    super(props);
    const { value } = this.props;
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: value.slice(0, 3)
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ fileList: nextProps.value.slice(0, 3) });
    }
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  onCancel = () => this.setState({ previewVisible: false });
  onPreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };
  beforeUpload = file => {
    if (!/jpe?g|png$/.test(file.type)) {
      message.error('不支持的图片格式');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小超过限制(2M)');
      return false;
    }
    return true;
  };
  onUploadImage = obj => {
    const form = new FormData();
    form.append('upload_file', obj.file);

    const file = obj.file;
    const { fileList } = this.state;

    file.status = 'uploading';
    fileList.push(file);
    this.setState({ fileList });

    uploadImage(obj.action, form, res => {
      if (!this._isMounted) {
        return;
      }
      if (res.status === 0) {
        file.status = 'done';
        file.url = res.data.url;
        file.uri = res.data.uri;
      } else {
        file.status = 'error';
        if (typeof res.msg === 'string') {
          message.error(res.msg);
        } else {
          message.error('未知上传图片错误');
        }
      }
      this.setState({ fileList }, () => {
        if (!this._isMounted) {
          return;
        }
        const newFileList = fileList.filter(item => {
          if (item.status === 'error') {
            return false;
          }
          return true;
        });
        this.setState({ fileList: newFileList }, () => {
          this.triggerChange(this.state.fileList);
        });
      });
    });
  };
  onChange = ({ file, fileList }) => {
    if (file.status === 'removed') {
      //此处应对服务器请求删除该文件
      this.setState({ fileList }, () => {
        this.triggerChange(this.state.fileList);
      });
    }
  };
  triggerChange = value => {
    console.log('here', value);
    this.props.onChange(value);
  };
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div class="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          action="/manage/product/upload.do"
          listType="picture-card"
          fileList={fileList}
          multiple={true}
          beforeUpload={this.beforeUpload}
          customRequest={this.onUploadImage}
          onPreview={this.onPreview}
          onChange={this.onChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal
          class="product-upload-modal"
          visible={previewVisible}
          footer={null}
          onCancel={this.onCancel}
        >
          <div class="upload-preview-img">
            {previewImage ? (
              <img src={previewImage} />
            ) : (
              <span>正在加载图片...</span>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}
