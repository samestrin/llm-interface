/**
 * @file test/simple/ai21.test.js
 * @description Simplified tests for the AI21 AI API client.
 */

const AI21 = require('../../src/interfaces/ai21.js');
const { ai21ApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');

describe('AI21 Simple', () => {
  if (ai21ApiKey) {
    let response;
    test('API Key should be set', () => {
      expect(typeof ai21ApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const ai21 = new AI21(ai21ApiKey);
      response = await ai21.sendMessage(simplePrompt, options);

      expect(typeof response).toStrictEqual('object');
    });
    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
