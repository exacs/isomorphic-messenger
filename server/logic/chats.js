/**
 * Business logic
 *
 * Functions to write and read messages from a chat
 */
import { getMessagesFromChat,
         createMessagesInChat } from '../data/postgres';

export default chatId => ({
  read() {
    return new Promise(accept => {
      getMessagesFromChat(chatId)
        .then(accept);
    });
  },

  write(message) {
    return new Promise(accept => {
      createMessagesInChat(chatId, message)
        .then(accept);
    });
  },
});
