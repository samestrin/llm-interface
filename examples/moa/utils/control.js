/**
 * @file utils/control.js
 * @description Utility functions for getting the control response in the Mixture of Agents (MoA) example.
 */

const { LLMInterface } = require('../../../src/index.js');
const { simplePrompt } = require('../../../src/utils/defaults.js');

/**
 * Function to get the control response.
 * @returns {Promise<string>} The control response.
 */
async function getControlResponse(control) {
  try {
    const controlResponse = await LLMInterface.sendMessage(
      control,
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

module.exports = { getControlResponse };
