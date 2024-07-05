/**
 * @file examples/interfaceOptions/auto-retry-failed-requests.js
 * @description Example showing interfaceOptions usage to control the number of retryAttempts and the speed of the progressive delay.
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

  console.log('Auto Retry Failed Requests:');
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
      {
        retryAttempts: 3, // the number of times to retry
        retryMultiplier: 0.3, // the retry multiplier which is a value of 0-1. Higher values will increase the progressive delay time. Default 0.3.
      },
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
