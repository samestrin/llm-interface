/**
 * @file perplexity.test.js
 * @description Simplified tests for the Perplexity API client.
 */

const Perplexity = require('../../src/interfaces/perplexity.js');
const { perplexityApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
describe('Perplexity Simple', () => {
  if (perplexityApiKey) {
    let response;
    test('API Key should be set', () => {
      expect(typeof perplexityApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const perplixity = new Perplexity(perplexityApiKey);

      response = await perplixity.sendMessage(simplePrompt, options);

      expect(typeof response).toStrictEqual('object');
    });
    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
