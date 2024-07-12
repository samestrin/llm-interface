/**
 * @file examples/caching/cache-manager.js
 * @description This example demonstrates the basic usage of the "cache-manager" module with a filesystem storage mechanism.
 *
 * To run this example, you first need to install the required modules by executing:
 *
 *    npm install cache-manager@4.0.0 cache-manager-fs-hash dotenv
 *
 * In this example, "cache-manager" is configured using the LLMInterface.configureCache() method. Subsequent calls to LLMInterface.sendMessage()
 * with the interfaceOptions.cacheTimeoutSeconds parameter will utilize the caching mechanism, significantly improving performance by reducing redundant requests.
 *
 * Note: This script will run faster on subsequent executions after the initial run due to the caching mechanism.
 */

const { LLMInterface } = require('../../src/index.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const { prettyHeader, prettyResult } = require('../../src/utils/utils.js');

require('dotenv').config({ path: '../../.env' });

// No need to include the base "cache-manager" module as it is auto-injected.
// Example: const cacheManager = require('cache-manager'); // This line is not needed.

// Include the storage mechanism dependencies you want to use.
// Example: const fsStore = require('cache-manager-fs-hash');

const fsStore = require('cache-manager-fs-hash');

// Setup your key and interface
const interfaceName = 'groq';
const apiKey = process.env.GROQ_API_KEY;

// Example description
const description = `This example demonstrates the basic usage of the "cache-manager" module with a filesystem storage mechanism.

To run this example, you first need to install the required modules by executing:

  npm install cache-manager@4.0.0 cache-manager-fs-hash dotenv

In this example, "cache-manager" is configured using the LLMInterface.configureCache() method. Subsequent calls to LLMInterface.sendMessage() 
with the interfaceOptions.cacheTimeoutSeconds parameter will utilize the caching mechanism, significantly improving performance by reducing redundant requests.

To flush the cache you can run this example with the "--flush-cache" argument.

Note: This script will run faster on subsequent executions after the initial run due to the caching mechanism.`;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  prettyHeader(
    'Cache Manager Example',
    description,
    simplePrompt,
    interfaceName,
  );

  LLMInterface.setApiKey(interfaceName, apiKey);
  LLMInterface.configureCache({
    cache: 'cache-manager',
    config: {
      store: fsStore,
      options: {
        path: '../../cache', // Path to the directory where cache files will be stored
        ttl: 60 * 60, // Time to live in seconds (1 hour)
        subdirs: true, // Create subdirectories to reduce the number of files per directory
        zip: false, // Compress files to save space
      },
    },
  });

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
