import { CALL_API } from 'middleware/api';
//
// Synchronous actions
//
export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE';

export const FETCH_CHATS_REQUEST = 'FETCH_CHATS_REQUEST';
export const FETCH_CHATS_SUCCESS = 'FETCH_CHATS_SUCCESS';
export const FETCH_CHATS_FAILURE = 'FETCH_CHATS_FAILURE';

//
// Asynchronous actions
//
let NEXT_KEY = 0;
export const sendMessage = (text, chatId = 1) => ({
  [CALL_API]: {
    endpoint: `/chats/${chatId}/messages`,
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
  creationDate: Date.now()/1000,
});

export const fetchMessages = (chatId = 1) => ({
  [CALL_API]: {
    endpoint: `/chats/${chatId}/messages`,
    actionTypes: [
      FETCH_MESSAGES_REQUEST,
      FETCH_MESSAGES_SUCCESS,
      FETCH_MESSAGES_FAILURE,
    ],
    method: 'GET',
  },
  chatId,
});

export const fetchChats = () => ({
  [CALL_API]: {
    endpoint: '/chats',
    actionTypes: [
      FETCH_CHATS_REQUEST,
      FETCH_CHATS_SUCCESS,
      FETCH_CHATS_FAILURE,
    ],
    method: 'GET',
  },
});
