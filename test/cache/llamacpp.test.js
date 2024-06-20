/**
 * @file test/cache/llamacpp.test.js
 * @description Tests for the caching mechanism in the LlamaCPP class.
 */

const LlamaCPP = require('../../src/interfaces/llamacpp.js');
const { llamaURL } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { getFromCache, saveToCache } = require('../../src/utils/cache.js');
const suppressLogs = require('../../src/utils/suppressLogs.js');
jest.mock('../../src/utils/cache.js');

describe('LlamaCPP Caching', () => {
  if (llamaURL) {
    const llamacpp = new LlamaCPP(llamaURL);

    const message = {
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: simplePrompt,
        },
      ],
    };

    // Convert the message structure for caching
    const formattedPrompt = message.messages
      .map((message) => message.content)
      .join(' ');

    const cacheKey = JSON.stringify({
      prompt: formattedPrompt,
      n_predict: options.max_tokens,
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('URL should be set', async () => {
      expect(typeof llamaURL).toBe('string');
    });

    test('API should return cached response if available', async () => {
      const cachedResponse = 'Cached response';
      getFromCache.mockReturnValue(cachedResponse);

      const response = await llamacpp.sendMessage(message, options, {
        cacheTimeoutSeconds: 60,
      });

      expect(getFromCache).toHaveBeenCalledWith(cacheKey);
      expect(response).toStrictEqual(cachedResponse);
      expect(saveToCache).not.toHaveBeenCalled();
    });

    test('API should save response to cache if not cached', async () => {
      getFromCache.mockReturnValue(null);

      const apiResponse = 'API response';
      llamacpp.client.post = jest.fn().mockResolvedValue({
        data: { content: apiResponse },
      });

      const response = await llamacpp.sendMessage(message, options, {
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
        llamacpp.client.post = jest
          .fn()
          .mockRejectedValue(new Error('API error'));

        await expect(
          llamacpp.sendMessage(message, options, {
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
