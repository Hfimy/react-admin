import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
export default class ErrorBoundary extends React.Component {
  static propTypes = {
    redirectTo: PropTypes.string
  };
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(err, info) {
    this.setState({ hasError: true });
    //sendErrorReport(err,info)
  }
  render() {
    if (this.state.hasError) {
      const redirectTo = this.props.redirectTo || '/error/404';
      return <Redirect to={`${redirectTo}`} />;
    }
    return this.props.children;
  }
}
