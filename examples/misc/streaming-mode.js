/**
 * @file examples/misc/streaming-mode.js
 * @description This example demonstrates the new beta streaming functionality with the "groq" interface.
 *
 * To run this example, you first need to install the required modules by executing:
 *
 *    npm install dotenv
 *
 * This script shows how to process a stream and concatenate the data.choices[0].delta.content into a single string using the processStream function.
 */

const { Readable } = require('stream');
const { simplePrompt, options } = require('../../src/utils/defaults.js');
const { LLMInterface } = require('../../src/index.js');
const { prettyHeader } = require('../../src/utils/utils.js');
require('dotenv').config({ path: '../../.env' });

// Setup your key and interface
const interfaceName = 'groq';
const apiKey = process.env.GROQ_API_KEY;

// Example description
const description = `This example demonstrates the new beta streaming functionality with the "groq" interface. Note that streaming format can vary between providers, so it is important to check the provider documentation.

To run this example, you first need to install the required modules by executing:

  npm install dotenv

This script shows how to process a stream and concatenate the data.choices[0].delta.content into a single string using the processStream function.`;

/**
 * Processes a stream and concatenates data.choices[0].content into a string.
 * @param {ReadableStream} stream - The stream to process.
 * @returns {Promise<string>} The concatenated content.
 */
async function processStream(stream) {
  return new Promise((resolve, reject) => {
    let content = '';
    const readableStream = new Readable().wrap(stream);

    readableStream.on('data', (chunk) => {
      const lines = chunk.toString().split('\n');
      for (const line of lines) {
        if (line.trim()) {
          const jsonLine = line.replace(/^data: /, ''); // Strip out the 'data: ' prefix
          if (jsonLine === '[DONE]') continue;
          if (jsonLine) {
            try {
              const parsed = JSON.parse(jsonLine);
              if (
                parsed.choices &&
                parsed.choices[0] &&
                parsed.choices[0].delta &&
                parsed.choices[0].delta.content
              ) {
                content += parsed.choices[0].delta.content;
                // Show the streamed content
                console.log(content);
              }
            } catch (error) {
              // Handle JSON parsing error if needed
              continue;
            }
          }
        }
      }
    });

    readableStream.on('end', () => {
      resolve(content);
    });

    readableStream.on('error', (error) => {
      reject(new Error(`Stream error: ${error}`));
    });
  });
}

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  console.log('Streaming Mode (Groq):');
  console.log();

  LLMInterface.setApiKey(interfaceName, apiKey);

  try {
    console.log('Process Stream');
    console.log();

    const stream = await LLMInterface.sendMessage(interfaceName, simplePrompt, {
      stream: true,
      ...options,
    });

    /*
    or

    const stream = await LLMInterface.streamMessage(
      interfaceName
      simpleprompt,
      options,
    );

    */

    const result = await processStream(stream.data);
    console.log();
    console.log('Concatenated Content');
    console.log(result);
  } catch (error) {
    console.error('Error processing stream:', error);
  }
}

exampleUsage();
