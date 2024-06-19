/**
 * @file groq.cache.test.js
 * @description Tests for the caching mechanism in the Groq class.
 */

const Groq = require('../../src/groq');
const { groqApiKey } = require('../../src/config/config.js');
const { getFromCache, saveToCache } = require('../../src/cache');
jest.mock('../../src/cache'); // Mock the cache module

describe('Groq Caching', () => {
  const groq = new Groq(groqApiKey);

  const message = {
    model: 'llama3-8b-8192',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Explain the importance of low latency LLMs.' },
    ],
  };

  const options = { max_tokens: 150 };

  // Convert the message structure for caching
  const cacheKey = JSON.stringify({
    model: 'llama3-8b-8192',
    messages: message.messages,
    max_tokens: 150,
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Groq API Key should be set', async () => {
    expect(typeof groqApiKey).toBe('string');
  });

  test('Groq API should return cached response if available', async () => {
    const cachedResponse = 'Cached response';
    getFromCache.mockReturnValue(cachedResponse);

    const response = await groq.sendMessage(message, options, 60);

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(cachedResponse);
    expect(saveToCache).not.toHaveBeenCalled();
  });

  test('Groq API should save response to cache if not cached', async () => {
    getFromCache.mockReturnValue(null);

    const apiResponse = 'API response';
    groq.groq.chat.completions.create = jest.fn().mockResolvedValue({
      choices: [{ message: { content: apiResponse } }],
    });

    const response = await groq.sendMessage(message, options, 60);

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(apiResponse);
    expect(saveToCache).toHaveBeenCalledWith(cacheKey, apiResponse, 60);
  });
});
