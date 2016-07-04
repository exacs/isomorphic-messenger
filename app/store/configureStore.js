import { createStore, applyMiddleware } from 'redux';
import api from 'middleware/api';
import reducer from 'reducers/index';

export default (preloadedState) => (
  createStore(reducer, preloadedState, applyMiddleware(api))
);
