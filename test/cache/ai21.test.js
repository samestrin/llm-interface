/**
 * @file test/cache/ai21.test.js
 * @description Tests for the caching mechanism in the AI21 class.
 */

const AI21 = require('../../src/interfaces/ai21.js');
const { ai21ApiKey } = require('../../src/config/config.js');
const { getFromCache, saveToCache } = require('../../src/utils/cache.js');
jest.mock('../../src/utils/cache.js'); // Mock the cache module

describe('AI21 API Caching', () => {
  const ai21 = new AI21(ai21ApiKey);

  const message = {
    model: 'j1-jumbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Explain the importance of low latency LLMs.' },
    ],
  };

  const options = { max_tokens: 150 };

  // Convert the message structure for caching
  const cacheKey = JSON.stringify({
    model: 'j1-jumbo',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Explain the importance of low latency LLMs.' },
    ],
    max_tokens: 150,
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('AI21 API Key should be set', async () => {
    expect(typeof ai21ApiKey).toBe('string');
  });

  test('AI21 API should return cached response if available', async () => {
    const cachedResponse = 'Cached response';
    getFromCache.mockReturnValue(cachedResponse);

    const response = await ai21.sendMessage(message, options, {
      cacheTimeoutSeconds: 60,
    });

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(cachedResponse);
    expect(saveToCache).not.toHaveBeenCalled();
  });

  test('AI21 API should save response to cache if not cached', async () => {
    getFromCache.mockReturnValue(null);

    const apiResponse = 'API response';
    ai21.client.post = jest.fn().mockResolvedValue({
      data: { choices: [{ message: { content: apiResponse } }] },
    });

    const response = await ai21.sendMessage(message, options, {
      cacheTimeoutSeconds: 60,
    });

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(apiResponse);
    expect(saveToCache).toHaveBeenCalledWith(cacheKey, apiResponse, 60);
  });
});
