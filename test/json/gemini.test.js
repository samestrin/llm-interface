/**
 * @file test/json/gemini.test.js
 * @description Tests for the Gemini API client JSON output.
 */

const { LLMInterface } = require('../../src/index.js');
const { geminiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt, options } = require('../../src/utils/defaults.js');
describe('Gemini JSON', () => {
  if (geminiApiKey) {
    test('API Key should be set', async () => {
      expect(typeof geminiApiKey).toBe('string');
    });

    test('API Client should send a message and receive a JSON response', async () => {
      const message = {
        model: 'gemini-1.5-flash',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.',
          },
          {
            role: 'user',
            content: `${simplePrompt} Limit the results to 2 items. Return the results as a JSON object. Follow this format: [{reason, reasonDescription}]`,
          },
        ],
      };
      const response = await LLMInterface.sendMessage(
        ['gemini', geminiApiKey],
        message,
        {
          max_tokens: options.max_tokens * 2,
          response_format: 'json_object',
        },
      );
      expect(typeof response).toStrictEqual('object');
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
