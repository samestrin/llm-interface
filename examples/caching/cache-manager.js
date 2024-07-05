/**
 * @file examples/caching/cache-manager.js
 * @description Example showing basic "cache-manager" usage. In this example "cache-manager" is used with a filesystem storage mechanism. To run this example,
 * you will first need to run "npm install cache-manager@4.0.0 cache-manager-fs-hash". "cache-manager" is then configured through LLMInterface.configureCache() and subsequent
 * LLMInterface.sendMessage() requests with an interfaceOptions.cacheTimeoutSeconds value will be cached. This script should be faster on subsequent runs after the first.
 */

const { LLMInterface } = require('../../src/index.js');
const { simplePrompt } = require('../../src/utils/defaults.js');

// You do not need to include the base cache-manager, this is auto-injected
// const cacheManager = require('cache-manager');

// You do need to include the storage mechanism dependencies your want to use.
// In this case, I am using fsStore
const fsStore = require('cache-manager-fs-hash');

require('dotenv').config({ path: '../../.env' });

// Setup your key and interface
const interface = 'groq';
const apiKey = process.env.GROQ_API_KEY;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  let prompt = `${simplePrompt}`;

  console.log(
    'Cache Manager (Requires "npm install cache-manager@4.0.0 cache-manager-fs-hash"):',
  );
  console.log();
  console.log('Prompt:');
  console.log(`> ${prompt.replaceAll('\n', '\n> ')}`);
  console.log();

  LLMInterface.setApiKey(interface, apiKey);
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

  //console.log(LLMInterface);
  console.time('Timer');
  try {
    const response = await LLMInterface.sendMessage(
      interface,
      prompt,
      {
        max_tokens: 100,
      },
      { cacheTimeoutSeconds: 86400 },
    );

    console.log('Response:');
    console.log(response);
    console.log();
    console.timeEnd('Timer');
  } catch (error) {
    console.error('Error processing LLMInterface.sendMessage:', error);
  }
}

exampleUsage();
