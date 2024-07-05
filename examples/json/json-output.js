/**
 * @file examples/json/json-output.js
 * @description Example showing JSON output. This is accomplished by specifying JSON output requirements through the prompt.
 */

const { LLMInterface } = require('../../src/index.js');
const { simplePrompt } = require('../../src/utils/defaults.js');

require('dotenv').config({ path: '../../.env' });

// Setup your key and interface
const interface = 'huggingface';
const apiKey = process.env.HUGGINGFACE_API_KEY;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  let prompt = `${simplePrompt} Return 5 results.\n\nProvide the response as a JSON object.\n\nFollow this output format, only responding with the JSON object and nothing else:\n\n{title, reason}`;

  console.log('JSON Output (Prompt Based):');
  console.log();
  console.log('Prompt:');
  console.log(`> ${prompt.replaceAll('\n', '\n> ')}`);
  console.log();

  LLMInterface.setApiKey(interface, apiKey);

  try {
    const response = await LLMInterface.sendMessage(interface, prompt, {
      max_tokens: 1024,
    });

    // since this isn't native, and we aren't repairing it, we can't guarantee the response element will be valid JSON'
    if (response.results && typeof response.results !== 'object') {
      response.results = JSON.parse(response.results);
    }

    console.log('JSON Result:');
    console.log(response.results);
    console.log();
  } catch (error) {
    console.error('Error processing LLMInterface.sendMessage:', error);
  }
}

exampleUsage();
