import { ADD_MESSAGE } from 'actions/index';

const INITIAL_STATE = [];
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return state.concat(action.text);
    default:
      return state;
  }
};
