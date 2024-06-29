/**
 * @file test/simple/aimlapi.test.js
 * @description Simplified tests for the AIMLAPI AI API client.
 */

const AIMLAPI = require('../../src/interfaces/aimlapi.js');
const { aimlapiApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

describe('AIMLAPI Simple', () => {
  if (aimlapiApiKey) {
    let response;
    test('API Key should be set', () => {
      expect(typeof aimlapiApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const aimlapi = new AIMLAPI(aimlapiApiKey);
      try {
        response = await aimlapi.sendMessage(simplePrompt, options);
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
