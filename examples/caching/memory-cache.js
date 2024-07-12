/**
 * @file examples/caching/memory-cache.js
 * @description This example demonstrates the usage of the memory cache for caching API requests.
 *
 * This example show LLMInterface configured with a memory cache. Subsequent calls to LLMInterface.sendMessage()
 * within the same session will utilize the cached responses, significantly improving performance by avoiding redundant requests.
 *
 * To run this example, you first need to install the required module by executing:
 *
 *    npm install dotenv
 *
 * Note: This script will run faster on subsequent executions within the same session due to the caching mechanism.
 */

const { LLMInterface } = require('../../src/index.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const { prettyHeader, prettyResult } = require('../../src/utils/utils.js');

require('dotenv').config({ path: '../../.env' });

// Setup your key and interface
const interfaceName = 'groq';
const apiKey = process.env.GROQ_API_KEY;

// Example description
const description = `This example demonstrates the usage of a memory response cache for caching API responses.

To run this example, you first need to install the required modules by executing:

  npm install dotenv

In this example, the "LLMInterface" is configured with a memory cache. Subsequent calls to LLMInterface.sendMessage() within the same session will utilize the cached responses, significantly improving performance by avoiding redundant requests.

Note: This script will run faster on subsequent executions within the same session due to the caching mechanism.`;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  prettyHeader(
    'Memory Cache Example',
    description,
    simplePrompt,
    interfaceName,
  );

  LLMInterface.setApiKey(interfaceName, apiKey);
  LLMInterface.configureCache({ cache: 'memory-cache' });
  let response = null;

  try {
    console.time('Timer');
    response = await LLMInterface.sendMessage(interfaceName, simplePrompt, {
      max_tokens: 100,
    });

    prettyResult(response.results);

    console.timeEnd('Timer');

    console.time('Timer');
    response = await LLMInterface.sendMessage(interfaceName, simplePrompt, {
      max_tokens: 100,
    });

    prettyResult(response.results);

    console.timeEnd('Timer');
    console.log();
  } catch (error) {
    console.error(error);
  }
}

exampleUsage();
