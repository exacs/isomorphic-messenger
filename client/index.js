import React from 'react';
import { render } from 'react-dom';

import styles from 'root.scss';
import Root from 'containers/Root';
import createStore from 'store/configureStore';
import { addMessage } from 'actions/index';

const store = createStore(window.__INITIAL_STATE__);

render(
  <Root store={store} />, document.getElementById('root')
);

store.dispatch(addMessage('4 from client'));
