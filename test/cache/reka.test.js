/**
 * @file test/cache/reka.test.js
 * @description Tests for the caching mechanism in the Reka class.
 */

const Reka = require('../../src/interfaces/reka.js');
const { rekaApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../utils/defaults.js');
const { getFromCache, saveToCache } = require('../../src/utils/cache.js');
const suppressLogs = require('../utils/suppressLogs.js');
jest.mock('../../src/utils/cache.js');

describe('Reka Caching', () => {
  if (rekaApiKey) {
    const reka = new Reka(rekaApiKey);

    const message = {
      model: 'reka-core',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: simplePrompt,
        },
      ],
    };

    // Convert the message structure for caching
    const convertedMessages = message.messages.map((msg, index) => {
      if (msg.role === 'system') {
        return { ...msg, role: 'assistant' };
      }
      return { ...msg, role: 'user' };
    });

    const cacheKey = JSON.stringify({
      messages: convertedMessages,
      model: 'reka-core',
      max_tokens: options.max_tokens, // Include the default value for max_tokens
      stream: false,
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('API Key should be set', async () => {
      expect(typeof rekaApiKey).toBe('string');
    });

    test('API should return cached response if available', async () => {
      const cachedResponse = 'Cached response';
      getFromCache.mockReturnValue(cachedResponse);

      const response = await reka.sendMessage(message, options, {
        cacheTimeoutSeconds: 60,
      });

      expect(getFromCache).toHaveBeenCalledWith(cacheKey);
      expect(response).toBe(cachedResponse);
      expect(saveToCache).not.toHaveBeenCalled();
    });

    test('API should save response to cache if not cached', async () => {
      getFromCache.mockReturnValue(null);

      const apiResponse = 'API response';
      reka.client.post = jest.fn().mockResolvedValue({
        data: {
          responses: [
            { finish_reason: 'stop', message: { content: apiResponse } },
          ],
        },
      });

      const response = await reka.sendMessage(message, options, {
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
        reka.client.post = jest.fn().mockRejectedValue(new Error('API error'));

        await expect(
          reka.sendMessage(message, options, {
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
