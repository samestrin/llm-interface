/**
 * @file test/simple/deepinfra.test.js
 * @description Simplified tests for the DeepInfra AI API client.
 */

const DeepInfra = require('../../src/interfaces/deepinfra.js');
const { deepinfraApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

describe('DeepInfra Simple', () => {
  if (deepinfraApiKey) {
    let response;
    test('API Key should be set', () => {
      expect(typeof deepinfraApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const deepinfra = new DeepInfra(deepinfraApiKey);
      try {
        response = await deepinfra.sendMessage(simplePrompt, options);
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
