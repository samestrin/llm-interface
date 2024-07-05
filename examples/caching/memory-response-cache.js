/**
 * @file examples/caching/memory-response-cache.js
 * @description Example showing the response memory cache. This will store the sendMessage response in a singleton, which it will speed up any duplicate sendMessage in the same session.
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

  console.log('Memory Response Cache:');
  console.log();
  console.log('Prompt:');
  console.log(`> ${prompt.replaceAll('\n', '\n> ')}`);
  console.log();

  LLMInterface.setApiKey(interface, apiKey);
  LLMInterface.configureCache({ cache: 'memory-cache' });
  let response = null;

  try {
    console.time('First Run');
    response = await LLMInterface.sendMessage(interface, prompt, {
      max_tokens: 100,
    });

    console.log('Response:');
    console.log(response);
    console.log();
    console.timeEnd('First Run');

    console.time('Second Run');
    response = await LLMInterface.sendMessage(interface, prompt, {
      max_tokens: 100,
    });

    console.log('Response:');
    console.log(response);
    console.log();
    console.timeEnd('Second Run');
  } catch (error) {
    console.error('Error processing LLMInterface.sendMessage:', error);
  }
}

exampleUsage();
