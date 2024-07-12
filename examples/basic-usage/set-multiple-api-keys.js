/**
 * @file examples/basic-usage/set-multiple-api-keys.js
 * @description This example demonstrates setting multiple api keys at once.
 *
 * To run this example, you first need to install the required modules by executing:
 *
 *    npm install dotenv
 */

const { LLMInterface } = require('../../src/index.js');
const { prettyHeader, prettyResult } = require('../../src/utils/utils.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
require('dotenv').config({ path: '../../.env' });

// Setup your keys and interfaces
LLMInterface.setApiKey({
  groq: process.env.GROQ_API_KEY,
  huggingface: process.env.HUGGINGFACE_API_KEY,
});

// Example description
const description = `This example demonstrates setting multiple api keys at once.

To run this example, you first need to install the required modules by executing:

   npm install dotenv`;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  console.time('Timer (All)');
  LLMInterface.setApiKey({
    groq: process.env.GROQ_API_KEY,
    huggingface: process.env.HUGGINGFACE_API_KEY,
  });
  prettyHeader(
    'Set Multiple API Keys at Once Example',
    description,
    simplePrompt,
  );
  try {
    console.time('Timer');
    const response = await LLMInterface.sendMessage('groq', simplePrompt, { max_tokens: 100 });
    prettyResult(response.results, "Response (Groq)");
    console.timeEnd('Timer');
  } catch (error) {
    console.error('Error processing set multiple api keys sendMessage:', error);
  }
  try {
    console.time('Timer');
    const response = await LLMInterface.sendMessage('huggingface', simplePrompt, { max_tokens: 100 });
    prettyResult(response.results, "Response (Hugging Face)");
    console.timeEnd('Timer');
    console.log();
  } catch (error) {
    console.error('Error processing set multiple api keys sendMessage:', error);
  }
  console.timeEnd('Timer (All)');
  console.log();
}

exampleUsage();
