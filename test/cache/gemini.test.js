/**
 * @file test/cache/gemini.test.js
 * @description Tests for the caching mechanism in the Gemini class.
 */

const Gemini = require('../../src/interfaces/gemini.js');
const { geminiApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { getFromCache, saveToCache } = require('../../src/utils/cache.js');
const suppressLogs = require('../../src/utils/suppressLogs.js');
jest.mock('../../src/utils/cache.js');

describe('Gemini Caching', () => {
  if (geminiApiKey) {
    const gemini = new Gemini(geminiApiKey);

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
      });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('API Key should be set', async () => {
      expect(typeof geminiApiKey).toBe('string');
    });

    test('API should return cached response if available', async () => {
      const cachedResponse = 'Cached response';
      getFromCache.mockReturnValue(cachedResponse);

      const response = await gemini.sendMessage(
        message,
        { ...options },
        { cacheTimeoutSeconds: 60 },
      );

      expect(getFromCache).toHaveBeenCalledWith(createCacheKey(100));
      expect(response).toStrictEqual(cachedResponse);
      expect(saveToCache).not.toHaveBeenCalled();
    });

    test('API should save response to cache if not cached', async () => {
      getFromCache.mockReturnValue(null);

      const apiResponse = 'API response';
      const genAI = {
        getGenerativeModel: jest.fn().mockReturnValue({
          startChat: jest.fn().mockReturnValue({
            sendMessage: jest.fn().mockResolvedValue({
              response: { text: jest.fn().mockResolvedValue(apiResponse) },
            }),
          }),
        }),
      };
      gemini.genAI = genAI;

      const response = await gemini.sendMessage(
        message,
        { ...options },
        { cacheTimeoutSeconds: 60 },
      );

      expect(getFromCache).toHaveBeenCalledWith(createCacheKey(100));
      expect(response.results).toBe(apiResponse);
      expect(saveToCache).toHaveBeenCalledWith(
        createCacheKey(100),
        { results: apiResponse },
        60,
      );
    });

    test(
      'Should respond with prompt API error messaging',
      suppressLogs(async () => {
        getFromCache.mockReturnValue(null);
        const apiError = new Error('API error');
        const genAI = {
          getGenerativeModel: jest.fn().mockReturnValue({
            startChat: jest.fn().mockReturnValue({
              sendMessage: jest.fn().mockRejectedValue(apiError),
            }),
          }),
        };
        gemini.genAI = genAI;

        await expect(
          gemini.sendMessage(
            message,
            { ...options },
            { cacheTimeoutSeconds: 60 },
          ),
        ).rejects.toThrow('API error');

        expect(getFromCache).toHaveBeenCalledWith(createCacheKey(100));
        expect(saveToCache).not.toHaveBeenCalled();
      }),
    );
  } else {
    test.skip(`${module} API Key is not set`, () => {});
  }
});
