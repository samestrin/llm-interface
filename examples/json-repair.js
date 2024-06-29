/**
 * @file examples/native-json-output.js
 * @description Example showing JSON repair. To do this, I will specify my JSON output requirements through my prompt, and I will request a
 * larger result set then can be returned based on token size using a prompt, this will result in a response containing an invalid JSON object. I
 * will then repair the response using the attemptJsonRepair interfaceOption.
 */
const { LLMInterface } = require('llm-interface');
const { simplePrompt, options } = require('../src/utils/defaults.js');

require('dotenv').config({ path: '../.env' });

// Setup your key and interface
const interface = 'groq';
const apiKey = process.env.GROQ_API_KEY;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  let prompt = `${simplePrompt} Return 5 results.\n\nProvide the response as a JSON object.\n\nFollow this output format, only responding with the JSON object and nothing else:\n\n{title, reason}`;

  console.log('JSON Repair:');
  console.log();
  console.log('Prompt:');
  console.log(`> ${prompt.replaceAll('\n\n', '\n>\n> ')}`);
  console.log();

  LLMInterface.setApiKey(interface, apiKey);

  try {
    const response = await LLMInterface.sendMessage(
      interface,
      prompt,
      {
        max_tokens: 100,
      },
      { attemptJsonRepair: true },
    );

    console.log('Repaired JSON Result:');
    console.log(response.results);
    console.log();
  } catch (error) {
    console.error('Error processing LLMInterface.sendMessage:', error);
  }
}

exampleUsage();
