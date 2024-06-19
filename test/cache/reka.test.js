/**
 * @file test/cache/reka.test.js
 * @description Tests for the caching mechanism in the Reka class.
 */

const Reka = require('../../src/interfaces/reka.js');
const { rekaApiKey } = require('../../src/config/config.js');
const { getFromCache, saveToCache } = require('../../src/utils/cache.js');
jest.mock('../../src/utils/cache.js'); // Mock the cache module

describe('Reka Caching', () => {
  const reka = new Reka(rekaApiKey);

  const message = {
    model: 'reka-core',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Explain the importance of low latency LLMs.' },
    ],
  };

  const options = {};

  // Convert the message structure for caching
  const convertedMessages = message.messages.map((msg, index) => {
    if (msg.role === 'system') {
      return { ...msg, role: 'assistant' };
    }
    return { ...msg, role: 'user' };
  });

  const cacheKey = JSON.stringify({
    messages: convertedMessages,
    model: 'reka-core',
    max_tokens: 150, // Include the default value for max_tokens
    stream: false,
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Reka AI API Key should be set', async () => {
    expect(typeof rekaApiKey).toBe('string');
  });

  test('Reka AI API should return cached response if available', async () => {
    const cachedResponse = 'Cached response';
    getFromCache.mockReturnValue(cachedResponse);

    const response = await reka.sendMessage(message, options, 60);

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(cachedResponse);
    expect(saveToCache).not.toHaveBeenCalled();
  });

  test('Reka AI API should save response to cache if not cached', async () => {
    getFromCache.mockReturnValue(null);

    const apiResponse = 'API response';
    reka.client.post = jest.fn().mockResolvedValue({
      data: {
        responses: [
          { finish_reason: 'stop', message: { content: apiResponse } },
        ],
      },
    });

    const response = await reka.sendMessage(message, options, 60);

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(apiResponse);
    expect(saveToCache).toHaveBeenCalledWith(cacheKey, apiResponse, 60);
  });
});
