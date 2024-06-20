/**
 * @file test/basic/cloudflareai.test.js
 * @description Tests for the CloudflareAI API client.
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

describe('CloudflareAI Basic', () => {
  if (cloudflareaiApiKey) {
    let response;

    test('API Key should be set', () => {
      expect(typeof cloudflareaiApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const cloudflareai = new CloudflareAI(
        cloudflareaiApiKey,
        cloudflareaiAccountId,
      );
      const message = {
        model: '@cf/meta/llama-3-8b-instruct', // Replace with the appropriate model name
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.',
          },
          {
            role: 'user',
            content: simplePrompt,
          },
        ],
      };

      response = await cloudflareai.sendMessage(message, options);

      expect(typeof response).toStrictEqual('object');
    }, 30000);

    test(`Response should be less than ${expectedMaxLength} characters`, () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
