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

