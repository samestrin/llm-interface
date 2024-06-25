/**
 * @file test/simple/watsonxai.test.js
 * @description Simplified tests for the watsonx.ai API client.
 */

const watsonxai = require('../../src/interfaces/watsonxai.js');
const {
  watsonxaiApiKey,
  watsonxaiProjectId,
} = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

describe('watsonx.ai Simple', () => {
  if (watsonxaiApiKey) {
    let response;
    test('API Key should be set', async () => {
      expect(typeof watsonxaiApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const watsonx = new watsonxai(watsonxaiApiKey, watsonxaiProjectId);

      try {
        response = await watsonx.sendMessage(simplePrompt, options);
      } catch (error) {
        throw new Error(`Test failed: ${safeStringify(error)}`);
      }
      expect(typeof response).toStrictEqual('object');
    }, 30000);

    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
