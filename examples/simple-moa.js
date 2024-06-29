/**
 * @file examples/simple-moa.js
 * @description Example showing Mixture of Agents (MoA) concept to improve response quality.
 */
const { LLMInterface } = require('llm-interface');
const { simplePrompt } = require('../src/utils/defaults.js');

require('dotenv').config({ path: '../.env' });

// Setup your key and interface
LLMInterface.setApiKey({
  huggingface: process.env.HUGGINGFACE_API_KEY,
  groq: process.env.GROQ_API_KEY,
  gemini: process.env.GEMINI_API_KEY,
});

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  let stepsString = '';

  let proposerPrompt = `Given the prompt "${simplePrompt}" explain how you would respond, process wise. Show the process steps you could delegate while compressing the work into 3 steps, only include the brainstorming/research steps, not the answer.

Provide the response as a JSON object; before responding with the object make sure it is valid JSON. Compress the response to save space.

Follow this output format, only responding with the JSON object and nothing else:

[title[{step}]`;

  console.log('Mixture of Agents (MoA):');
  console.log();
  console.log('Prompt:');
  console.log(`> ${proposerPrompt.replaceAll('\n\n', '\n>\n> ')}`);
  console.log();

  try {
    const proposerResponse = await LLMInterface.sendMessage(
      'gemini',
      proposerPrompt,
      {
        max_tokens: 1024,
      },
      { attemptJsonRepair: true, cacheTimeoutSeconds: 86400 },
    );

    console.log('Proposer Result:');

    const jsonData = proposerResponse.results[1];

    // Extract and concatenate the 'step' descriptions into a single string
    stepsString = jsonData.steps.map((step) => `${step.step}`).join('\n\n');

    console.log(`> ${stepsString.replaceAll('\n\n', '\n>\n> ')}`);
  } catch (error) {
    console.error('Error processing Proposer LLMInterface.sendMessage:', error);
  }

  const aggregators = ['huggingface', 'groq'];
  const aggregatorResponse = [];

  // Array to keep track of which interfaces have been queried
  const queriedInterfaces = {};

  for (const aggregatorInterfaceName of aggregators) {
    try {
      // Check if this interface has already been queried
      if (!queriedInterfaces[aggregatorInterfaceName]) {
        console.log(`${aggregatorInterfaceName}:`);

        const aggregatorPrompt = `Given the prompt "${simplePrompt}"

${stepsString}
`;

        const response = await LLMInterface.sendMessage(
          aggregatorInterfaceName,
          aggregatorPrompt,
          { max_tokens: 4096 },
          { cacheTimeoutSeconds: 86400 },
        );

        aggregatorResponse.push(response.results);
        queriedInterfaces[aggregatorInterfaceName] = true; // Mark as queried
      }
    } catch (error) {
      console.error(
        `Error processing ${aggregatorInterfaceName} LLMInterface.sendMessage:`,
        error,
      );
    }
  }

  console.log(aggregatorResponse.length);
  console.log();
}

exampleUsage();
