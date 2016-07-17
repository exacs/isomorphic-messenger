/**
 * Business logic
 *
 * Functions to write and read messages from a chat
 */
import { getMessagesFromChat,
         createMessagesInChat,
         getChatInfo } from '../data/postgres';

export default chatId => ({
  info() {
    return getChatInfo(chatId);
  },
  read() {
    return getMessagesFromChat(chatId);
  },

  write(message) {
    return createMessagesInChat(chatId, message);
  },
});
