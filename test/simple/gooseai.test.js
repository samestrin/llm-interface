/**
 * @file test/simple/goose.test.js
 * @description Simplified tests for the Goose AI API client.
 */

const GooseAI = require('../../src/interfaces/gooseai.js');
const { gooseaiApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
describe('GooseAI Simple', () => {
  if (gooseaiApiKey) {
    let response;
    test('API Key should be set', async () => {
      expect(typeof gooseaiApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const goose = new GooseAI(gooseaiApiKey);

      response = await goose.sendMessage(simplePrompt, options);

      expect(typeof response).toStrictEqual('object');
    }, 30000);
    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
