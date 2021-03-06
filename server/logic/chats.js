/**
 * Business logic
 *
 * Functions to write and read messages from a chat
 */
import { getChats,
         getMessagesFromChat,
         createMessageInChat,
         getChatInfo } from '../data/postgres';

const chats = chatId => ({
  info() {
    return getChatInfo(chatId);
  },

  read() {
    return getMessagesFromChat(chatId);
  },

  write(message) {
    return createMessageInChat(chatId, message);
  },
});

chats.all = () => getChats();

export default chats;
