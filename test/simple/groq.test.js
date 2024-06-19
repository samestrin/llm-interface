/**
 * @file test/simple/groq.test.js
 * @description Simplified tests for the Groq API client.
 */

const Groq = require('../../src/interfaces/groq.js');
const { groqApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../utils/defaults.js');
describe('Groq Simple', () => {
  if (groqApiKey) {
    let response;
    test('API Key should be set', async () => {
      expect(typeof groqApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const groq = new Groq(groqApiKey);

      response = await groq.sendMessage(simplePrompt, options);

      expect(typeof response).toBe('string');
    });
    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});