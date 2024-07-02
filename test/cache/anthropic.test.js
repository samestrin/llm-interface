/**
 * @file test/cache/anthropic.test.js
 * @description Tests for the caching mechanism in the Anthropic class.
 */

const Anthropic = require('../../src/interfaces/anthropic.js');
const { anthropicApiKey } = require('../../src/config/config.js');

const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { CacheManager } = require('../../src/utils/cacheManager.js');
const suppressLogs = require('../../src/utils/suppressLogs.js');

// Mock the CacheManager methods
jest.mock('../../src/utils/cacheManager.js');

describe('Anthropic Cache Testing', () => {
  if (anthropicApiKey) {
    const anthropic = new Anthropic(anthropicApiKey);

    const message = {
      model: 'claude-3-opus-20240229',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: 'Explain the importance of low latency LLMs.',
        },
      ],
    };

    const max_tokens = options.max_tokens;

    // Convert the message structure for caching
    const convertedMessages = message.messages.map((msg, index) => {
      if (index === 0) {
        return { ...msg, role: 'user' };
      }
      if (msg.role === 'system') {
        return { ...msg, role: 'assistant' };
      }
      return { ...msg, role: index % 2 === 0 ? 'user' : 'assistant' };
    });

    const cacheKey = JSON.stringify({
      model: message.model,
      messages: convertedMessages,
      max_tokens: max_tokens,
    });

    const mockResponse = { results: simplePrompt };

    beforeEach(() => {
      jest.clearAllMocks();
      CacheManager.prototype.getFromCache.mockResolvedValue(mockResponse);
    });

    test('API Key should be set', async () => {
      expect(typeof anthropicApiKey).toBe('string');
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

      const response = await anthropic.sendMessage(message, options, {
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
      anthropic.anthropic.messages.create = jest.fn().mockResolvedValue({
        content: [{ text: apiResponse }],
      });

      const response = await anthropic.sendMessage(message, options, {
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
        anthropic.anthropic.messages.create = jest
          .fn()
          .mockRejectedValue(new Error('API error'));

        await expect(
          anthropic.sendMessage(message, options, {
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
    test.skip(`Anthropic API Key is not set`, () => {});
  }
});
