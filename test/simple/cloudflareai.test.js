/**
 * @file test/simple/cloudflareai.test.js
 * @description Simplified tests for the Cloudflare AI API client.
 */

const CloudflareAI = require('../../src/interfaces/cloudflareai.js');
const {
  cloudflareaiApiKey,
  cloudflareaiAccountId,
} = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

describe('Cloudflare AI Simple', () => {
  if (cloudflareaiApiKey) {
    let response;
    test('API Key should be set', async () => {
      expect(typeof cloudflareaiApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const cloudflareai = new CloudflareAI(
        cloudflareaiApiKey,
        cloudflareaiAccountId,
      );

      try {
        response = await cloudflareai.sendMessage(simplePrompt, options);
      } catch (error) {
        throw new Error(`Test failed: ${safeStringify(error)}`);
      }
      expect(typeof response).toStrictEqual('object');
    }, 30000);

    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
