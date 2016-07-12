import { SEND_MESSAGE_REQUEST } from 'actions/index';

const INITIAL_STATE = {};

function addMessage(conversation, messageKey) {
  return ({
    messages: conversation && conversation.messages ?
              conversation.messages.concat(messageKey) :
              [messageKey],
  });
}

function conversationsReducer(conversations = INITIAL_STATE, action) {
  const newChat = addMessage(conversations[action.chatId], action.key);

  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return Object.assign({}, conversations, { [action.chatId]: newChat });
    default:
      return conversations;
  }
}

export default conversationsReducer;
