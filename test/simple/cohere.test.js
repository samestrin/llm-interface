/**
 * @file test/simple/cohere.test.js
 * @description Simplified tests for the Cohere API client.
 */

const Cohere = require('../../src/interfaces/cohere.js');
const { cohereApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../utils/defaults.js');
describe('Cohere Simple', () => {
  if (cohereApiKey) {
    let response;
    test('API Key should be set', async () => {
      expect(typeof cohereApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const cohere = new Cohere(cohereApiKey);

      response = await cohere.sendMessage(simplePrompt, options);

      expect(typeof response).toBe('string');
    }, 30000);

    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
