/**
 * @file test/simple/replicate.test.js
 * @description Simplified tests for the Replicate API client.
 */

const Replicate = require('../../src/interfaces/replicate.js');
const { replicateApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

describe('Replicate Simple', () => {
  if (replicateApiKey) {
    let response;
    test('API Key should be set', () => {
      expect(typeof replicateApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const replicate = new Replicate(replicateApiKey);
      try {
        response = await replicate.sendMessage(simplePrompt, options);
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
