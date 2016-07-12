import { combineReducers } from 'redux';

import messagesReducer from './messages';
import conversationsReducer from './conversations';

const rootReducer = combineReducers({
  messagesReducer,
  conversationsReducer,
});

export default rootReducer;
