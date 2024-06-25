/**
 * @file test/basic/mistralai.test.js
 * @description Tests for the MistralAI API client.
 */

const MistralAI = require('../../src/interfaces/mistralai.js');
const { mistralaiApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

describe('MistralAI Basic', () => {
  if (mistralaiApiKey) {
    let response;

    test('API Key should be set', async () => {
      expect(typeof mistralaiApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const mistral = new MistralAI(mistralaiApiKey);
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
        throw new Error(`Test failed: ${safeStringify(error)}`);
      }
    }, 30000);

    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
