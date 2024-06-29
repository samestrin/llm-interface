/**
 * @file examples/simple-moa.js
 * @description Example showing Mixture of Agents (MoA) concept to improve response quality. (https://www.together.ai/blog/together-moa)
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

// Function to get the proposer response
async function getProposerResponse() {
  const proposerPrompt = `Given the prompt "${simplePrompt}" explain how you would respond, process wise. Show the process steps you could delegate while compressing the work into 3 steps, only include the brainstorming/research steps, not the answer.

Provide the response as a JSON object; before responding with the object make sure it is valid JSON. Compress the response to save space.

Follow this output format, only responding with the JSON object and nothing else:

[steps[{step}]`;

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
    const stepsString = jsonData.map((step) => step.step).join('\n\n');
    console.log(`> ${stepsString.replaceAll('\n\n', '\n>\n> ')}`);

    return stepsString;
  } catch (error) {
    console.error('Error processing Proposer LLMInterface.sendMessage:', error);
    return '';
  }
}

// Function to process each MoA query
async function getMoaResponse(moaInterfaceName, stepsString) {
  try {
    console.log(`- Querying ${moaInterfaceName}.`);
    const moaPrompt = `Given the prompt "${simplePrompt}"

${stepsString}
`;

    const response = await LLMInterface.sendMessage(
      moaInterfaceName,
      moaPrompt,
      { max_tokens: 2048, model: 'small' },
      { cacheTimeoutSeconds: 86400 },
    );

    return response.results;
  } catch (error) {
    console.error(
      `Error processing ${moaInterfaceName} LLMInterface.sendMessage:`,
      error,
    );
    return null;
  }
}

// Function to limit concurrency
async function limitConcurrency(tasks, limit) {
  const executing = new Set();
  const results = [];
  for (const task of tasks) {
    const p = task().then((result) => {
      executing.delete(p);
      results.push(result);
    });
    executing.add(p);
    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }
  await Promise.all(executing);
  return results;
}

// Function to get all MoA responses with concurrency limit
async function getMoaResponses(moas, stepsString, max_concurrent_moas) {
  const moaTasks = moas.map(
    (moaInterfaceName) => () => getMoaResponse(moaInterfaceName, stepsString),
  );

  const moaResponses = await limitConcurrency(moaTasks, max_concurrent_moas);

  return moaResponses.filter((response) => response !== null);
}

// Function to get the aggregator response
async function getAggregatorResponse(moaResponses) {
  const aggregatorPrompt = `Synthesize a single high quality answer for the prompt "${simplePrompt}" based on:

${moaResponses.join('\n\n')}`;

  try {
    const aggregatorResponse = await LLMInterface.sendMessage(
      'gemini',
      aggregatorPrompt,
      {
        model: 'small',
        max_tokens: 1024,
      },
      { cacheTimeoutSeconds: 86400 },
    );

    return aggregatorResponse.results;
  } catch (error) {
    console.error(
      'Error processing Aggregator LLMInterface.sendMessage:',
      error,
    );
    return '';
  }
}

// Function to get the control response
async function getControlResponse() {
  try {
    const controlResponse = await LLMInterface.sendMessage(
      'gemini',
      simplePrompt,
      {
        model: 'large',
        max_tokens: 1024,
      },
      { cacheTimeoutSeconds: 86400 },
    );

    return controlResponse.results;
  } catch (error) {
    console.error('Error processing Control LLMInterface.sendMessage:', error);
    return '';
  }
}

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  console.log('Mixture of Agents (MoA):');
  console.log();

  const stepsString = await getProposerResponse();
  if (!stepsString) {
    return;
  }

  const moas = ['huggingface', 'groq', 'gemini'];
  const max_concurrent_moas = 2;

  const moaResponses = await getMoaResponses(
    moas,
    stepsString,
    max_concurrent_moas,
  );
  console.log('MOA Result:');
  const aggregatorResponse = await getAggregatorResponse(moaResponses);
  if (aggregatorResponse) {
    console.log(`> ${aggregatorResponse.replaceAll('\n\n', '\n>\n> ')}`);
  }

  console.log();
  const controlResponse = await getControlResponse();
  if (controlResponse) {
    console.log('Control Result:');
    console.log(controlResponse);
  }
}

exampleUsage();
