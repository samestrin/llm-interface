/**
 * @file mistral.cache.test.js
 * @description Tests for the caching mechanism in the Mistral class.
 */

const Mistral = require('../../src/mistral');
const { mistralApiKey } = require('../../src/config/config.js');
const { getFromCache, saveToCache } = require('../../src/cache');
jest.mock('../../src/cache'); // Mock the cache module

describe('Mistral Caching', () => {
  const mistral = new Mistral(mistralApiKey);

  const message = {
    model: 'mistral-1.0',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Explain the importance of low latency LLMs.' },
    ],
  };

  const options = { max_tokens: 150 };

  // Convert the message structure for caching
  const cacheKey = JSON.stringify({
    model: 'mistral-1.0',
    messages: message.messages,
    max_tokens: 150,
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Mistral API Key should be set', async () => {
    expect(typeof mistralApiKey).toBe('string');
  });

  test('Mistral API should return cached response if available', async () => {
    const cachedResponse = 'Cached response';
    getFromCache.mockReturnValue(cachedResponse);

    const response = await mistral.sendMessage(message, options, 60);

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(cachedResponse);
    expect(saveToCache).not.toHaveBeenCalled();
  });

  test('Mistral API should save response to cache if not cached', async () => {
    getFromCache.mockReturnValue(null);

    const apiResponse = 'API response';
    mistral.client.post = jest.fn().mockResolvedValue({
      data: { choices: [{ message: { content: apiResponse } }] },
    });

    const response = await mistral.sendMessage(message, options, 60);

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(apiResponse);
    expect(saveToCache).toHaveBeenCalledWith(cacheKey, apiResponse, 60);
  });
});
