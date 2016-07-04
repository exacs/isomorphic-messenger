import React from 'react';
import { render } from 'react-dom';

import 'root.scss';
import Root from 'containers/Root';
import createStore from 'store/configureStore';

const store = createStore(window.__INITIAL_STATE__);

render(
  <Root store={store} />, document.getElementById('root')
);

