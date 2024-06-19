/**
 * @file test/cache/llamacpp.test.js
 * @description Tests for the caching mechanism in the LlamaCPP class.
 */

const LlamaCPP = require('../../src/interfaces/llamacpp.js');
const { llamaURL } = require('../../src/config/config.js');
const { getFromCache, saveToCache } = require('../../src/utils/cache.js');
jest.mock('../../src/utils/cache.js'); // Mock the cache module

describe('LlamaCPP Caching', () => {
  const llamacpp = new LlamaCPP(llamaURL);

  const message = {
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Explain the importance of low latency LLMs.' },
    ],
  };

  const options = { max_tokens: 150 };

  // Convert the message structure for caching
  const formattedPrompt = message.messages
    .map((message) => message.content)
    .join(' ');

  const cacheKey = JSON.stringify({
    prompt: formattedPrompt,
    n_predict: 150,
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('LlamaCPP URL should be set', async () => {
    expect(typeof llamaURL).toBe('string');
  });

  test('should return cached response if available', async () => {
    const cachedResponse = 'Cached response';
    getFromCache.mockReturnValue(cachedResponse);

    const response = await llamacpp.sendMessage(message, options, 60);

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(cachedResponse);
    expect(saveToCache).not.toHaveBeenCalled();
  });

  test('should save response to cache if not cached', async () => {
    getFromCache.mockReturnValue(null);

    const apiResponse = 'API response';
    llamacpp.client.post = jest.fn().mockResolvedValue({
      data: { content: apiResponse },
    });

    const response = await llamacpp.sendMessage(message, options, 60);

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(apiResponse);
    expect(saveToCache).toHaveBeenCalledWith(cacheKey, apiResponse, 60);
  });
});
