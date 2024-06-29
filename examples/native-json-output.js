/**
 * @file examples/native-json-output.js
 * @description Example showing native JSON output
 */
const { LLMInterface } = require('llm-interface');
const { simplePrompt, options } = require('../src/utils/defaults.js');

require('dotenv').config({ path: '../.env' });

// Setup your key and interface
const interface = 'gemini';
const apiKey = process.env.GEMINI_API_KEY;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  let prompt = `${simplePrompt} Retun 5 results.\n\nProvide the response as a valid JSON object; validate the object before responding.\n\nJSON Output Format: [{title, reason}]`;

  console.log('Native JSON Output:');
  console.log();
  console.log('Prompt:');
  console.log(`> ${prompt.replaceAll('\n\n', '\n>\n> ')}`);
  console.log();

  LLMInterface.setApiKey(interface, apiKey);

  try {
    const response = await LLMInterface.sendMessage(interface, prompt, {
      max_tokens: 1024,
      response_format: 'json_object',
    });

    console.log('JSON Result:');
    console.log(response.results);
    console.log();
  } catch (error) {
    console.error('Error processing LLMInferface.sendMessage:', error);
  }
}

exampleUsage();
