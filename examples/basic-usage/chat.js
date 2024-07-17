/**
 * @file examples/basic-usage/chat.js
 * @description This example demonstrates a chat using an OpenAI compatible structure.
 *
 * To run this example, you first need to install the required modules by executing:
 *
 *    npm install dotenv
 */

const { LLMInterface } = require('../../src/index.js');
const {
  prettyHeader,
  prettyText,
  prettyResult,
  GREEN,
  RESET,
} = require('../../src/utils/utils.js');
require('dotenv').config({ path: '../../.env' });

// Setup your key and interface
const interfaceName = 'groq';
const apiKey = process.env.GROQ_API_KEY;

// Example description
const description = `This example demonstrates a chat using an OpenAI compatible structure.

To run this example, you first need to install the required modules by executing:

   npm install dotenv`;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  // OpenAI chat.completion structure
  const openaiCompatibleStructure = {
    model: 'gemma-7b-it',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Say hello with a polite greeting!' },
      {
        role: 'system',
        content:
          "Hello there! It's an absolute pleasure to make your acquaintance. How may I have the honor of assisting you today?",
      },
      { role: 'user', content: 'I need help understanding low latency LLMs!' },
    ],
    max_tokens: 100,
  };
  LLMInterface.setApiKey(interfaceName, apiKey);

  try {
    console.time('Timer');
    prettyHeader('Chat Example', description, false, interfaceName);

    prettyText(`\n\n${GREEN}Prompt (OpenAI Compatible Structure):${RESET}\n\n`);
    console.log(openaiCompatibleStructure);
    console.log();

    const response = await LLMInterface.sendMessage(
      interfaceName,
      openaiCompatibleStructure,
    );

    /*
    or for the OpenAI API fans

    const response = await LLMInterface.chat.completions.create(
      interfaceName
      openaiCompatibleStructure
    );

    */

    prettyResult(response.results);
    console.timeEnd('Timer');
    console.log();
  } catch (error) {
    console.error(
      'Error processing openaiCompatibleStructure sendMessage:',
      error,
    );
  }
}

exampleUsage();
