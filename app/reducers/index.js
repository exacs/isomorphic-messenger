import { combineReducers } from 'redux';

import messages from './messages';
import conversations from './conversations';

const rootReducer = combineReducers({
  messages,
  conversations,
});

export default rootReducer;
