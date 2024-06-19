/**
 * @file cohere.cache.test.js
 * @description Tests for the caching mechanism in the Cohere class.
 */

const Cohere = require('../../src/cohere');
const { cohereApiKey } = require('../../src/config/config.js');
const { getFromCache, saveToCache } = require('../../src/cache');
jest.mock('../../src/cache'); // Mock the cache module

describe('Cohere Caching', () => {
  const cohere = new Cohere(cohereApiKey);

  const message = {
    model: 'command-r-plus',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: 'Explain the importance of low latency LLMs.' },
    ],
  };

  const options = { max_tokens: 150 };

  // Convert the message structure for caching
  const chat_history = message.messages.slice(0, -1).map((msg) => ({
    role: msg.role === 'user' ? 'USER' : 'CHATBOT',
    message: msg.content,
  }));
  const current_message = message.messages[message.messages.length - 1].content;

  const cacheKey = JSON.stringify({
    chat_history:
      chat_history.length > 0 ? chat_history : [{ role: 'USER', message: '' }],
    message: current_message,
    model: 'command-r-plus',
    max_tokens: 150,
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Cohere API Key should be set', async () => {
    expect(typeof cohereApiKey).toBe('string');
  });

  test('Cohere API should return cached response if available', async () => {
    const cachedResponse = 'Cached response';
    getFromCache.mockReturnValue(cachedResponse);

    const response = await cohere.sendMessage(message, options, 60);

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(cachedResponse);
    expect(saveToCache).not.toHaveBeenCalled();
  });

  test('Cohere API should save response to cache if not cached', async () => {
    getFromCache.mockReturnValue(null);

    const apiResponse = 'API response';
    cohere.client.post = jest.fn().mockResolvedValue({
      data: { text: apiResponse },
    });

    const response = await cohere.sendMessage(message, options, 60);

    expect(getFromCache).toHaveBeenCalledWith(cacheKey);
    expect(response).toBe(apiResponse);
    expect(saveToCache).toHaveBeenCalledWith(cacheKey, apiResponse, 60);
  });
});
