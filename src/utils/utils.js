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
const log = require('loglevel');

let jsonrepairInstance = null;

// json parsing functions

/**
 * Attempts to parse a JSON string. If parsing fails and attemptRepair is true,
 * it uses jsonrepair to try repairing the JSON string.
 *
 * @param {string|object} input - The JSON string or object to parse.
 * @param {boolean} attemptRepair - Whether to attempt repairing the JSON string if parsing fails.
 * @returns {Promise<object|null>} - The parsed or repaired JSON object, or null if parsing and repair both fail.
 */
async function parseJSON(input, attemptRepair) {
  if (typeof input === 'object') {
    return input; // Input is already a JSON object
  }

  if (typeof input === 'string') {
    // First, attempt to parse the input directly
    try {
      return JSON.parse(input); // Fast native JSON.parse
    } catch (e) {
      //log.warn('Initial JSON.parse failed, attempting to preprocess input:', e);

      // Preprocess the input string to extract potential JSON
      input = preprocessInput(input);
    }
  }

  // After preprocessing, if the input is still a string, try parsing again
  try {
    const parsed = JSON.parse(input);
    return parsed;
  } catch (e) {
    //log.error('Secondary JSON parsing failed, attempting repair:', e);

    // If parsing still fails, and repair is enabled, try repairing the JSON
    if (attemptRepair) {
      return await repairJSON(input);
    }
  }

  return null; // Return null if parsing and repair both fail
}

/**
 * Preprocesses a string input to extract the first valid JSON object.
 *
 * @param {string} input - The string that may contain JSON.
 * @returns {string} - A string containing the first detected JSON object.
 */
function preprocessInput(input) {
  // Extract JSON from markdown blocks or raw string
  input = extractCodeFromResponse(input);

  // Attempt to find and return the first complete JSON object
  return findFirstValidJsonObject(input);
}

/**
 * Tries to repair a malformed JSON string.
 *
 * @param {string} json - The JSON string to repair.
 * @returns {Promise<object|null>} - The repaired and parsed JSON object, or null if repair fails.
 */
async function repairJSON(json) {
  try {
    const jsonrepair = await getJsonRepairInstance();
    let repaired;

    try {
      repaired = jsonrepair(json);
    } catch (e) {
      //log.error(
      //  'Initial JSON repair failed, attempting selective unescape:',
      //  e,
      //);
      const unescapedJson = attemptSelectiveUnescape(json);

      try {
        repaired = jsonrepair(unescapedJson); // Retry jsonrepair after selective unescaping
      } catch (retryError) {
        //log.error('JSON repair failed after selective unescape:', retryError);
        return null;
      }
    }

    if (repaired) {
      return JSON.parse(repaired);
    }
  } catch (error) {
    //log.error('JSON repair failed:', error);
  }

  return null;
}

/**
 * Attempts selective unescaping of certain sequences within the JSON string.
 * This approach avoids unescaping characters that could disrupt valid JSON.
 *
 * @param {string} json - The JSON string that might need selective unescaping.
 * @returns {string} - The JSON string with selective unescaping applied.
 */
function attemptSelectiveUnescape(json) {
  // Check if the input is a valid string; if not, return it unchanged
  if (typeof json !== 'string') {
    return json;
  }

  // Only unescape sequences that are safe and necessary
  return json
    .replace(/\\\\/g, '\\') // Double backslashes: safer to unescape
    .replace(/\\"/g, '\\"') // Retain escaped quotes to avoid breaking JSON structure
    .replace(/\\'/g, "'"); // This should be rare in JSON but included for completeness
}

/**
 * Finds and extracts the first complete JSON object from a string.
 *
 * @param {string} input - The string to search for JSON.
 * @returns {string} - The first JSON object found, or the original input if none found.
 */
function findFirstValidJsonObject(input) {
  let stack = [];
  let jsonStartIndex = -1;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === '{' || char === '[') {
      if (stack.length === 0) {
        jsonStartIndex = i; // Mark the start of the JSON object or array
      }
      stack.push(char);
    } else if (char === '}' || char === ']') {
      stack.pop();
      if (stack.length === 0) {
        const jsonString = input.substring(jsonStartIndex, i + 1);
        try {
          return JSON.parse(jsonString); // Return the valid JSON object
        } catch (error) {
          //log.warn(
          //  'Error parsing detected JSON object, continuing search:',
          //  error,
          //);
          continue; // Continue searching for another JSON object
        }
      }
    }
  }

  // If no valid JSON object is found, return null to trigger repairJSON
  return input;
}

/**
 * Extracts JavaScript or JSON code from a string with markdown code blocks.
 *
 * @param {string} input - The input string that may contain code.
 * @returns {string} - The extracted code or the cleaned-up input string.
 */
function extractCodeFromResponse(input) {
  // Enhanced regex to match triple backtick code blocks with optional language identifiers
  const codeBlockRegex = /\`\`\`(?:\w*\n)?([\s\S]*?)\`\`\`/g;
  const match = codeBlockRegex.exec(input);

  if (match && match[1]) {
    return match[1].trim(); // Return the extracted code if found
  }

  // Simplified cleanup of the input string by removing markdown markers in one pass
  return input
    .replace(/\`\`\`(\w+)?/gi, '') // Remove code block markers with optional language identifiers
    .trim();
}

// messaging functions

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

function unescapeString(escapedStr) {
  return escapedStr
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '\t')
    .replace(/\\r/g, '\r')
    .replace(/\\b/g, '\b')
    .replace(/\\f/g, '\f')
    .replace(/\\v/g, '\v')
    .replace(/\\0/g, '\0')
    .replace(/\\\\/g, '\\')
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'");
}

/**
 * Returns a promise that resolves after a specified delay in milliseconds.
 *
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise<void>} A promise that resolves after the delay.
 */
async function delay(ms) {
  //log.log(`delay(${ms})`);
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
      `\n${YELLOW}Using ${interfaceName} and ${
        !embeddings
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
 */

function isEmptyObject(obj) {
  return (
    obj !== null &&
    obj !== undefined &&
    Object.keys(obj).length === 0 &&
    obj.constructor === Object
  );
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
  unescapeString,
};
