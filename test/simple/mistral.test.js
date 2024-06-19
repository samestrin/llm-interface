/**
 * @file mistral.test.js
 * @description Simplified tests for the Mistral API client.
 */

const Mistral = require('../../src/interfaces/mistral.js');
const { mistralApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../utils/defaults.js');
describe('Mistral Simple', () => {
  if (mistralApiKey) {
    let response;
    test('API Key should be set', async () => {
      expect(typeof mistralApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const mistral = new Mistral(mistralApiKey);

      try {
        response = await mistral.sendMessage(simplePrompt, options);

        expect(typeof response).toBe('string');
      } catch (error) {
        throw new Error(`Test failed: ${error}`);
      }
    }, 30000);
    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
