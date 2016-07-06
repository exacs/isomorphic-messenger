/**
 * Business logic.
 *
 * Functions to write and read Messages.
 */
import { getMessages, createMessage } from '../data/postgres';

/**
 * Return the list of all stored messages.
 * @return (Promise<array>) - an array of messages.
 */
export const read = () => new Promise((accept /* , reject */) => {
  getMessages().then(accept);
});

/**
 * Store a message.
 * @param (string) message.
 * @return (Promise<>) - accepted
 */
export const write = (message) => new Promise((accept /* , reject */) => {
  createMessage(message).then(accept);
});
