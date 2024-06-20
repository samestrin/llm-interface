/**
 * @file test/basic/perplexity.test.js
 * @description Tests for the Perplexity API client.
 */

const Perplexity = require('../../src/interfaces/perplexity.js');
const { perplexityApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
describe('Perplexity Basic', () => {
  if (perplexityApiKey) {
    let response;

    test('API Key should be set', () => {
      expect(typeof perplexityApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const perplixity = new Perplexity(perplexityApiKey);
      const message = {
        model: 'llama-3-sonar-small-32k-online',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.',
          },
          {
            role: 'user',
            content: simplePrompt,
          },
        ],
      };
      response = await perplixity.sendMessage(message, options);

      expect(typeof response).toStrictEqual('object');
    });

    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
