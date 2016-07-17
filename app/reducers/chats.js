import { SEND_MESSAGE_REQUEST,
         FETCH_MESSAGES_SUCCESS } from 'actions/index';

const INITIAL_STATE = {};

function addMessage(chat, messageKey) {
  return ({
    messages: chat && chat.messages ?
              chat.messages.concat(messageKey) :
              [messageKey],
    title: (chat && chat.title) || '',
  });
}

function chatsReducer(chats = INITIAL_STATE, action) {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return Object.assign({}, chats, {
        [action.chatId]: addMessage(chats[action.chatId], action.key),
      });
    case FETCH_MESSAGES_SUCCESS:
      return Object.assign({}, chats, {
        [action.chatId]: action.response.reduce(
          (acc, message) => addMessage(acc, message.id),
          chats[action.chatId]
        ),
      });
    default:
      return chats;
  }
}

export default chatsReducer;
