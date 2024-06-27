/**
 * @file test/cache/openai.test.js
 * @description Tests for the caching mechanism in the OpenAI class.
 */

const OpenAI = require('../../src/interfaces/openai.js');
const { openaiApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { getFromCache, saveToCache } = require('../../src/utils/cache.js');
const suppressLogs = require('../../src/utils/suppressLogs.js');
jest.mock('../../src/utils/cache.js');

describe('OpenAI Caching', () => {
  if (openaiApiKey) {
    const openai = new OpenAI(openaiApiKey);

    const message = {
      model: 'davinci-002',
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
      model: message.model,
      messages: message.messages,
      max_tokens: options.max_tokens,
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('API Key should be set', async () => {
      expect(typeof openaiApiKey).toBe('string');
    });

    test('API should return cached response if available', async () => {
      const cachedResponse = 'Cached response';
      getFromCache.mockReturnValue(cachedResponse);

      const response = await openai.sendMessage(message, options, {
        cacheTimeoutSeconds: 60,
      });

      expect(getFromCache).toHaveBeenCalledWith(cacheKey);
      expect(response).toStrictEqual(cachedResponse);
      expect(saveToCache).not.toHaveBeenCalled();
    });

    test('API should save response to cache if not cached', async () => {
      getFromCache.mockReturnValue(null);

      const apiResponse = 'API response';
      openai.client.post = jest.fn().mockResolvedValue({
        data: { choices: [{ message: { content: apiResponse } }] },
      });

      const response = await openai.sendMessage(message, options, {
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
        openai.client.post = jest
          .fn()
          .mockRejectedValue(new Error('API error'));

        await expect(
          openai.sendMessage(message, options, {
            cacheTimeoutSeconds: 60,
          }),
        ).rejects.toThrow('API error');

        expect(getFromCache).toHaveBeenCalledWith(cacheKey);
        expect(saveToCache).not.toHaveBeenCalled(); // Corrected usage
      }),
    );
  } else {
    test.skip(`${module} API Key is not set`, () => {});
  }
});
