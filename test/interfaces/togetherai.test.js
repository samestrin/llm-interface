/**
 * @file test/interfaces/deepinfra.test.js
 * @description Tests for the DeepInfra API client.
 */

const TogetherAI = require('../../src/interfaces/togetherai.js');
const { togetheraiApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

describe('TogetherAI Basic', () => {
  if (togetheraiApiKey) {
    let response;

    test('API Key should be set', () => {
      expect(typeof togetheraiApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const togetherai = new TogetherAI(togetheraiApiKey);
      const message = {
        model: 'Qwen/Qwen1.5-0.5B-Chat',
        messages: [
          {
            role: 'user',
            content: simplePrompt,
          },
        ],
      };

      try {
        response = await togetherai.sendMessage(message, options);
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
