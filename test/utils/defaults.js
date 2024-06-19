/**
 * @file test/utils/defaults.js
 * @description Test case variables
 */

// Make sure to scale your options.max_tokens and expectedMaxLength values accordingly
// to avoid accidentally failing the:
//    `Response should be less than ${expectedMaxLength} characters` Test

const simplePrompt = 'Explain the importance of low latency LLMs.';
const options = {
  max_tokens: 100,
};
const expectedMaxLength = 1024;

module.exports = {
  simplePrompt,
  options,
  expectedMaxLength,
};
