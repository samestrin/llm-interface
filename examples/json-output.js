/**
 * @file examples/native-json-output.js
 * @description Example showing JSON repair. To do this, I will a larger result set then can be returned based on token size, this will result in
 * a response containing an invalid JSON object. We aren't using native JSON mode because generally that will provide some level of JSON validation.
 */
const { LLMInterface } = require('llm-interface');
const { simplePrompt, options } = require('../src/utils/defaults.js');

require('dotenv').config({ path: '../.env' });

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
  console.log(`> ${prompt.replaceAll('\n\n', '\n>\n> ')}`);
  console.log();

  LLMInterface.setApiKey(interface, apiKey);

  try {
    const response = await LLMInterface.sendMessage(interface, prompt, {
      max_tokens: 1024,
    });

    console.log('Repaired JSON Result:');
    console.log(response.results);
    console.log();
  } catch (error) {
    console.error('Error processing LLMInferface.sendMessage:', error);
  }
}

exampleUsage();
