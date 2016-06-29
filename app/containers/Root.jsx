import React, { Component } from 'react';
import { Provider } from 'react-redux';
import App from 'containers/App';
require('root.scss');

export default class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <App />
      </Provider>
    );
  }
}
