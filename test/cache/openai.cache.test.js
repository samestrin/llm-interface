/**
 * @file openai.cache.test.js
 * @description Tests for the caching mechanism in the OpenAI class.
 */

const OpenAI = require('../../src/openai');
const { openaiApiKey } = require('../../src/config/config.js');
const { getFromCache, saveToCache } = require('../../src/cache');
jest.mock('../../src/cache'); // Mock the cache module

describe('OpenAI Caching', () => {
  const openai = new OpenAI(openaiApiKey);

  const message = {
    model: 'gpt-3.5-turbo-0613',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Explain the importance of low latency LLMs.' },
    ],
  };

  const options = { max_tokens: 150 };

  // Convert the message structure for caching
  const cacheKey = JSON.stringify({
    model: 'gpt-3.5-turbo-0613',
    messages: message.messages,
    max_tokens: 150,
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('OpenAI API Key should be set', async () => {
    expect(typeof openaiApiKey).toBe('string');
  });

  test('OpenAI API should return cached response if available', async () => {
    const cachedResponse = 'Cached response';
    getFromCache.mockReturnValue(cachedResponse);

    const response = await openai.sendMessage(message, options, 60);

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(cachedResponse);
    expect(saveToCache).not.toHaveBeenCalled();
  });

  test('OpenAI API should save response to cache if not cached', async () => {
    getFromCache.mockReturnValue(null);

    const apiResponse = 'API response';
    openai.openai.chat.completions.create = jest.fn().mockResolvedValue({
      choices: [{ message: { content: apiResponse } }],
    });

    const response = await openai.sendMessage(message, options, 60);

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(apiResponse);
    expect(saveToCache).toHaveBeenCalledWith(cacheKey, apiResponse, 60);
  });
});
