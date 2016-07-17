import { SEND_MESSAGE_REQUEST,
         SEND_MESSAGE_SUCCESS,
         SEND_MESSAGE_FAILURE,
         FETCH_MESSAGES_SUCCESS } from 'actions/index';

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
let NEXT_ID = 0;

const messagesArrayToObject = (messages, options) => {
  const newObject = {};
  messages.forEach(({ text, id }) => {
    newObject[id] = Object.assign({}, { text, id }, options);
  });
  return newObject;
};

const messagesReducer = (messages = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      NEXT_ID++;
      return Object.assign({}, messages, {
        [action.key]: {
          id: NEXT_ID,
          text: action.text,
          status: SENDING,
        },
      });
    case SEND_MESSAGE_SUCCESS:
      return Object.assign({}, messages, messages[action.key] && {
        [action.key]: {
          id: messages[action.key].id,
          text: messages[action.key].text,
          status: SUCCESS,
        },
      });
    case SEND_MESSAGE_FAILURE:
      return Object.assign({}, messages, messages[action.key] && {
        [action.key]: {
          id: messages[action.key].id,
          text: messages[action.key].text,
          status: FAILURE,
        },
      });

    case FETCH_MESSAGES_SUCCESS:
      return Object.assign(
        {},
        messages,
        messagesArrayToObject(action.response, { status: SUCCESS })
      );
    default:
      return messages;
  }
};

export default messagesReducer;
