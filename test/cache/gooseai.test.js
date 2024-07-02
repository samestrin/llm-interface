/**
 * @file test/cache/goose.test.js
 * @description Tests for the caching mechanism in the GooseAI class.
 */

const GooseAI = require('../../src/interfaces/gooseai.js');
const { gooseaiApiKey } = require('../../src/config/config.js');
const { simplePrompt, options } = require('../../src/utils/defaults.js');
const { CacheManager } = require('../../src/utils/cacheManager.js');
const suppressLogs = require('../../src/utils/suppressLogs.js');

// Mock the CacheManager methods
jest.mock('../../src/utils/cacheManager.js');

describe('GooseAI Cache Testing', () => {
  if (gooseaiApiKey) {
    const goose = new GooseAI(gooseaiApiKey);
    const max_tokens = options.max_tokens;
    const message = {
      model: 'gpt-neo-20b',
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
      model: message.model,
      max_tokens,
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('API Key should be set', async () => {
      expect(typeof gooseaiApiKey).toBe('string');
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

      const response = await goose.sendMessage(message, options, {
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
      goose.client.post = jest.fn().mockResolvedValue({
        data: { choices: [{ text: apiResponse }] },
      });

      const response = await goose.sendMessage(message, options, {
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
        goose.client.post = jest.fn().mockRejectedValue(new Error('API error'));

        await expect(
          goose.sendMessage(message, options, {
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
    test.skip('GooseAI API Key is not set', () => {});
  }
});
