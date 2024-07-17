/**
 * @file examples/interfaceOptions/include-original-response.js
 * @description This example demonstrates the usage of interfaceOptions to control the final output response. By default, LLMInterface does not include the entire response, instead it normalizes the responses back to response.results. If you enable includeOriginalResponse, response.originalResponse will contain the entire LLM provider response in its original format.
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
const description = `This example demonstrates the usage of interfaceOptions to control the final output response. By default, LLMInterface does not include the entire response, instead it normalizes the responses back to response.results. If you enable includeOriginalResponse, response.originalResponse will contain the entire LLM provider response in its original format.

To run this example, you first need to install the required modules by executing:

  npm install dotenv`;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  prettyHeader(
    'Include Original Response',
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
        includeOriginalResponse: true,
      },
    );

    //prettyResult(response.results);
    console.log(response);
    console.log();
    console.timeEnd('Timer');
    console.log();
  } catch (error) {
    console.error('Error processing LLMInterface.sendMessage:', error);
  }
}

exampleUsage();
