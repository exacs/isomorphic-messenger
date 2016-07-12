import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import 'root.scss';
import Root from 'containers/Root';
import createStore from 'store/configureStore';

const store = createStore(window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root store={store} history={history} />, document.getElementById('root')
);
