/**
 * @file test/simple/anthropic.test.js
 * @description Simplified tests for the Anthropic API client.
 */

const Anthropic = require('../../src/interfaces/anthropic.js');
const { anthropicApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
describe('Anthropic Simple', () => {
  if (anthropicApiKey) {
    let response;
    test('Anthropic API Key should be set', async () => {
      expect(typeof anthropicApiKey).toBe('string');
    });

    test('Anthropic API Client should send a message and receive a response', async () => {
      const anthropic = new Anthropic(anthropicApiKey);

      try {
        response = await anthropic.sendMessage(simplePrompt, options);
        expect(typeof response).toStrictEqual('object');
      } catch (error) {
        throw new Error(`Test failed: ${error}`);
      }
    }, 30000);
    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
