/**
 * @file examples/json/native-json-output.js
 * @description This example demonstrates JSON repair. An invalid JSON response is forced by specifying JSON output requirements through the prompt and requesting a larger result set than can be returned based on token size. The invalid response can be repaired by setting interfaceOptions.attemptJsonRepair to true.
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
const interfaceName = 'groq';
const apiKey = process.env.GROQ_API_KEY;

// Example description
const description = `This example demonstrates JSON repair. An invalid JSON response is forced by specifying JSON output requirements through the prompt and requesting a larger result set than can be returned based on token size. The invalid response can be repaired by setting interfaceOptions.attemptJsonRepair to true.

To run this example, you first need to install the required modules by executing:

  npm install dotenv`;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  let prompt = `${simplePrompt} Return 5 results.\n\nProvide the response as a JSON object.\n\nFollow this output format, only responding with the JSON object and nothing else:\n\n{title, reason}`;
  prettyHeader('JSON Repair Example', description, prompt, interfaceName);

  LLMInterface.setApiKey(interfaceName, apiKey);

  try {
    console.time('Timer');
    const response = await LLMInterface.sendMessage(
      interfaceName,
      prompt,
      {
        max_tokens: 100,
      },
      { attemptJsonRepair: true },
    );

    prettyResult(response.results);
    console.log();
    console.timeEnd('Timer');
    console.log();
  } catch (error) {
    console.error('Error processing LLMInterface.sendMessage:', error);
  }
}

exampleUsage();
