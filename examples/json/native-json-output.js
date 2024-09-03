/**
 * @file examples/json/native-json-output.js
 * @description This example demonstrates native JSON output by specifying JSON requirements in the prompt and enabling native JSON mode. This ensures server-side JSON validation but may return a null response if the result set exceeds the response token limit.
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
const interfaceName = 'gemini';
const apiKey = process.env.GEMINI_API_KEY;

// Example description
const description = `This example demonstrates native JSON output by specifying JSON requirements in the prompt and enabling native JSON mode. This ensures server-side JSON validation but may return a null response if the result set exceeds the response token limit.

To run this example, you first need to install the required modules by executing:

  npm install dotenv

Note that not all providers support native JSON mode, so it is important to check the provider documentation.`;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  let prompt = `${simplePrompt} Return 5 results.\n\nProvide the response as a valid JSON object; validate the object before responding.\n\nJSON Output Format: [{title, reason}]`;

  prettyHeader(
    'Native JSON Output Example',
    description,
    prompt,
    interfaceName,
  );

  LLMInterface.setApiKey(interfaceName, apiKey);

  try {
    console.time('Timer');
    const response = await LLMInterface.sendMessage(interfaceName, prompt, {
      max_tokens: 1024,
      response_format: 'json_object',
    });

    prettyResult(response.results);
    console.log();
    console.timeEnd('Timer');
    console.log();
  } catch (error) {
    console.error('Error processing LLMInterface.sendMessage:', error);
  }
}

exampleUsage();
