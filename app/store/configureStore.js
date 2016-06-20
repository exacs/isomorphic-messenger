import { createStore } from 'redux';
import reducer from 'reducers/index';

export default (preloadedState) => (
  createStore(reducer, preloadedState)
);
