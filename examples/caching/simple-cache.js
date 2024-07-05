/**
 * @file examples/caching/simple-cache.js
 * @description Example showing SimpleCache usage. By default SimpleCache is available and does not have any requirements. To use it, just specify an
 * interfaceOptions.cacheTimeoutSeconds value. This script should be faster on subsequent runs after the first.
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

  console.log('Simple Cache (Default Cache Engine):');
  console.log();
  console.log('Prompt:');
  console.log(`> ${prompt.replaceAll('\n', '\n> ')}`);
  console.log();

  LLMInterface.setApiKey(interface, apiKey);
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
