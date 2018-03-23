import React from 'react';
import PropTypes from 'prop-types';
import { message } from 'antd';
// import { convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import { uploadRichImage } from 'api/product';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.less';

export default class RichEditor extends React.Component {
  static propTypes = {
    // value: PropTypes.shape({
    //   editorState: PropTypes.object
    // }),
    value: PropTypes.object,
    onChange: PropTypes.func
  };
  constructor(props) {
    super(props);
    const editorState = this.props.value;
    this.state = { editorState };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ editorState: nextProps.value });
    }
  }
  uploadImage = file => {
    return new Promise((resolve, reject) => {
      uploadRichImage(file, res => {
        if (res.success) {
          resolve({ data: { link: res.file_path } });
        } else {
          if (typeof res.msg === 'string') {
            message.error(res.msg);
          } else {
            message.error('服务器错误');
          }
          reject(res);
        }
      });
    });
  };
  onEditorStateChange = editorState => {
    this.setState({ editorState }, () => {
      this.triggerChange(this.state.editorState);
    });
  };
  triggerChange = value => {
    this.props.onChange(value);
  };
  render() {
    const { editorState } = this.state;
    return (
      <div class="editor-container">
        <Editor
          editorState={editorState}
          wrapperClassName="editor-wrapper"
          editorClassName="editor"
          toolbar={{
            image: {
              uploadCallback: this.uploadImage,
              previewImage: true,
              alt: {
                present: true,
                mandatory: false //此属性影响图片添加至内容区？
              }
            }
          }}
          onEditorStateChange={this.onEditorStateChange}
        />
        {/* <textarea
          disabled
          class="editor-content"
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        /> */}
      </div>
    );
  }
}
