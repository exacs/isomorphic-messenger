import { createStore, applyMiddleware } from 'redux';
import api from 'middleware/api';
import reducer from 'reducers/index';

const enhancer = applyMiddleware(api);
export default (preloadedState) => (
  createStore(reducer, preloadedState, enhancer)
);
