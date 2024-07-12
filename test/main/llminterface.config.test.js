/**
 * @file test/basic/llmInterface.config.test.js
 * @description Tests for the LLMInterface.getInterfaceConfigValue function.
 */

const { LLMInterface } = require('../../src/index.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');
let config = require('../../src/utils/loadApiKeysFromEnv.js');

let response;

describe('LLMInterface.getAllModelNames', () => {
  test('should return an array of all model names, order not important', () => {
    const modelNames = LLMInterface.getAllModelNames();

    const expectedModelNames = [
      'ai21',
      'ailayer',
      'aimlapi',
      'anthropic',
      'anyscale',
      'cloudflareai',
      'cohere',
      'corcel',
      'deepinfra',
      'deepseek',
      'fireworksai',
      'forefront',
      'friendliai',
      'gemini',
      'gooseai',
      'groq',
      'huggingface',
      'hyperbeeai',
      'lamini',
      'llamacpp',
      'mistralai',
      'monsterapi',
      'neetsai',
      'novitaai',
      'nvidia',
      'octoai',
      'ollama',
      'openai',
      'perplexity',
      'rekaai',
      'replicate',
      'shuttleai',
      'thebai',
      'togetherai',
      'voyage',
      'watsonxai',
      'writer',
      'zhipuai',
    ];

    // Sort both arrays to ensure the order doesn't affect the comparison
    modelNames.sort();
    expectedModelNames.sort();

    expect(modelNames).toStrictEqual(expectedModelNames);
  });
});

describe('LLMInterface.getInterfaceConfigValue', () => {
  let testCases = [
    {
      llmProvider: 'openai',
      key: 'url',
      expectedValue: 'https://api.openai.com/v1/chat/completions',
    },
    {
      llmProvider: 'openai',
      key: 'model.default',
      expectedValue: 'gpt-3.5-turbo',
    },
    {
      llmProvider: 'ai21',
      key: 'url',
      expectedValue: 'https://api.ai21.com/studio/v1/chat/completions',
    },
    {
      llmProvider: 'ai21',
      key: 'model.large',
      expectedValue: 'jamba-instruct',
    },
    {
      llmProvider: 'anthropic',
      key: 'model.small',
      expectedValue: 'claude-3-haiku-20240307',
    },
    { llmProvider: 'nonexistent', key: 'url', expectedValue: false },
    { llmProvider: 'openai', key: 'nonexistent.key', expectedValue: false },
  ];

  testCases.forEach(({ llmProvider, key, expectedValue }) => {
    test(`should return the correct value for ${llmProvider} and key ${key}`, () => {
      response = LLMInterface.getInterfaceConfigValue(llmProvider, key);
      try {
      } catch (error) {
        throw new Error(`Test failed: ${safeStringify(error)}`);
      }

      expect(response).toEqual(expectedValue);
    });
  });
});

describe('LLMInterface.setApiKey and getInterfaceConfigValue', () => {
  test('should set and get a single API key', () => {
    LLMInterface.setApiKey('openai', 'sk-YOUR_OPENAI_API_KEY_HERE');
    const apiKey = LLMInterface.getInterfaceConfigValue('openai', 'apiKey');
    expect(apiKey).toBe('sk-YOUR_OPENAI_API_KEY_HERE');
  });

  test('should set and get multiple API keys', () => {
    LLMInterface.setApiKey({
      openai: 'sk-YOUR_OPENAI_API_KEY_HERE',
      gemini: 'gemini_YOUR_GEMINI_API_KEY_HERE',
    });

    const openaiKey = LLMInterface.getInterfaceConfigValue('openai', 'apiKey');
    const geminiKey = LLMInterface.getInterfaceConfigValue('gemini', 'apiKey');

    expect(openaiKey).toBe('sk-YOUR_OPENAI_API_KEY_HERE');
    expect(geminiKey).toBe('gemini_YOUR_GEMINI_API_KEY_HERE');
  });
});

describe('LLMInterface.setModelAlias and getInterfaceConfigValue', () => {
  test('should set and get a default model alias', () => {
    LLMInterface.setModelAlias('openai', 'default', 'newModelName');
    const model = LLMInterface.getInterfaceConfigValue(
      'openai',
      'model.default',
    );
    expect(model).toBe('newModelName');
  });
});
