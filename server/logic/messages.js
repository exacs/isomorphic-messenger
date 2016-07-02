/**
 * Business logic.
 *
 * Functions to write and read Messages.
 */

// Simulation of a storage. Currently in memory
const storedMessages = [];

/**
 * Return the list of all stored messages.
 * @return (Promise<array>) - an array of messages.
 */
export const read = () => new Promise((accept /* , reject */) => {
  // Simulate some latency...
  setTimeout(() => {
    accept(storedMessages);
  }, 1000);
});

/**
 * Store a message.
 * @param (string) message.
 * @return (Promise<>) - accepted
 */
export const write = (message) => new Promise((accept /* , reject */) => {
  // Simulate some latency...
  setTimeout(() => {
    storedMessages.push(message);
    accept();
  }, 1000);
});
