/**
 * @file examples/simple-moa.js
 * @description Example showing Mixture of Agents (MoA) concept (https://www.together.ai/blog/together-moa) to improve response quality. In this example three LLM providers. Gemini is used as
 * the Proposer and the Aggregator. Gemini, Hugging Face, and Groq are used as the Agents. The Proposer attempts to breakdown a prompt into supporting questions, then the Agents answer the questions,
 * and the Aggregator synthesizes a final response. Upon completion of synthesis, a control response is requested from Gemini. Then finally Gemini is used to evaluate the differences between both
 * responses and provide a report.  The example can be run in two modes, 'fast' or 'comprehensive'; in 'fast' mode the questions are spread across the LLM providers, in 'comprehensive' mode, every
 * LLM provider must answer every question. The number of questions can vary, which may require multiple Agent requests. To run this example you will need to install "npm markdown-to-text" which
 * is used to clean-up the LLM markdown responses.
 */

const { LLMInterface } = require('../../src/index.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const removeMarkdown = require('markdown-to-text');

require('dotenv').config({ path: '../../.env' });

// Setup your key and interface
LLMInterface.setApiKey({
  huggingface: process.env.HUGGINGFACE_API_KEY,
  groq: process.env.GROQ_API_KEY,
  gemini: process.env.GEMINI_API_KEY,
});

/**
 * Function to get the proposer response.
 * @returns {Promise<Array<string>|boolean>} Array of questions or false in case of error.
 */
async function getProposerResponse() {
  const proposerPrompt = `Consider this prompt "${simplePrompt}" carefully. What questions would you ask yourself in order to answer my prompt? Show me just the questions.

Provide the response as a JSON object; before responding with the object make sure it is valid JSON. Compress the response to save space.

Follow this output format, only responding with the JSON object and nothing else:

[questions: [{ question: 'What are LLMs?' },{ question: 'What is latency?' }]`;

  console.log('Prompt:');
  console.log(`> ${proposerPrompt.replaceAll('\n', '\n> ')}`);
  console.log();

  try {
    const proposerResponse = await LLMInterface.sendMessage(
      'gemini',
      proposerPrompt,
      {
        max_tokens: 4096 * 4, // needs to be large enough for the response
        model: 'default',
        response_format: 'json_object',
      },
      { attemptJsonRepair: true, cacheTimeoutSeconds: 86400, retryAttempts: 3 },
    );

    console.log('Proposer Result:');

    let results;
    if (
      proposerResponse.results.questions &&
      Array.isArray(proposerResponse.results.questions)
    ) {
      results = proposerResponse.results.questions;
    } else if (
      proposerResponse.results &&
      Array.isArray(proposerResponse.results)
    ) {
      results = proposerResponse.results;
    }

    if (results) {
      const questionsArray = results.map((q) => q.question);
      const questionsString = questionsArray.join('\n');
      console.log(`> ${questionsString.replaceAll('\n', '\n> ')}`);
      return questionsArray;
    } else {
      console.log('ERROR');
      return false;
    }
  } catch (error) {
    console.error('Error processing Proposer LLMInterface.sendMessage:', error);
    return '';
  }
}

/**
 * Function to compare responses.
 * @param {string} firstResponse - The first response to compare.
 * @param {string} secondResponse - The second response to compare.
 * @returns {Promise<boolean|string>} Comparison result or false in case of error.
 */
async function compareResponses(firstResponse, secondResponse) {
  const comparisonPrompt = `Consider this prompt "${simplePrompt}" carefully. I have two possible answers. I'd like you to evaluate each and give me a report comparing and contrasting the differences, and rating the quality in accuracy and comprehensiveness.

## Final Aggregated Response
${firstResponse}

## Control Response
${secondResponse}
    `;

  try {
    const comparisonResponse = await LLMInterface.sendMessage(
      'gemini',
      comparisonPrompt,
      {
        max_tokens: 4096 * 4, // needs to be large enough for the response
        model: 'default',
      },
      { cacheTimeoutSeconds: 86400, retryAttempts: 3 },
    );

    if (comparisonResponse.results) {
      console.log(
        `> ${removeMarkdown.default(comparisonResponse.results).replaceAll('\n', '\n> ')}`,
      );
    } else {
      console.log('[error: comparison failed]');
      return false;
    }
  } catch (error) {
    console.error(
      'Error processing Comparison LLMInterface.sendMessage:',
      error,
    );
    return '';
  }
}

/**
 * Function to process each MoA query.
 * @param {string} moaInterfaceName - The name of the MoA interface.
 * @param {string} question - The question to query.
 * @returns {Promise<string|null>} Response result or null in case of error.
 */
async function getMoaResponse(moaInterfaceName, question) {
  try {
    console.log(`[Querying ${moaInterfaceName} for question: "${question}".]`);
    const moaPrompt = `Given the prompt "${simplePrompt}"

Answer the following question: "${question}"

Provide concise, factual answers; double check your response before sending them using multiple sources to prevent hallucinations.`;

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

/**
 * Function to limit concurrency.
 * @param {Array<Function>} tasks - The array of tasks to execute.
 * @param {number} limit - The concurrency limit.
 * @returns {Promise<Array>} The results of the executed tasks.
 */
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

/**
 * Function to get MoA responses for all questions in fast mode.
 * Each provider answers a different question, cycling through providers.
 * @param {Array<string>} moas - The array of MoA interface names.
 * @param {Array<string>} questions - The array of questions.
 * @param {number} max_concurrent_moas - The maximum number of concurrent MoA queries.
 * @returns {Promise<Array<string>>} The array of MoA responses.
 */
async function getMoaResponsesFast(moas, questions, max_concurrent_moas) {
  const moaTasks = questions.map((question, index) => {
    const moaInterfaceName = moas[index % moas.length];
    return () => getMoaResponse(moaInterfaceName, question);
  });

  const moaResponses = await limitConcurrency(moaTasks, max_concurrent_moas);

  return moaResponses.filter((response) => response !== null);
}

/**
 * Function to get MoA responses for all questions in fast mode.
 * @param {Array<string>} moas - The array of MoA interface names.
 * @param {Array<string>} questions - The array of questions.
 * @param {number} max_concurrent_moas - The maximum number of concurrent MoA queries.
 * @returns {Promise<Array<string>>} The array of MoA responses.
 */
async function getMoaResponsesComprehensive(
  moas,
  questions,
  max_concurrent_moas,
) {
  const moaTasks = questions.flatMap((question) =>
    moas.map(
      (moaInterfaceName) => () => getMoaResponse(moaInterfaceName, question),
    ),
  );

  const moaResponses = await limitConcurrency(moaTasks, max_concurrent_moas);

  return moaResponses.filter((response) => response !== null);
}

/**
 * Function to get the aggregator response.
 * @param {Array<string>} moaResponses - The array of MoA responses.
 * @returns {Promise<string>} The aggregated response.
 */
async function getAggregatorResponse(moaResponses) {
  const aggregatorPrompt = `Synthesize a single high quality answer for the prompt "${simplePrompt}" based on:

${moaResponses.join('\n\n')}`;

  try {
    const aggregatorResponse = await LLMInterface.sendMessage(
      'gemini',
      aggregatorPrompt,
      {
        model: 'large',
        max_tokens: 2048,
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

/**
 * Function to get the control response.
 * @returns {Promise<string>} The control response.
 */
async function getControlResponse() {
  try {
    const controlResponse = await LLMInterface.sendMessage(
      'gemini',
      simplePrompt,
      {
        model: 'large',
        max_tokens: 2048,
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
 * @param {string} [mode='fast'] - The mode of execution, either 'fast' or 'comprehensive'.
 * @param {number} [iterations=3] - The number of iterations for comprehensive mode.
 * @returns {Promise<void>}
 */
async function exampleUsage(mode = 'fast', iterations = 3) {
  console.log('Mixture of Agents (MoA):');
  console.log();

  const questionsArray = await getProposerResponse();
  if (!questionsArray) {
    return;
  }

  const moas = ['huggingface', 'groq', 'gemini'];
  const max_concurrent_moas = 2;

  let moaResponses = [];

  if (mode === 'fast') {
    moaResponses = await getMoaResponsesFast(
      moas,
      questionsArray,
      max_concurrent_moas,
    );
    console.log();
  } else if (mode === 'comprehensive') {
    console.log();
    console.log('Running in comprehensive mode:');
    moaResponses = await getMoaResponsesComprehensive(
      moas,
      questionsArray,
      max_concurrent_moas,
    );
    console.log();
  }

  const aggregatedFinalResponse = await getAggregatorResponse(moaResponses);
  if (aggregatedFinalResponse) {
    console.log();
    console.log('Final Aggregated Result:');
    console.log(
      `> ${removeMarkdown.default(aggregatedFinalResponse).replaceAll('\n', '\n> ')}`,
    );
  }

  const controlResponse = await getControlResponse();
  if (controlResponse) {
    console.log();
    console.log('Control Result:');
    console.log(
      removeMarkdown.default(controlResponse).replaceAll('\n', '\n> '),
    );
  }

  if (aggregatedFinalResponse && controlResponse) {
    console.log();
    console.log('Comparison Response:');
    compareResponses(aggregatedFinalResponse, controlResponse);
  }
}

exampleUsage('fast');
// or
// exampleUsage('comprehensive');
