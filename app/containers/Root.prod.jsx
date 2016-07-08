import React from 'react';
import { Provider } from 'react-redux';
import App from 'containers/App';

export default ({ store }) => (
  <Provider store={store}>
    <div className="root">
      <App />
    </div>
  </Provider>
);
