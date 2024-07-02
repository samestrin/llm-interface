/**
 * @file test/cache/cohere.test.js
 * @description Tests for the caching mechanism in the Cohere class.
 */

const Cohere = require('../../src/interfaces/cohere.js');
const { cohereApiKey } = require('../../src/config/config.js');
const { simplePrompt, options } = require('../../src/utils/defaults.js');
const { CacheManager } = require('../../src/utils/cacheManager.js');
const suppressLogs = require('../../src/utils/suppressLogs.js');

// Mock the CacheManager methods
jest.mock('../../src/utils/cacheManager.js');

describe('Cohere Cache Testing', () => {
  if (cohereApiKey) {
    const cohere = new Cohere(cohereApiKey);

    const message = {
      model: 'command-r-plus',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: simplePrompt,
        },
      ],
    };

    // Convert the message structure for caching
    const chat_history = message.messages.slice(0, -1).map((msg) => ({
      role: msg.role === 'user' ? 'USER' : 'CHATBOT',
      message: msg.content,
    }));
    const current_message =
      message.messages[message.messages.length - 1].content;

    const cacheKey = JSON.stringify({
      chat_history:
        chat_history.length > 0
          ? chat_history
          : [{ role: 'USER', message: '' }],
      message: current_message,
      model: message.model,
      max_tokens: options.max_tokens,
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('API Key should be set', async () => {
      expect(typeof cohereApiKey).toBe('string');
    });

    test('Verify CacheManager methods are mocked', async () => {
      expect(CacheManager.prototype.getFromCache).toBeDefined();
      expect(CacheManager.prototype.saveToCache).toBeDefined();
      expect(jest.isMockFunction(CacheManager.prototype.getFromCache)).toBe(
        true,
      );
      expect(jest.isMockFunction(CacheManager.prototype.saveToCache)).toBe(
        true,
      );
    });

    test('API should return cached response if available', async () => {
      const cachedResponse = { results: 'Cached response' };
      CacheManager.prototype.getFromCache.mockResolvedValue(cachedResponse);

      const response = await cohere.sendMessage(message, options, {
        cacheTimeoutSeconds: 60,
      });

      expect(CacheManager.prototype.getFromCache).toHaveBeenCalledWith(
        cacheKey,
      );
      expect(response).toStrictEqual(cachedResponse);
      expect(CacheManager.prototype.saveToCache).not.toHaveBeenCalled();
    });

    test('API should save response to cache if not cached', async () => {
      CacheManager.prototype.getFromCache.mockResolvedValue(null);

      const apiResponse = 'API response';
      cohere.client.post = jest.fn().mockResolvedValue({
        data: { text: apiResponse },
      });

      const response = await cohere.sendMessage(message, options, {
        cacheTimeoutSeconds: 60,
      });

      expect(CacheManager.prototype.getFromCache).toHaveBeenCalledWith(
        cacheKey,
      );
      expect(response.results).toBe(apiResponse);
      expect(CacheManager.prototype.saveToCache).toHaveBeenCalledWith(
        cacheKey,
        { results: apiResponse },
        60,
      );
    });

    test(
      'Should respond with prompt API error messaging',
      suppressLogs(async () => {
        CacheManager.prototype.getFromCache.mockResolvedValue(null);
        cohere.client.post = jest
          .fn()
          .mockRejectedValue(new Error('API error'));

        await expect(
          cohere.sendMessage(message, options, {
            cacheTimeoutSeconds: 60,
          }),
        ).rejects.toThrow('API error');

        expect(CacheManager.prototype.getFromCache).toHaveBeenCalledWith(
          cacheKey,
        );
        expect(CacheManager.prototype.saveToCache).not.toHaveBeenCalled();
      }),
    );
  } else {
    test.skip('Cohere API Key is not set', () => {});
  }
});
