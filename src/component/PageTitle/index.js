import React from 'react';
import PropTypes from 'prop-types';
import './style.less';

export default class PageTitle extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };
  render() {
    return (
      <div class="page-title">
        <h3>{this.props.title}</h3>
      </div>
    );
  }
}
