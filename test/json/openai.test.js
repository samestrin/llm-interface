/**
 * @file test/json/openai.test.js
 * @description Tests for the OpenAI API client JSON output.
 */

const OpenAI = require('../../src/interfaces/openai.js');
const { openaiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');

describe('OpenAI JSON', () => {
  if (openaiApiKey) {
    test('API Key should be set', async () => {
      expect(typeof openaiApiKey).toBe('string');
    });

    test('API Client should send a message and receive a JSON response', async () => {
      const openai = new OpenAI(openaiApiKey);
      const message = {
        model: 'gpt-3.5-turbo',
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
      const response = await openai.sendMessage(message, {
        max_tokens: options.max_tokens * 2,
        response_format: 'json_object',
      });

      expect(typeof response).toStrictEqual('object');
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
