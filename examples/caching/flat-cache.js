/**
 * @file examples/caching/flat-cache.js
 * @description This example demonstrates the basic usage of the "flat-cache" module for caching API requests.
 *
 * To run this example, you first need to install the required modules by executing:
 *
 *    npm install flat-cache dotenv
 *
 * In this example, "flat-cache" is configured using the LLMInterface.configureCache() method. Subsequent calls to LLMInterface.sendMessage()
 * with the interfaceOptions.cacheTimeoutSeconds parameter will be cached, improving performance by reducing redundant requests.
 *
 * Note: This script will run faster on subsequent executions after the initial run due to the caching mechanism.
 */

const { LLMInterface } = require('../../src/index.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const { prettyHeader, prettyResult } = require('../../src/utils/utils.js');

require('dotenv').config({ path: '../../.env' });

// Setup your key and interface
const interfaceName = 'groq';
const apiKey = process.env.GROQ_API_KEY;

// Example description
const description = `This example demonstrates the basic usage of the "flat-cache" module for caching API requests.

To run this example, you must first install the "flat-cache" module by executing:

  npm install flat-cache dotenv

In this example, "flat-cache" is configured using the LLMInterface.configureCache() method. Subsequent calls to LLMInterface.sendMessage() with the interfaceOptions.cacheTimeoutSeconds parameter will be cached, improving performance by reducing redundant requests.

To flush the cache you can run this example with the "--flush-cache" argument.

Note: This script will run faster on subsequent executions after the initial run due to the caching mechanism.`;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  prettyHeader('Flat Cache Example', description, simplePrompt, interfaceName);

  LLMInterface.setApiKey(interfaceName, apiKey);
  LLMInterface.configureCache({ cache: 'flat-cache' });

  const args = process.argv;

  try {
    console.time('Timer');
    const response = await LLMInterface.sendMessage(
      interfaceName,
      simplePrompt,
      {
        max_tokens: 100,
      },
      { cacheTimeoutSeconds: 86400 },
    );

    prettyResult(response.results);

    console.timeEnd('Timer');
    console.log();
  } catch (error) {
    console.error(error);
  }

  if (args.includes('--flush-cache')) {
    console.log('Cache flushed.');
    LLMInterface.flushCache();
  }
}

exampleUsage();
