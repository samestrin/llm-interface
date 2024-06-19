/**
 * @file test/cache/anthropic.test.js
 * @description Tests for the caching mechanism in the Anthropic class.
 */

const Anthropic = require('../../src/interfaces/anthropic.js');
const { anthropicApiKey } = require('../../src/config/config.js');
const { getFromCache, saveToCache } = require('../../src/utils/cache.js');
jest.mock('../../src/utils/cache.js'); // Mock the cache module

describe('Anthropic Caching', () => {
  const anthropic = new Anthropic(anthropicApiKey);

  const message = {
    model: 'claude-3-opus-20240229',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Explain the importance of low latency LLMs.' },
    ],
  };

  const options = { max_tokens: 150 };

  // Convert the message structure for caching
  const convertedMessages = message.messages.map((msg, index) => {
    if (index === 0) {
      return { ...msg, role: 'user' };
    }
    if (msg.role === 'system') {
      return { ...msg, role: 'assistant' };
    }
    return { ...msg, role: index % 2 === 0 ? 'user' : 'assistant' };
  });

  const cacheKey = JSON.stringify({
    model: 'claude-3-opus-20240229',
    messages: convertedMessages,
    max_tokens: 150,
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Anthropic API Key should be set', async () => {
    expect(typeof anthropicApiKey).toBe('string');
  });

  test('Anthropic API should return cached response if available', async () => {
    const cachedResponse = 'Cached response';
    getFromCache.mockReturnValue(cachedResponse);

    const response = await anthropic.sendMessage(message, options, 60);

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(cachedResponse);
    expect(saveToCache).not.toHaveBeenCalled();
  });

  test('Anthropic API should save response to cache if not cached', async () => {
    getFromCache.mockReturnValue(null);

    const apiResponse = 'API response';
    anthropic.anthropic.messages.create = jest.fn().mockResolvedValue({
      content: [{ text: apiResponse }],
    });

    const response = await anthropic.sendMessage(message, options, 60);

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(apiResponse);
    expect(saveToCache).toHaveBeenCalledWith(cacheKey, apiResponse, 60);
  });
});
