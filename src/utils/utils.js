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
let jsonrepairInstance = null;

/**
 * Loads the jsonrepair dynamically and stores it in the singleton if not already loaded.
 *
 * @returns {Promise<object>} A promise that resolves to the jsonrepair instance.
 */
async function getJsonRepairInstance() {
  if (!jsonrepairInstance) {
    const { jsonrepair } = await import('jsonrepair');
    jsonrepairInstance = jsonrepair;
  }
  return jsonrepairInstance;
}

/**
 * Attempts to parse a JSON string. If parsing fails and attemptRepair is true,
 * it uses jsonrepair to try repairing the JSON string.
 *
 * @param {string} json - The JSON string to parse.
 * @param {boolean} attemptRepair - Whether to attempt repairing the JSON string if parsing fails.
 * @returns {Promise<object|null>} - The parsed or repaired JSON object, or null if parsing and repair both fail.
 */
async function parseJSON(json, attemptRepair) {
  try {
    const parsed = JSON.parse(json);
    return parsed;
  } catch (e) {
    if (attemptRepair) {
      try {
        const jsonrepair = await getJsonRepairInstance();
        const repaired = jsonrepair(json);
        const reparsed = JSON.parse(repaired);
        return reparsed;
      } catch (importError) {
        return null;
      }
    } else {
      return null;
    }
  }
}

module.exports = {
  returnMessageObject,
  returnSimpleMessageObject,
  returnModelByAlias,
  parseJSON,
};
