/**
 * @file test/cache/mistralai.test.js
 * @description Tests for the caching mechanism in the MistralAI class.
 */

const MistralAI = require('../../src/interfaces/mistralai.js');
const { mistralaiApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { getFromCache, saveToCache } = require('../../src/utils/cache.js');
const suppressLogs = require('../../src/utils/suppressLogs.js');
jest.mock('../../src/utils/cache.js');

describe('MistralAI Caching', () => {
  if (mistralaiApiKey) {
    const mistralai = new MistralAI(mistralaiApiKey);

    const message = {
      model: 'mistralai-1.0',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: simplePrompt,
        },
      ],
    };

    // Convert the message structure for caching
    const cacheKey = JSON.stringify({
      requestBody: {
        model: message.model,
        messages: message.messages,
        max_tokens: options.max_tokens,
      },
      interfaceOptions: { cacheTimeoutSeconds: 60 },
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('API Key should be set', async () => {
      expect(typeof mistralaiApiKey).toBe('string');
    });

    test('API should return cached response if available', async () => {
      const cachedResponse = 'Cached response';
      getFromCache.mockReturnValue(cachedResponse);

      const response = await mistralai.sendMessage(message, options, {
        cacheTimeoutSeconds: 60,
      });

      expect(getFromCache).toHaveBeenCalledWith(cacheKey);
      expect(response).toStrictEqual(cachedResponse);
      expect(saveToCache).not.toHaveBeenCalled();
    });

    test('API should save response to cache if not cached', async () => {
      getFromCache.mockReturnValue(null);

      const apiResponse = 'API response';
      mistralai.client.post = jest.fn().mockResolvedValue({
        data: { choices: [{ message: { content: apiResponse } }] },
      });

      const response = await mistralai.sendMessage(message, options, {
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
        getFromCache.mockReturnValue(null);
        mistralai.client.post = jest
          .fn()
          .mockRejectedValue(new Error('API error'));

        await expect(
          mistralai.sendMessage(message, options, {
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
