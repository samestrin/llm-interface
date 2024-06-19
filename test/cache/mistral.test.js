/**
 * @file test/cache/mistral.test.js
 * @description Tests for the caching mechanism in the Mistral class.
 */

const Mistral = require('../../src/interfaces/mistral');
const { mistralApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../utils/defaults.js');
const { getFromCache, saveToCache } = require('../../src/utils/cache.js');
const suppressLogs = require('../utils/suppressLogs.js');
jest.mock('../../src/utils/cache.js');

describe('Mistral Caching', () => {
  if (mistralApiKey) {
    const mistral = new Mistral(mistralApiKey);

    const message = {
      model: 'mistral-1.0',
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
      expect(typeof mistralApiKey).toBe('string');
    });

    test('API should return cached response if available', async () => {
      const cachedResponse = 'Cached response';
      getFromCache.mockReturnValue(cachedResponse);

      const response = await mistral.sendMessage(message, options, {
        cacheTimeoutSeconds: 60,
      });

      expect(getFromCache).toHaveBeenCalledWith(cacheKey);
      expect(response).toBe(cachedResponse);
      expect(saveToCache).not.toHaveBeenCalled();
    });

    test('API should save response to cache if not cached', async () => {
      getFromCache.mockReturnValue(null);

      const apiResponse = 'API response';
      mistral.client.post = jest.fn().mockResolvedValue({
        data: { choices: [{ message: { content: apiResponse } }] },
      });

      const response = await mistral.sendMessage(message, options, {
        cacheTimeoutSeconds: 60,
      });

      expect(getFromCache).toHaveBeenCalledWith(cacheKey);
      expect(response).toBe(apiResponse);
      expect(saveToCache).toHaveBeenCalledWith(cacheKey, apiResponse, 60);
    });
    test(
      'Should respond with prompt API error messaging',
      suppressLogs(async () => {
        getFromCache.mockReturnValue(null);
        mistral.client.post = jest
          .fn()
          .mockRejectedValue(new Error('API error'));

        await expect(
          mistral.sendMessage(message, options, {
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
