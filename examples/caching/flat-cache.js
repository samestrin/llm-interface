/**
 * @file examples/caching/flat-cache.js
 * @description Example showing basic "flat-cache" usage. In this example "flat-cache" is used. To run this example, you will first need to run
 * "npm install flat-cache". "flat-cache" is then configured through LLMInterface.configureCache() and subsequent LLMInterface.sendMessage() requests with
 * an interfaceOptions.cacheTimeoutSeconds value will be cached.  This script should be faster on subsequent runs after the first.
 */

const { LLMInterface } = require('../../src/index.js');
const { simplePrompt } = require('../../src/utils/defaults.js');

require('dotenv').config({ path: '../../.env' });

// Setup your key and interface
const interface = 'groq';
const apiKey = process.env.GROQ_API_KEY;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  let prompt = `${simplePrompt}`;

  console.log('Flat Cache (Requires "npm install flat-cache"):');
  console.log();
  console.log('Prompt:');
  console.log(`> ${prompt.replaceAll('\n', '\n> ')}`);
  console.log();

  LLMInterface.setApiKey(interface, apiKey);
  LLMInterface.configureCache({ cache: 'flat-cache' });

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
