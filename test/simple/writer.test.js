/**
 * @file test/simple/writer.test.js
 * @description Simplified tests for the Writer API client.
 */

const Writer = require('../../src/interfaces/writer.js');
const { writerApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

describe('Writer Simple', () => {
  if (writerApiKey) {
    let response;
    test('API Key should be set', async () => {
      expect(typeof writerApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const writer = new Writer(writerApiKey);

      try {
        response = await writer.sendMessage(simplePrompt, options);
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
