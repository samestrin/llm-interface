/**
 * @file test/simple/deepseek.test.js
 * @description Simplified tests for the DeepSeek AI API client.
 */

const DeepSeek = require('../../src/interfaces/deepseek.js');
const { deepseekApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

describe('DeepSeek Simple', () => {
  if (deepseekApiKey) {
    let response;
    test('API Key should be set', () => {
      expect(typeof deepseekApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const deepseek = new DeepSeek(deepseekApiKey);
      try {
        response = await deepseek.sendMessage(simplePrompt, options);
      } catch (error) {
        throw new Error(`Test failed: ${safeStringify(error)}`);
      }
      expect(typeof response).toStrictEqual('object');
    });
    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => { });
  }
});
