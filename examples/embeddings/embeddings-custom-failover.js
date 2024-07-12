/**
 * @file examples/embeddings/embeddings-custom-failover.js
 * @description This example demonstrates the usage of LLMInterface.embeddings() with a custom failover mechanism.
 * To use a custom failover, ensure your selected service supports embeddings and provide LLMInterface with the associated API key.
 *
 * To run this example, you first need to install the required module by executing:
 *
 *    npm install dotenv
 *
 * In this example, we attempt to query groq for embeddings, but since groq does not support this feature, LLMInterface uses 'huggingface' as a failover.
 */

const { LLMInterface } = require('../../src/index.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const {
  prettyHeader,
  prettyResult,
  YELLOW,
  RESET,
} = require('../../src/utils/utils.js');

require('dotenv').config({ path: '../../.env' });

// Example description
const description = `This example demonstrates the usage of LLMInterface.embeddings() with a custom failover mechanism.

To run this example, you first need to install the required modules by executing:

  npm install dotenv

To use a custom failover, ensure that your custom provider supports embeddings and provide LLMInterface with the associated API key. In this example, we attempt to query ${YELLOW}groq${RESET} for embeddings, but since ${YELLOW}groq${RESET} does not support this feature, LLMInterface uses ${YELLOW}huggingface${RESET} as a failover.`;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  prettyHeader(
    'Embeddings with Custom Failover Example',
    description,
    simplePrompt,
  );

  LLMInterface.setApiKey({
    groq: process.env.GROQ_API_KEY,
    huggingface: process.env.HUGGINGFACE_API_KEY,
  });

  let options = {},
    interfaceOptions = {},
    response;

  try {
    console.time('Timer');
    response = await LLMInterface.embeddings(
      'groq', // The interfaceName for a provider that does not support embedding.
      simplePrompt,
      options,
      interfaceOptions,
      'huggingface', // The interfaceName for a provider that does support embeddings.
    );
  } catch (error) {
    console.error(error);
  }
  if (Array.isArray(response.results)) {
    prettyResult(response.results);
  } else {
    console.error('Embeddings failed.');
  }
  console.log();
  console.timeEnd('Timer');
  console.log();
}

exampleUsage();
