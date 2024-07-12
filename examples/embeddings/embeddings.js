/**
 * @file examples/embeddings/embeddings.js
 * @description This example demonstrates the usage of the LLMInterface.embeddings() method. Note that not all providers support embeddings, so it is important to check the provider documentation or use a failover mechanism.
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
const interfaceName = 'huggingface';
const apiKey = process.env.HUGGINGFACE_API_KEY;

// Example description
const description = `This example demonstrates the basic usage of the LLMInterface.embeddings() method. Note that not all providers support embeddings, so it is important to check the provider documentation or use a failover mechanism.

To run this example, you first need to install the required modules by executing:

  npm install dotenv
`;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  prettyHeader(
    'Embeddings Example',
    description,
    simplePrompt,
    interfaceName,
    true,
  );

  LLMInterface.setApiKey(interfaceName, apiKey);
  try {
    console.time('Timer');
    response = await LLMInterface.embeddings(interfaceName, simplePrompt);
    if (Array.isArray(response.results)) {
      prettyResult(response.results);
    } else {
      console.error('Embeddings failed.');
    }
    console.log();
    console.timeEnd('Timer');
    console.log();
  } catch (error) {
    console.error(error);
  }
}

exampleUsage();
