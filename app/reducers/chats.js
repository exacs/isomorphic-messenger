import { SEND_MESSAGE_REQUEST,
         FETCH_MESSAGES_SUCCESS,
         FETCH_CHATS_SUCCESS } from 'actions/index';

const INITIAL_STATE = {};

function addMessage(chat, messageKey, chatId) {
  return ({
    messages: chat && chat.messages ?
              chat.messages.concat(messageKey) :
              [messageKey],
    title: (chat && chat.title) || '',
    id: (chat && chat.id) || chatId,
  });
}

function chatsArrayToObject(chats, options) {
  const newObject = {};
  chats.forEach(({ id, title }) => {
    newObject[id] = Object.assign({}, { id, title }, options);
  });
  return newObject;
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
          (acc, message) => addMessage(acc, message.id, action.chatId),
          chats[action.chatId]
        ),
      });
    case FETCH_CHATS_SUCCESS:
      return Object.assign({}, chats, chatsArrayToObject(action.response));
    default:
      return chats;
  }
}

export default chatsReducer;
