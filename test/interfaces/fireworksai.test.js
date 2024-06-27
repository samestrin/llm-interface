/**
 * @file test/interfaces/fireworksai.test.js
 * @description Tests for the FireworksAI API client.
 */

const FireworksAI = require('../../src/interfaces/fireworksai.js');
const { fireworksaiApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

describe('FireworksAI Basic', () => {
  if (fireworksaiApiKey) {
    let response;

    test('API Key should be set', () => {
      expect(typeof fireworksaiApiKey).toBe('string');
    });
    jest;
    test('API Client should send a message and receive a response', async () => {
      const fireworks = new FireworksAI(fireworksaiApiKey);
      const message = {
        model: 'accounts/fireworks/models/phi-3-mini-128k-instruct',
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

      try {
        response = await fireworks.sendMessage(message, options);
      } catch (error) {
        throw new Error(`Test failed: ${safeStringify(error)}`);
      }
      expect(typeof response).toStrictEqual('object');
    });

    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
