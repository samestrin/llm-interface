/**
 * @file src/utils/utils.js
 * @description Utility functions
 */

/**
 * Returns a message object with the provided message and an optional system message.
 *
 * @param {string} message - The user's message.
 * @param {string} [systemMessage="You are a helpful assistant."] - The system's message.
 * @returns {Object} The message object.
 */
function getMessageObject(
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
function getSimpleMessageObject(message) {
  return {
    messages: [
      {
        role: 'user',
        content: message,
      },
    ],
  };
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
  const subString = '```';
  const regex = new RegExp(subString, 'ig'); // Added 'g' flag for global replacement

  if (typeof json === 'string' && attemptRepair && regex.test(json)) {
    json = json.replace(/```javascript/gi, ''); // Replace all occurrences of '```javascript'
    json = json.replace(/```/gi, ''); // Replace all occurrences of '```'
    json = json.trim();
  }

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

/**
 * Returns a promise that resolves after a specified delay in milliseconds.
 *
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise<void>} A promise that resolves after the delay.
 */
async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  getMessageObject,
  getSimpleMessageObject,
  parseJSON,
  delay,
};
