import React from 'react';
import { render } from 'react-dom';

import 'root.scss';
import Root from 'containers/Root';
import createStore from 'store/configureStore';
import { SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS } from 'actions/index';

const store = createStore(window.__INITIAL_STATE__);

render(
  <Root store={store} />, document.getElementById('root')
);

// Try to send a message and then, change the status of the same one
const key = Symbol();
store.dispatch({
  type: SEND_MESSAGE_REQUEST,
  text: '4 from client',
  key,
});

store.dispatch({
  type: SEND_MESSAGE_SUCCESS,
  id: 0,
  text: '4 from client',
  key,
});

