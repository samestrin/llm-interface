/**
 * @file test/cache/reka.test.js
 * @description Tests for the caching mechanism in the RekaAI class.
 */

const RekaAI = require('../../src/interfaces/rekaai.js');
const { rekaaiApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { getFromCache, saveToCache } = require('../../src/utils/cache.js');
const suppressLogs = require('../../src/utils/suppressLogs.js');
jest.mock('../../src/utils/cache.js');

// Helper function to convert system roles to assistant roles
const convertSystemToAssistant = (messages) => {
  return messages.map((message) => {
    if (message.role === 'system') {
      return { ...message, role: 'assistant' };
    }
    return message;
  });
};

describe('RekaAI Caching', () => {
  if (rekaaiApiKey) {
    const reka = new RekaAI(rekaaiApiKey);

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
    const cacheKey = JSON.stringify({
      messages: convertSystemToAssistant(message.messages),
      model: message.model,
      max_tokens: options.max_tokens,
      stream: false,
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('API Key should be set', async () => {
      expect(typeof rekaaiApiKey).toBe('string');
    });

    test('API should return cached response if available', async () => {
      const cachedResponse = { results: 'Cached response' };
      getFromCache.mockReturnValue(cachedResponse);

      const response = await reka.sendMessage(message, options, {
        cacheTimeoutSeconds: 60,
      });

      expect(getFromCache).toHaveBeenCalledWith(cacheKey);
      expect(response).toStrictEqual(cachedResponse);
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
