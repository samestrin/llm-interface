/**
 * @file test/basic/llmInterfaceGetModelConfigValue.test.js
 * @description Tests for the LLMInterface.getModelConfigValue function.
 */

const { LLMInterface } = require('../../src/index.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
let config = require('../../src/config/config.js');
const { Readable } = require('stream');

let response;

describe('LLMInterface.getAllModelNames', () => {
  test('should return an array of all model names, order not important', () => {
    const modelNames = LLMInterface.getAllModelNames();

    const expectedModelNames = [
      'openai',
      'ai21',
      'aimlapi',
      'deepseek',
      'forefront',
      'ollama',
      'replicate',
      'writer',
      'anthropic',
      'azureai',
      'cohere',
      'gemini',
      'gooseai',
      'groq',
      'huggingface',
      'llamacpp',
      'mistralai',
      'perplexity',
      'rekaai',
      'cloudflareai',
      'fireworksai',
      'friendliai',
      'watsonxai',
      'nvidia',
      'deepinfra',
      'togetherai',
      'monsterapi',
      'octoai',
    ];

    // Sort both arrays to ensure the order doesn't affect the comparison
    modelNames.sort();
    expectedModelNames.sort();

    expect(modelNames).toStrictEqual(expectedModelNames);
  });
});

describe('LLMInterface.getModelConfigValue', () => {
  let testCases = [
    {
      llmProvider: 'openai',
      key: 'url',
      expectedValue: 'https://api.openai.com/v1/chat/completions',
    },
    {
      llmProvider: 'openai',
      key: 'model.default',
      expectedValue: { name: 'gpt-3.5-turbo', tokens: 16385 },
    },
    {
      llmProvider: 'ai21',
      key: 'url',
      expectedValue: 'https://api.ai21.com/studio/v1/chat/completions',
    },
    {
      llmProvider: 'ai21',
      key: 'model.large',
      expectedValue: { name: 'jamba-instruct', tokens: 256000 },
    },
    {
      llmProvider: 'anthropic',
      key: 'model.small',
      expectedValue: { name: 'claude-3-haiku-20240307', tokens: 200000 },
    },
    { llmProvider: 'nonexistent', key: 'url', expectedValue: false },
    { llmProvider: 'openai', key: 'nonexistent.key', expectedValue: false },
  ];

  testCases.forEach(({ llmProvider, key, expectedValue }) => {
    test(`should return the correct value for ${llmProvider} and key ${key}`, () => {
      try {
        response = LLMInterface.getModelConfigValue(llmProvider, key);
      } catch (error) {
        throw new Error(`Test failed: ${safeStringify(error)}`);
      }

      expect(response).toEqual(expectedValue);
    });
  });
});

describe('LLMInterface.setApiKey and getModelConfigValue', () => {
  test('should set and get a single API key', () => {
    LLMInterface.setApiKey('openai', 'sk-YOUR_OPENAI_API_KEY_HERE');
    const apiKey = LLMInterface.getModelConfigValue('openai', 'apiKey');
    expect(apiKey).toBe('sk-YOUR_OPENAI_API_KEY_HERE');
  });

  test('should set and get multiple API keys', () => {
    LLMInterface.setApiKey({
      openai: 'sk-YOUR_OPENAI_API_KEY_HERE',
      gemini: 'gemini_YOUR_GEMINI_API_KEY_HERE',
    });

    const openaiKey = LLMInterface.getModelConfigValue('openai', 'apiKey');
    const geminiKey = LLMInterface.getModelConfigValue('gemini', 'apiKey');

    expect(openaiKey).toBe('sk-YOUR_OPENAI_API_KEY_HERE');
    expect(geminiKey).toBe('gemini_YOUR_GEMINI_API_KEY_HERE');
  });
});

describe('LLMInterface.setApiKey followed by LLMInterface.sendMessage and LLMInterface.streamMessage (using Groq)', () => {
  if (config.groqApiKey) {
    beforeAll(() => {
      LLMInterface.setApiKey('groq', config.groqApiKey);
    });

    test('LLMInterface.sendMessage should send a message and receive a response', async () => {
      response = await LLMInterface.sendMessage('groq', simplePrompt, options);
      expect(typeof response).toBe('object');
    }, 30000);

    test('LLMInterface.streamMessage should stream a message and receive a response stream', async () => {
      try {
        const stream = await LLMInterface.streamMessage(
          'groq',
          simplePrompt,
          options,
        );

        expect(stream).toBeDefined();
        expect(stream).toHaveProperty('data');

        let data = '';
        const readableStream = new Readable().wrap(stream.data);

        await new Promise((resolve, reject) => {
          readableStream.on('data', (chunk) => {
            data += chunk;
          });

          readableStream.on('end', () => {
            try {
              expect(typeof data).toBe('string');
              console.log(data);
              resolve();
            } catch (error) {
              reject(
                new Error(`Invalid string received: ${safeStringify(error)}`),
              );
            }
          });

          readableStream.on('error', (error) => {
            reject(new Error(`Stream error: ${safeStringify(error)}`));
          });
        });
      } catch (error) {
        throw new Error(`Stream test failed: ${safeStringify(error)}`);
      }
    }, 30000);

    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      expect(response.results.length).toBeLessThan(expectedMaxLength);
    });
  } else {
    test.skip(`OpenAI API Key is not set`, () => {});
  }
});
