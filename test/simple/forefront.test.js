/**
 * @file test/simple/forefront.test.js
 * @description Simplified tests for the Forefront AI API client.
 */

const Forefront = require('../../src/interfaces/forefront.js');
const { forefrontApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

describe('Forefront Simple', () => {
  if (forefrontApiKey) {
    let response;
    test('API Key should be set', () => {
      expect(typeof forefrontApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const forefront = new Forefront(forefrontApiKey);
      try {
        response = await forefront.sendMessage(simplePrompt, options);
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
