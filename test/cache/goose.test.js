/**
 * @file test/cache/goose.test.js
 * @description Tests for the caching mechanism in the Goose class.
 */

const Goose = require('../../src/interfaces/goose.js');
const { gooseApiKey } = require('../../src/config/config.js');
const { getFromCache, saveToCache } = require('../../src/utils/cache.js');
jest.mock('../../src/utils/cache.js'); // Mock the cache module

describe('Goose AI Caching', () => {
  const goose = new Goose(gooseApiKey);

  const message = {
    model: 'gpt-neo-20b',
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
    model: 'gpt-neo-20b',
    max_tokens: 150,
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Goose AI API Key should be set', async () => {
    expect(typeof gooseApiKey).toBe('string');
  });

  test('Goose AI API should return cached response if available', async () => {
    const cachedResponse = 'Cached response';
    getFromCache.mockReturnValue(cachedResponse);

    const response = await goose.sendMessage(message, options, 60);

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(cachedResponse);
    expect(saveToCache).not.toHaveBeenCalled();
  });

  test('Goose AI API should save response to cache if not cached', async () => {
    getFromCache.mockReturnValue(null);

    const apiResponse = 'API response';
    goose.client.post = jest.fn().mockResolvedValue({
      data: { choices: [{ text: apiResponse }] },
    });

    const response = await goose.sendMessage(message, options, 60);

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(apiResponse);
    expect(saveToCache).toHaveBeenCalledWith(cacheKey, apiResponse, 60);
  });
});
