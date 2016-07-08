import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import DevTools from 'containers/DevTools';

import api from 'middleware/api';
import reducer from 'reducers/index';

const getDebugSessionKey = () => {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
};

const enhancer = compose(
  applyMiddleware(api),
  DevTools.instrument(),
  persistState(getDebugSessionKey())
);

export default (preloadedState) => (
  createStore(reducer, preloadedState, enhancer)
);
