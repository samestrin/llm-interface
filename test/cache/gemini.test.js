/**
 * @file test/cache/gemini.test.js
 * @description Tests for the caching mechanism in the Gemini class.
 */

const Gemini = require('../../src/interfaces/gemini.js');
const { geminiApiKey } = require('../../src/config/config.js');
const { getFromCache, saveToCache } = require('../../src/utils/cache.js');
jest.mock('../../src/utils/cache.js'); // Mock the cache module

describe('Gemini Caching', () => {
  const gemini = new Gemini(geminiApiKey);

  const message = {
    model: 'gemini-1.5-flash',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Explain the importance of low latency LLMs.' },
    ],
  };

  const options = { max_tokens: 100 };

  const createCacheKey = (maxTokens) =>
    JSON.stringify({
      model: 'gemini-1.5-flash',
      history: [
        { role: 'user', parts: [{ text: 'You are a helpful assistant.' }] },
      ],
      prompt: 'Explain the importance of low latency LLMs.',
      generationConfig: { maxOutputTokens: maxTokens },
    });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Gemini API Key should be set', async () => {
    expect(typeof geminiApiKey).toBe('string');
  });

  test('Gemini API should return cached response if available', async () => {
    const cachedResponse = 'Cached response';
    getFromCache.mockReturnValue(cachedResponse);

    const response = await gemini.sendMessage(message, { ...options }, 60);

    expect(getFromCache).toHaveBeenCalledWith(createCacheKey(100));
    expect(response).toBe(cachedResponse);
    expect(saveToCache).not.toHaveBeenCalled();
  });

  test('Gemini API should save response to cache if not cached', async () => {
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

    const response = await gemini.sendMessage(message, { ...options }, 60);

    expect(getFromCache).toHaveBeenCalledWith(createCacheKey(100));
    expect(response).toBe(apiResponse);
    expect(saveToCache).toHaveBeenCalledWith(
      createCacheKey(100),
      apiResponse,
      60,
    );
  });
});
