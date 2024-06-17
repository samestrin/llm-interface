/**
 * @file utils.js
 * @description Utility functions
 */
/**
 * Returns a message object with the provided message and an optional system message.
 *
 * @param {string} message - The user's message.
 * @param {string} [systemMessage="You are a helpful assistant."] - The system's message.
 * @returns {Object} The message object.
 */
returnMessageObject = function (
  message,
  systemMessage = "You are a helpful assistant."
) {
  return {
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: message,
      },
    ],
  };
};

returnSimpleMessageObject = function (message) {
  return {
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
  };
};

module.exports = { returnMessageObject, returnSimpleMessageObject };
