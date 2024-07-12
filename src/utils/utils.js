/**
 * @file src/utils/utils.js
 * @description Utility functions
 */

const { getInterfaceConfigValue } = require('./config.js');
const crypto = require('crypto');
const GREEN = '\u001b[32m';
const BLUE = '\u001b[34m';
const YELLOW = '\x1b[33m';
const RESET = '\u001b[0m';

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
 * Extracts JavaScript code from a JSON string if it exists within ```javascript code block.
 * If no such block is found, optionally attempts to clean up the JSON string by removing
 * all occurrences of ```javascript and ``` markers.
 *
 * @param {string} json - The JSON string that may contain JavaScript code.
 * @param {boolean} attemptRepair - Whether to attempt repairing the JSON string.
 * @returns {string} - The extracted JavaScript code or the cleaned JSON string.
 */
function extractCodeFromResponse(json, attemptRepair) {
  // Define regex to match ```javascript block and capture the code inside
  const codeBlockRegex = /```javascript\s*([\s\S]*?)\s*```/i;

  if (typeof json === 'string' && attemptRepair) {
    // Attempt to match the regex
    const match = codeBlockRegex.exec(json);

    if (match && match[1]) {
      // If there's a match, return the captured code
      return match[1].trim();
    } else if (regex.test(json)) {
      // Fall through to the previous behavior if regex.test(json) is true
      json = json.replace(/```javascript/gi, ''); // Replace all occurrences of '```javascript'
      json = json.replace(/```/gi, ''); // Replace all occurrences of '```'
    }
  }
  json = json.trim();
  return json;
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
  const original = json;
  const subString = '```';
  const regex = new RegExp(subString, 'ig'); // Added 'g' flag for global replacement

  if (typeof json === 'string' && attemptRepair && regex.test(json)) {
    json = extractCodeFromResponse(json);
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
        return original;
      }
    } else {
      return original;
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

/**
 * Creates a unique cache key based on the provided key object.
 * @param {object} key - The key object containing relevant information to generate the cache key.
 * @returns {string} - The generated cache key.
 */
function createCacheKey(key = {}) {
  let cacheKey = {
    module: key.module || key.interfaceName || key.interface,
    apiKey: key.apiKey,
    message:
      key.message || key.simplePrompt || key.prompt || key.embeddingString,
    ...key.options,
    ...key.interfaceOptions,
  };

  return crypto
    .createHash('md5')
    .update(JSON.stringify(cacheKey))
    .digest('hex');
}


/* should be moved */

/**
 * Writes the given text to the standard output without a newline.
 *
 * @param {string} text - The text to write to the standard output.
 */
function prettyText(text) {
  process.stdout.write(text);
}

/**
 * Displays a pretty-formatted header with optional description, prompt, interface name, and embeddings.
 *
 * @param {string} title - The title to display.
 * @param {string} [description=false] - The optional description to display.
 * @param {string} [prompt=false] - The optional prompt to display.
 * @param {string} [interfaceName=false] - The optional interface name to display.
 * @param {boolean} [embeddings=false] - Indicates whether to display embeddings.
 */
function prettyHeader(
  title,
  description = false,
  prompt = false,
  interfaceName = false,
  embeddings = false,
) {
  if (description) {
    process.stdout.write('\x1Bc');
  }
  title = title.trim();

  process.stdout.write(`\n${GREEN}${title}:${RESET}`);

  if (interfaceName) {
    process.stdout.write(
      `\n${YELLOW}Using ${interfaceName} and ${!embeddings
        ? getInterfaceConfigValue(interfaceName, 'model.default')
        : getInterfaceConfigValue(interfaceName, 'embeddings.default')
      }${RESET}`,
    );
  }

  if (description) {
    description = description.trim();
    process.stdout.write(`\n\n${description}`);
  }

  if (prompt) {
    prompt = prompt.trim();
    process.stdout.write(`\n\n${GREEN}Prompt:${RESET}\n`);
    process.stdout.write(`\n> ${prompt.replaceAll('\n', '\n> ')}\n`);
  }
}

/**
 * Displays a pretty-formatted result with a title and response.
 *
 * @param {string|Array} response - The response to display. Can be a string or an array.
 * @param {string} [title='Response'] - The title to display for the response.
 */
function prettyResult(response, title = 'Response') {
  title = title.trim();
  process.stdout.write(`\n${GREEN}${title}:${RESET}\n`);
  if (typeof response === 'string') {
    process.stdout.write(`\n> ${response.replaceAll('\n', '\n> ')}\n\n`);
  } else if (Array.isArray(response)) {
    console.log(response);
  }
}


/**
 * Checks if the given variable is an empty plain object.
 *
 * @param {object} obj - The object to check.
 * @returns {boolean} - Returns true if the object is empty, false otherwise.
 *
 * @example
 * const emptyObj = {};
 * const nonEmptyObj = { key: 'value' };
 *
 * console.log(isEmptyObject(emptyObj)); // true
 * console.log(isEmptyObject(nonEmptyObj)); // false
 */

function isEmptyObject(obj) {
  return obj !== null && obj !== undefined && Object.keys(obj).length === 0 && obj.constructor === Object;
}


module.exports = {
  getMessageObject,
  getSimpleMessageObject,
  parseJSON,
  isEmptyObject,
  delay,
  createCacheKey,
  prettyHeader,
  prettyResult,
  prettyText,
  YELLOW,
  GREEN,
  RESET,
};
