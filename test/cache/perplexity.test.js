/**
 * @file test/cache/perplexity.test.js
 * @description Tests for the caching mechanism in the Perplexity class.
 */

const Perplexity = require('../../src/interfaces/perplexity.js');
const { perplexityApiKey } = require('../../src/config/config.js');
const { getFromCache, saveToCache } = require('../../src/utils/cache.js');
jest.mock('../../src/utils/cache.js'); // Mock the cache module

describe('Perplexity API Caching', () => {
  const perplexity = new Perplexity(perplexityApiKey);

  const message = {
    model: 'gpt-neo-20b',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Explain the importance of low latency LLMs.' },
    ],
  };

  const options = { max_tokens: 150 };

  // Convert the message structure for caching
  const cacheKey = JSON.stringify({
    model: 'gpt-neo-20b',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Explain the importance of low latency LLMs.' },
    ],
    max_tokens: 150,
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Perplexity API Key should be set', async () => {
    expect(typeof perplexityApiKey).toBe('string');
  });

  test('Perplexity API should return cached response if available', async () => {
    const cachedResponse = 'Cached response';
    getFromCache.mockReturnValue(cachedResponse);

    const response = await perplexity.sendMessage(message, options, {
      cacheTimeoutSeconds: 60,
    });

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(cachedResponse);
    expect(saveToCache).not.toHaveBeenCalled();
  });

  test('Perplexity API should save response to cache if not cached', async () => {
    getFromCache.mockReturnValue(null);

    const apiResponse = 'API response';
    perplexity.client.post = jest.fn().mockResolvedValue({
      data: { choices: [{ message: { content: apiResponse } }] },
    });

    const response = await perplexity.sendMessage(message, options, {
      cacheTimeoutSeconds: 60,
    });

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(apiResponse);
    expect(saveToCache).toHaveBeenCalledWith(cacheKey, apiResponse, 60);
  });
});
