/**
 * @file examples/json/json-output.js
 * @description This example demonstrates JSON output by specifying JSON output requirements through the prompt.
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
const description = `This example demonstrates JSON output by specifying JSON output requirements through the prompt.

To run this example, you first need to install the required modules by executing:

  npm install dotenv`;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  let prompt = `${simplePrompt} Return 5 results.\n\nProvide the response as a JSON object.\n\nFollow this output format, only responding with the JSON object and nothing else:\n\n{title, reason}`;

  prettyHeader(
    'JSON Output (Prompt Based) Example',
    description,
    prompt,
    interfaceName,
  );

  LLMInterface.setApiKey(interfaceName, apiKey);

  try {
    console.time('Timer');
    const response = await LLMInterface.sendMessage(interfaceName, prompt, {
      max_tokens: 1024,
    });

    // since this isn't native, and we aren't repairing it, we can't guarantee the response element will be valid JSON'
    if (response.results && typeof response.results !== 'object') {
      response.results = JSON.parse(response.results);
    }

    prettyResult(response.results);
    console.log();
    console.timeEnd('Timer');
    console.log();
  } catch (error) {
    console.error('Error processing LLMInterface.sendMessage:', error);
  }
}

exampleUsage();
