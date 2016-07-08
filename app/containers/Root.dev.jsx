import React from 'react';
import { Provider } from 'react-redux';
import App from 'containers/App';
import DevTools from 'containers/DevTools';

export default ({store}) => (
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>
);
