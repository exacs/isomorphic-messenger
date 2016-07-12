import { combineReducers } from 'redux';

import messages from 'reducers/messages';
import { routerReducer } from 'react-router-redux';

export default combineReducers({ messages, routing: routerReducer });
