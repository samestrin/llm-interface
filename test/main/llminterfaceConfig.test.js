/**
 * @file test/basic/llmInterfaceGetModelConfigValue.test.js
 * @description Tests for the LLMInterface.getModelConfigValue function.
 */

const { LLMInterface } = require('../../src/index.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

let result;

describe('LLMInterface.getAllModelNames', () => {
  test('should return an array of all model names, order not important', () => {
    const modelNames = LLMInterface.getAllModelNames();

    const expectedModelNames = [
      'openai',
      'ai21',
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
      // 'taskingai',
      // 'telnyx',
      // 'togetherai',
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
        result = LLMInterface.getModelConfigValue(llmProvider, key);
      } catch (error) {
        throw new Error(`Test failed: ${safeStringify(error)}`);
      }

      expect(result).toEqual(expectedValue);
    });
  });
});
