/**
 * @file test/cache/goose.test.js
 * @description Tests for the caching mechanism in the Goose class.
 */

const Goose = require('../../src/interfaces/goose.js');
const { gooseApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../utils/defaults.js');
const { getFromCache, saveToCache } = require('../../src/utils/cache.js');
const suppressLogs = require('../utils/suppressLogs.js');
jest.mock('../../src/utils/cache.js');

describe('Goose Caching', () => {
  if (gooseApiKey) {
    const goose = new Goose(gooseApiKey);

    const message = {
      model: 'gpt-neo-20b',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: simplePrompt,
        },
      ],
    };

    // Convert the message structure for caching
    const formattedPrompt = message.messages
      .map((message) => message.content)
      .join(' ');

    const cacheKey = JSON.stringify({
      prompt: formattedPrompt,
      model: message.model,
      max_tokens: options.max_tokens,
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('API Key should be set', async () => {
      expect(typeof gooseApiKey).toBe('string');
    });

    test('API should return cached response if available', async () => {
      const cachedResponse = 'Cached response';
      getFromCache.mockReturnValue(cachedResponse);

      const response = await goose.sendMessage(message, options, {
        cacheTimeoutSeconds: 60,
      });

      expect(getFromCache).toHaveBeenCalledWith(cacheKey);
      expect(response).toBe(cachedResponse);
      expect(saveToCache).not.toHaveBeenCalled();
    });

    test('API should save response to cache if not cached', async () => {
      getFromCache.mockReturnValue(null);

      const apiResponse = 'API response';
      goose.client.post = jest.fn().mockResolvedValue({
        data: { choices: [{ text: apiResponse }] },
      });

      const response = await goose.sendMessage(message, options, {
        cacheTimeoutSeconds: 60,
      });

      expect(getFromCache).toHaveBeenCalledWith(cacheKey);
      expect(response).toBe(apiResponse);
      expect(saveToCache).toHaveBeenCalledWith(cacheKey, apiResponse, 60);
    });
    test(
      'Should respond with prompt API error messaging',
      suppressLogs(async () => {
        getFromCache.mockReturnValue(null);
        goose.client.post = jest.fn().mockRejectedValue(new Error('API error'));

        await expect(
          goose.sendMessage(message, options, {
            cacheTimeoutSeconds: 60,
          }),
        ).rejects.toThrow('API error');

        expect(getFromCache).toHaveBeenCalledWith(cacheKey);
        expect(saveToCache).not.toHaveBeenCalled();
      }),
    );
  } else {
    test.skip(`${module} API Key is not set`, () => {});
  }
});
