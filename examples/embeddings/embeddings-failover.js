/**
 * @file examples/embeddings/embeddings-failover.js
 * @description This example demonstrates the usage of the LLMInterface.embeddings() method with the default failover mechanism.
 * It ensures that if the primary service (groq) does not support embeddings, the request is automatically routed to the default provider (voyage).
 *
 * To run this example, you first need to install the required module by executing:
 *
 *    npm install dotenv
 */
const { LLMInterface } = require('../../src/index.js');
const { simplePrompt, options } = require('../../src/utils/defaults.js');
const {
  prettyHeader,
  prettyResult,
  YELLOW,
  RESET,
} = require('../../src/utils/utils.js');

require('dotenv').config({ path: '../../.env' });

// Example description
const description = `This example demonstrates the usage of the LLMInterface.embeddings() method with the default failover mechanism. 

To run this example, you first need to install the required modules by executing:

  npm install dotenv

To use the default failover, provide LLMInterface with an API key for ${YELLOW}voyage${RESET}. In this example, we attempt to query ${YELLOW}groq${RESET} for embeddings, but since ${YELLOW}groq${RESET} does not support this feature, LLMInterface uses ${YELLOW}voyage${RESET} as a failover.

You can override the default failover provider by specifying a interfaceOptions.embeddingsDefaultProvider value.`;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  prettyHeader(
    'Embeddings with Default Failover Example',
    description,
    simplePrompt,
  );

  LLMInterface.setApiKey({
    groq: process.env.GROQ_API_KEY,
    voyage: process.env.VOYAGE_API_KEY, // Default failover provider. To use this feature you must provide an API key for voyage.
  });

  const interfaceOptions = {};

  try {
    console.time('Timer');
    response = await LLMInterface.embeddings(
      'groq',
      simplePrompt,
      options,
      interfaceOptions,
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
