/**
 * @file test/simple/goose.test.js
 * @description Simplified tests for the Goose AI API client.
 */

const Goose = require('../../src/interfaces/goose.js');
const { gooseApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../utils/defaults.js');
describe('Goose Simple', () => {
  if (gooseApiKey) {
    let response;
    test('API Key should be set', async () => {
      expect(typeof gooseApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const goose = new Goose(gooseApiKey);

      response = await goose.sendMessage(simplePrompt, options);

      expect(typeof response).toBe('string');
    }, 30000);
    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
