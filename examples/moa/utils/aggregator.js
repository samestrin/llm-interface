/**
 * @file utils/aggregator.js
 * @description Utility functions for getting the aggregator response in the Mixture of Agents (MoA) example.
 */

const { LLMInterface } = require('../../../src/index.js');
const { simplePrompt } = require('../../../src/utils/defaults.js');

/**
 * Function to get the aggregator response.
 * @param {Array<string>} moaResponses - The array of MoA responses.
 * @returns {Promise<string>} The aggregated response.
 */
async function getAggregatorResponse(moaResponses, aggregator) {
  const shortPrompt = `Synthesize a single high quality answer for the prompt "${simplePrompt}"`;
  const aggregatorPrompt = `${shortPrompt} based on:
  
${moaResponses.join('\n\n')}`;

  try {
    const aggregatorResponse = await LLMInterface.sendMessage(
      aggregator,
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

module.exports = { getAggregatorResponse };
