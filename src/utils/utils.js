/**
 * @file src/utils/utils.js
 * @description Utility functions
 */

const config = require('../config/llmProviders.json');

/**
 * Returns a message object with the provided message and an optional system message.
 *
 * @param {string} message - The user's message.
 * @param {string} [systemMessage="You are a helpful assistant."] - The system's message.
 * @returns {Object} The message object.
 */
function returnMessageObject(
  message,
  systemMessage = 'You are a helpful assistant.',
) {
  return {
    messages: [
      {
        role: 'system',
        content: systemMessage,
      },
      {
        role: 'user',
        content: message,
      },
    ],
  };
}

/**
 * Returns a simple message object with the provided message.
 *
 * @param {string} message - The user's message.
 * @returns {Object} The message object.
 */
function returnSimpleMessageObject(message) {
  return {
    messages: [
      {
        role: 'user',
        content: message,
      },
    ],
  };
}

/**
 * Returns the model name based on the provided alias.
 *
 * @param {string} provider - The name of the provider.
 * @param {string} model - The alias or name of the model.
 * @returns {string} The model name.
 */
function returnModelByAlias(provider, model) {
  if (
    config[provider] &&
    config[provider].model &&
    config[provider].model[model] &&
    config[provider].model[model].name
  ) {
    return config[provider].model[model].name;
  }

  return model;
}

module.exports = {
  returnMessageObject,
  returnSimpleMessageObject,
  returnModelByAlias,
};
