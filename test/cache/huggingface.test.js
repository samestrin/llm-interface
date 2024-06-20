const HuggingFace = require('../../src/interfaces/huggingface.js');
const { huggingfaceApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { getFromCache, saveToCache } = require('../../src/utils/cache.js');
const suppressLogs = require('../../src/utils/suppressLogs.js');
jest.mock('../../src/utils/cache.js');

describe('HuggingFace Caching', () => {
  if (huggingfaceApiKey) {
    const huggingface = new HuggingFace(huggingfaceApiKey);

    const message = {
      model: 'gpt2',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: simplePrompt,
        },
      ],
    };

    const inputs = message.messages.map((msg) => msg.content).join(' ');
    const cacheKey = JSON.stringify({
      inputs: inputs,
      parameters: { max_new_tokens: options.max_tokens },
    });

    const mockResponse = [{ generated_text: simplePrompt }];

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('API Key should be set', async () => {
      expect(typeof huggingfaceApiKey).toBe('string');
    });

    test('API should return cached response if available', async () => {
      getFromCache.mockReturnValue(mockResponse[0].generated_text);

      const testOptions = { ...options }; // Create a deep copy of options

      const response = await huggingface.sendMessage(message, testOptions, {
        cacheTimeoutSeconds: 60,
      });

      expect(getFromCache).toHaveBeenCalledWith(cacheKey);
      expect(typeof response).toStrictEqual(mockResponse[0].generated_text);
      expect(saveToCache).not.toHaveBeenCalled();
    });

    test('API should save response to cache if not cached', async () => {
      getFromCache.mockReturnValue(null);
      saveToCache.mockImplementation(() => {});

      huggingface.client.post = jest
        .fn()
        .mockResolvedValue({ data: mockResponse });

      const testOptions = { ...options }; // Create a deep copy of options

      const response = await huggingface.sendMessage(message, testOptions, {
        cacheTimeoutSeconds: 60,
      });

      expect(getFromCache).toHaveBeenCalledWith(cacheKey);
      expect(huggingface.client.post).toHaveBeenCalledWith('gpt2', {
        inputs: inputs,
        parameters: { max_new_tokens: options.max_tokens }, // Ensure the correct value is expected
      });
      const expectedResult = { results: mockResponse[0].generated_text };
      expect(typeof response).toStrictEqual(expectedResult);
      expect(saveToCache).toHaveBeenCalledWith(cacheKey, expectedResult, 60);
    });

    test(
      'Should respond with prompt API error messaging',
      suppressLogs(async () => {
        getFromCache.mockReturnValue(null);
        huggingface.client.post = jest
          .fn()
          .mockRejectedValue(new Error('API error'));

        const testOptions = { ...options }; // Create a deep copy of options

        await expect(
          huggingface.sendMessage(message, testOptions, {
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
