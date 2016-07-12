import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import messages from './messages';
import conversations from './conversations';

const rootReducer = combineReducers({
  messages,
  conversations,
  routing: routerReducer,
});

export default rootReducer;

