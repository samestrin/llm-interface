/**
 * @file examples/interfaceOptions/auto-retry-failed-requests.js
 * @description This example demonstrates the usage of interfaceOptions to control the number of retry attempts and the speed of the progressive delay for failed requests.
 *
 * To run this example, you first need to install the required module by executing:
 *
 *    npm install dotenv
 */

const { LLMInterface } = require('../../src/index.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const { prettyHeader, prettyResult } = require('../../src/utils/utils.js');

require('dotenv').config({ path: '../../.env' });

// Setup your key and interface
const interfaceName = 'groq';
const apiKey = process.env.GROQ_API_KEY;

// Example description
const description = `This example demonstrates the usage of interfaceOptions to control the number of retry attempts and the speed of the progressive delay for failed requests.

To run this example, you first need to install the required modules by executing:

  npm install dotenv`;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  prettyHeader(
    'Auto Retry Failed Requests Example',
    description,
    simplePrompt,
    interfaceName,
  );

  LLMInterface.setApiKey(interfaceName, apiKey);

  try {
    console.time('Timer');
    const response = await LLMInterface.sendMessage(
      interfaceName,
      simplePrompt,
      {
        max_tokens: 100,
      },
      {
        retryAttempts: 3, // the number of times to retry
        retryMultiplier: 0.3, // the retry multiplier which is a value of 0-1. Higher values will increase the progressive delay time. Default 0.3.
      },
    );

    prettyResult(response.results);
    console.log();
    console.timeEnd('Timer');
    console.log();
  } catch (error) {
    console.error('Error processing LLMInterface.sendMessage:', error);
  }
}

exampleUsage();
