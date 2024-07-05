/**
 * @file examples/interfaceOptions/include-original-response.js
 * @description Example showing interfaceOptions usage to control the final output response. By default, llm-interface does not include the entire response, instead it normalizes the responses back to
 * response.results. If you enable includeOriginalResponse, response.originalResponse will contain the entire LLM provider response in its original format.
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

  console.log('Include Original Response:');
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
        includeOriginalResponse: true,
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
