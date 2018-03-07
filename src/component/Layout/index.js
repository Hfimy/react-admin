import React from 'react';
import TopNav from '../TopNav';
import SideNav from '../SideNav';

//整体布局样式
// import './style.css';

export default class Layout extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <TopNav />
        <SideNav />
        {this.props.children}
      </div>
    );
  }
}
