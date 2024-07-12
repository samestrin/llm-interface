/**
 * @file examples/basic-usage/prompt.js
 * @description This example demonstrates submitting a string prompt.
 *
 * To run this example, you first need to install the required modules by executing:
 *
 *    npm install dotenv
 */


const { LLMInterface } = require('../../src/index.js');
const { prettyHeader, prettyResult } = require('../../src/utils/utils.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
require('dotenv').config({ path: '../../.env' });

// Setup your key and interface
const interfaceName = 'groq';
const apiKey = process.env.GROQ_API_KEY;

// Example description
const description = `This example demonstrates submitting a string prompt.

To run this example, you first need to install the required modules by executing:

   npm install dotenv`;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  const response = await LLMInterface.sendMessage(interfaceName, simplePrompt);
  try {
    console.time('Timer');
    prettyHeader(
      'Prompt Example',
      description,
      simplePrompt,
      interfaceName,
    );

    LLMInterface.setApiKey(interfaceName, apiKey);


    console.log(response);
    //prettyResult(response.results);
    console.timeEnd('Timer');
    console.log();
  } catch (error) {
    console.error('Error processing stream:', error);
  }
}

exampleUsage();
