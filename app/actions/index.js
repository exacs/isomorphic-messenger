import { CALL_API } from 'middleware/api';
//
// Synchronous actions
//
export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

export const sendMessageRequest = text => ({
  action: SEND_MESSAGE_REQUEST,
  text,
});

export const sendMessageSuccess = id => ({
  action: SEND_MESSAGE_SUCCESS,
  id,
});

export const sendMessageFailure = id => ({
  action: SEND_MESSAGE_FAILURE,
  id,
});

//
// Asynchronous actions
//
let NEXT_CLIENT_ID = 0;
export const sendMessage = text => ({
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

  key: `key-${NEXT_CLIENT_ID++}`,
  id: 1,
  text,
});
