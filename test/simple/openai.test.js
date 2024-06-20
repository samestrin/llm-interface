/**
 * @file openai.test.js
 * @description Simplified tests for the OpenAI API client.
 */

const OpenAI = require('../../src/interfaces/openai.js');
const { openaiApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
describe('OpenAI Simple', () => {
  if (openaiApiKey) {
    let response;
    test('API Key should be set', async () => {
      expect(typeof openaiApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const openai = new OpenAI(openaiApiKey);

      response = await openai.sendMessage(simplePrompt, options);
      expect(typeof response).toStrictEqual('object');
    });
    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
