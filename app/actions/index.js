import { CALL_API } from 'middleware/api';
//
// Synchronous actions
//
export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

//
// Asynchronous actions
//
let NEXT_KEY = 0;
export const sendMessage = (text, chatId = 1) => ({
  [CALL_API]: {
    endpoint: '/messages',
    actionTypes: [
      SEND_MESSAGE_REQUEST,
      SEND_MESSAGE_SUCCESS,
      SEND_MESSAGE_FAILURE,
    ],
    method: 'POST',
    data: { text },
  },

  key: `client-${NEXT_KEY++}`,
  id: NEXT_KEY,
  chatId,
  text,
});
