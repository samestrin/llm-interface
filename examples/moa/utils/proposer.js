/**
 * @file utils/proposer.js
 * @description Utility functions for getting the proposer response in the Mixture of Agents (MoA) example.
 */

const { LLMInterface } = require('../../../src/index.js');
const { simplePrompt } = require('../../../src/utils/defaults.js');
const { getModelByAlias } = require('../../../src/utils/config.js');
const { prettyText, GREEN, RESET } = require('../../../src/utils/utils.js');

/**
 * Function to get the proposer response.
 * @returns {Promise<Array<string>|boolean>} Array of questions or false in case of error.
 */
async function getProposerResponse(proposer) {
  const shortPrompt = `Consider this prompt "${simplePrompt}" carefully. What questions would you ask yourself in order to answer my prompt? Show me just the questions.`;
  const proposerPrompt = `${shortPrompt}

Provide the response as a JSON object; before responding with the object make sure it is valid JSON. Compress the response to save space.

Follow this output format, only responding with the JSON object and nothing else:

[questions: [{ question: 'What are LLMs?' },{ question: 'What is latency?' }]`;

  prettyText(
    `\n\n${GREEN}Get Proposer response using ${proposer} and ${getModelByAlias(
      proposer,
      'default',
    )}${RESET}\n\n`,
  );
  console.log(`${shortPrompt.replaceAll('\n', '\n> ')}\n`);

  try {
    const proposerResponse = await LLMInterface.sendMessage(
      proposer,
      proposerPrompt,
      {
        max_tokens: 4096 * 4, // needs to be large enough for the response
        model: 'default',
        response_format: 'json_object',
      },
      { attemptJsonRepair: true, cacheTimeoutSeconds: 86400, retryAttempts: 3 },
    );

    prettyText(`${GREEN}Proposer Response${RESET}\n\n`);

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
      return results;
    } else {
      console.log('Error: Proposer failed');
      return false;
    }
  } catch (error) {
    console.error('Error processing Proposer LLMInterface.sendMessage:', error);
    return '';
  }
}

module.exports = { getProposerResponse };
