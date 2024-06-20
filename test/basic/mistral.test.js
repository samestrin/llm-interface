/**
 * @file test/basic/mistral.test.js
 * @description Tests for the Mistral API client.
 */

const Mistral = require('../../src/interfaces/mistral.js');
const { mistralApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
describe('Mistral Basic', () => {
  if (mistralApiKey) {
    let response;

    test('API Key should be set', async () => {
      expect(typeof mistralApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const mistral = new Mistral(mistralApiKey);
      const message = {
        model: 'mistral-large-latest',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          {
            role: 'user',
            content: simplePrompt,
          },
        ],
      };
      try {
        response = await mistral.sendMessage(message, options);

        expect(typeof response).toStrictEqual('object');
      } catch (error) {
        throw new Error(`Test failed: ${error}`);
      }
    }, 30000);

    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
