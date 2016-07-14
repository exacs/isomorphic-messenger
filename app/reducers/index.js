import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import messages from './messages';
import chats from './chats';

const rootReducer = combineReducers({
  messages,
  chats,
  routing: routerReducer,
});

export default rootReducer;

