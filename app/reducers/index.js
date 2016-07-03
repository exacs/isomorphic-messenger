import {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
} from 'actions/index';

// The state is an array of Messages. Each Message is an object with two fields:
// - A text (string) representing the text of the  message
// - A status: can have three possible values
//   - SENDING
//   - SUCCESS
//   - FAILURE

export const SENDING = 'SEND_REQUEST';
export const SUCCESS = 'SEND_SUCCESS';
export const FAILURE = 'SEND_FAILURE';

const INITIAL_STATE = {};

export default (messages = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return Object.assign({}, messages, {
        [action.key]: {
          id: -1,
          text: action.text,
          status: SENDING,
        },
      });
    case SEND_MESSAGE_SUCCESS:
      return Object.assign({}, messages, {
        [action.key]: {
          id: action.id,
          text: action.text,
          status: SUCCESS,
        },
      });
    case SEND_MESSAGE_FAILURE:
      return Object.assign({}, messages, {
        [action.key]: {
          id: -1,
          text: action.text,
          status: FAILURE,
        },
      });
    default:
      return messages;
  }
};
