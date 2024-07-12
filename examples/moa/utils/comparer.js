/**
 * @file utils/comparer.js
 * @description Utility functions for comparing responses in the Mixture of Agents (MoA) example.
 */

const { LLMInterface } = require('../../../src/index.js');
const { simplePrompt } = require('../../../src/utils/defaults.js');

/**
 * Function to compare responses.
 * @param {string} firstResponse - The first response to compare.
 * @param {string} secondResponse - The second response to compare.
 * @returns {Promise<boolean|string>} Comparison result or false in case of error.
 */
async function compareResponses(firstResponse, secondResponse, comparer) {
  const shortPrompt = `Consider this simplePrompt "${simplePrompt}" carefully. I have two possible answers. I'd like you to evaluate each and give me a report comparing and contrasting the differences, and rating the quality in accuracy and comprehensiveness.`;
  const comparisonPrompt = `${shortPrompt} 

## Final Aggregated Response
${firstResponse}

## Control Response
${secondResponse}
    `;

  try {
    const comparisonResponse = await LLMInterface.sendMessage(
      comparer,
      comparisonPrompt,
      {
        max_tokens: 4096 * 4, // needs to be large enough for the response
        model: 'default',
      },
      { cacheTimeoutSeconds: 86400, retryAttempts: 3 },
    );

    if (comparisonResponse.results) {
      return comparisonResponse.results;
    } else {
      console.log('Error: Comparison failed');
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

module.exports = { compareResponses };
