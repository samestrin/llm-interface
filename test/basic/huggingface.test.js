/**
 * @file test/basic/huggingface.test.js
 * @description Tests for the Hugging Face Inference API client.
 */

const HuggingFace = require('../../src/interfaces/huggingface.js');
const { huggingfaceApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');

describe('HuggingFace Basic', () => {
  if (huggingfaceApiKey) {
    let response;

    test('API Key should be set', async () => {
      expect(typeof huggingfaceApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const huggingface = new HuggingFace(huggingfaceApiKey);
      const message = {
        model: 'meta-llama/Meta-Llama-3-8B-Instruct',
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
      try {
        response = await huggingface.sendMessage(message, options);

        expect(typeof response).toStrictEqual('object');
      } catch (error) {
        console.error('Test failed:', error);
        throw error;
      }
    }, 30000);

    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`API Key is not set`, () => {});
  }
});
