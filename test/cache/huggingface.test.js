/**
 * @file test/cache/huggingface.test.js
 * @description Tests for the caching mechanism in the Hugging Face class.
 */

const HuggingFace = require('../../src/interfaces/huggingface.js');
const { huggingfaceApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { getFromCache, saveToCache } = require('../../src/utils/cache.js');
const suppressLogs = require('../../src/utils/suppressLogs.js');
jest.mock('../../src/utils/cache.js');

describe('HuggingFace Caching', () => {
  if (huggingfaceApiKey) {
    const huggingface = new HuggingFace(huggingfaceApiKey);

    const message = {
      model: 'gpt2',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: simplePrompt,
        },
      ],
    };

    const max_tokens = options.max_tokens;
    const payload = {
      model: message.model,
      messages: message.messages,
      parameters: { max_token: max_tokens },
    };

    const cacheKey = JSON.stringify(payload);

    const mockResponse = [{ generated_text: simplePrompt }];

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('API Key should be set', async () => {
      expect(typeof huggingfaceApiKey).toBe('string');
    });

    test('API should return cached response if available', async () => {
      getFromCache.mockReturnValue(mockResponse[0].generated_text);
      const testOptions = { ...options };
      const response = await huggingface.sendMessage(message, testOptions, {
        cacheTimeoutSeconds: 60,
      });

      expect(getFromCache).toHaveBeenCalledWith(cacheKey);
      expect(response).toStrictEqual(mockResponse[0].generated_text);
      expect(saveToCache).not.toHaveBeenCalled();
    });

    test('API should save response to cache if not cached', async () => {
      const testOptions = { ...options };

      getFromCache.mockReturnValue(null);

      const apiResponse = 'API response';
      huggingface.client.post = jest.fn().mockResolvedValue({
        data: { choices: [{ message: { content: apiResponse } }] },
      });
      const response = await huggingface.sendMessage(message, testOptions, {
        cacheTimeoutSeconds: 60,
      });

      expect(getFromCache).toHaveBeenCalledWith(cacheKey);
      expect(response.results).toBe(apiResponse);
      expect(saveToCache).toHaveBeenCalledWith(
        cacheKey,
        { results: apiResponse },
        60,
      );
    });

    test(
      'Should respond with prompt API error messaging',
      suppressLogs(async () => {
        const testOptions = { ...options };
        getFromCache.mockReturnValue(null);
        huggingface.client.post = jest
          .fn()
          .mockRejectedValue(new Error('API error'));

        await expect(
          huggingface.sendMessage(message, testOptions, {
            cacheTimeoutSeconds: 60,
          }),
        ).rejects.toThrow('API error');

        expect(getFromCache).toHaveBeenCalledWith(cacheKey);
        expect(saveToCache).not.toHaveBeenCalled();
      }),
    );
  } else {
    test.skip(`${module} API Key is not set`, () => {});
  }
});
