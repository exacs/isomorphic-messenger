import { SEND_MESSAGE_REQUEST } from 'actions/index';

const INITIAL_STATE = {};

function addMessage(chat, messageKey) {
  return ({
    messages: chat && chat.messages ?
              chat.messages.concat(messageKey) :
              [messageKey],
  });
}

function chatsReducer(chats = INITIAL_STATE, action) {
  const newChat = addMessage(chats[action.chatId], action.key);

  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return Object.assign({}, chats, { [action.chatId]: newChat });
    default:
      return chats;
  }
}

export default chatsReducer;
