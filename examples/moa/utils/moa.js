/**
 * @file utils/moa.js
 * @description Utility functions for processing MoA queries and handling concurrency in the Mixture of Agents (MoA) example.
 */

const { LLMInterface } = require('../../../src/index.js');
const { simplePrompt } = require('../../../src/utils/defaults.js');
const { getModelByAlias } = require('../../../src/utils/config.js');
const { prettyText, YELLOW, RESET } = require('../../../src/utils/utils.js');

/**
 * Function to process each MoA query.
 * @param {string} moaInterfaceName - The name of the MoA interface.
 * @param {string} question - The question to query.
 * @returns {Promise<string|null>} Response result or null in case of error.
 */
async function getMoaResponse(moaInterfaceName, question) {
  prettyText(
    `${RESET}'${question}'${YELLOW} using ${moaInterfaceName} and ${getModelByAlias(
      moaInterfaceName,
      'small',
    )}${RESET}\n`,
  );
  try {
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
 * @param {Array<string>} moas - The array of MoA interfaceNamenames.
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
 * @param {Array<string>} moas - The array of MoA interfaceNamenames.
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

module.exports = {
  getMoaResponse,
  getMoaResponsesFast,
  getMoaResponsesComprehensive,
  limitConcurrency,
};
