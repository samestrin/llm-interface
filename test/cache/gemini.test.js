/**
 * @file test/cache/gemini.test.js
 * @description Tests for the caching mechanism in the Gemini class.
 */

const Gemini = require('../../src/interfaces/gemini.js');
const { geminiApiKey } = require('../../src/config/config.js');
const { simplePrompt, options } = require('../../src/utils/defaults.js');
const { CacheManager } = require('../../src/utils/cacheManager.js');
const suppressLogs = require('../../src/utils/suppressLogs.js');

// Mock the CacheManager methods
jest.mock('../../src/utils/cacheManager.js');

describe('Gemini Cache Testing', () => {
  if (geminiApiKey) {
    const gemini = new Gemini(geminiApiKey);

    const max_tokens = options.max_tokens;

    const message = {
      model: 'gemini-1.5-flash',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: simplePrompt,
        },
      ],
    };

    const createCacheKey = (maxTokens) =>
      JSON.stringify({
        model: message.model,
        history: [
          { role: 'user', parts: [{ text: 'You are a helpful assistant.' }] },
        ],
        prompt: simplePrompt,
        generationConfig: { maxOutputTokens: maxTokens },
        interfaceOptions: { cacheTimeoutSeconds: 60 },
      });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('API Key should be set', async () => {
      expect(typeof geminiApiKey).toBe('string');
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

      const cacheKey = createCacheKey(max_tokens);

      const response = await gemini.sendMessage(
        message,
        { ...options },
        {
          cacheTimeoutSeconds: 60,
        },
      );

      expect(CacheManager.prototype.getFromCache).toHaveBeenCalledWith(
        cacheKey,
      );
      expect(response).toStrictEqual(cachedResponse);
      expect(CacheManager.prototype.saveToCache).not.toHaveBeenCalled();
    });

    test('API should save response to cache if not cached', async () => {
      CacheManager.prototype.getFromCache.mockResolvedValue(null);

      const apiResponse = 'API response';
      gemini.genAI = {
        getGenerativeModel: jest.fn().mockReturnValue({
          startChat: jest.fn().mockReturnValue({
            sendMessage: jest.fn().mockResolvedValue({
              response: {
                text: jest.fn().mockResolvedValue(apiResponse),
              },
            }),
          }),
        }),
      };

      const cacheKey = createCacheKey(max_tokens);

      const response = await gemini.sendMessage(
        message,
        { ...options },
        {
          cacheTimeoutSeconds: 60,
        },
      );

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
        const apiError = new Error('API error');
        gemini.genAI = {
          getGenerativeModel: jest.fn().mockReturnValue({
            startChat: jest.fn().mockReturnValue({
              sendMessage: jest.fn().mockRejectedValue(apiError),
            }),
          }),
        };

        const cacheKey = createCacheKey(max_tokens);

        await expect(
          gemini.sendMessage(message, options, { cacheTimeoutSeconds: 60 }),
        ).rejects.toThrow('API error');

        expect(CacheManager.prototype.getFromCache).toHaveBeenCalledWith(
          cacheKey,
        );
        expect(CacheManager.prototype.saveToCache).not.toHaveBeenCalled();
      }),
    );
  } else {
    test.skip('Gemini API Key is not set', () => {});
  }
});
