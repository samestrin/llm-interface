/**
 * @file test/utils/utils.test.js
 * @description Utility function testing
 */

const {
  getMessageObject,
  getSimpleMessageObject,
  parseJSON,
} = require('../../src/utils/utils.js');
const {
  getModelByAlias,
  getModelConfigValue,
} = require('../../src/utils/config.js');
const config = require('../../src/config/llmProviders.json');

describe('Utils', () => {
  describe('getMessageObject', () => {
    test('should return a message object with user and system messages', () => {
      const message = 'Hello!';
      const systemMessage = 'This is a system message.';
      const expected = {
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: message },
        ],
      };
      expect(getMessageObject(message, systemMessage)).toEqual(expected);
    });

    test('should return a message object with a default system message', () => {
      const message = 'Hello!';
      const expected = {
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: message },
        ],
      };
      expect(getMessageObject(message)).toEqual(expected);
    });
  });

  describe('getSimpleMessageObject', () => {
    test('should return a simple message object with the user message', () => {
      const message = 'Hello!';
      const expected = {
        messages: [{ role: 'user', content: message }],
      };
      expect(getSimpleMessageObject(message)).toEqual(expected);
    });
  });

  describe('getModelByAlias', () => {
    test('should return the model name based on the provided alias', () => {
      const provider = 'openai';
      const modelAlias = 'default';
      const expectedModelName = config[provider].model[modelAlias].name;
      expect(getModelByAlias(provider, modelAlias)).toEqual(expectedModelName);
    });

    test('should return the model alias if the model name is not found', () => {
      const provider = 'openai';
      const modelAlias = 'nonexistent-model';
      expect(getModelByAlias(provider, modelAlias)).toEqual(modelAlias);
    });

    test('should return the model alias if the provider is not found', () => {
      const provider = 'nonexistent-provider';
      const modelAlias = 'gpt-3';
      expect(getModelByAlias(provider, modelAlias)).toEqual(modelAlias);
    });
  });

  describe('parseJSON', () => {
    test('should parse JSON string correctly', async () => {
      const jsonString = '{"name": "John"}';
      const expected = { name: 'John' };
      await expect(parseJSON(jsonString)).resolves.toStrictEqual(expected);
    });

    test('should return the original string for invalid JSON', async () => {
      const jsonString = '{name';
      await expect(parseJSON(jsonString)).resolves.toStrictEqual(jsonString);
    });
  });

  describe('getModelConfigValue', () => {
    test('should return the correct value for a given key', () => {
      const modelName = 'aimlapi';
      expect(getModelConfigValue(modelName, 'url')).toEqual(
        config[modelName].url,
      );
      expect(getModelConfigValue(modelName, 'apiKey')).toEqual(false);
      expect(getModelConfigValue(modelName, 'model.default')).toEqual(
        config[modelName].model.default,
      );
      expect(getModelConfigValue(modelName, 'model.large')).toEqual(
        config[modelName].model.large,
      );
      expect(getModelConfigValue(modelName, 'model.small')).toEqual(
        config[modelName].model.small,
      );
      expect(getModelConfigValue(modelName, 'embeddingUrl')).toEqual(
        config[modelName].embeddingUrl,
      );
      expect(getModelConfigValue(modelName, 'embeddings.default')).toEqual(
        config[modelName].embeddings.default,
      );
      expect(getModelConfigValue(modelName, 'embeddings.large')).toEqual(
        config[modelName].embeddings.large,
      );
      expect(getModelConfigValue(modelName, 'embeddings.small')).toEqual(
        config[modelName].embeddings.small,
      );
      expect(getModelConfigValue(modelName, 'createMessageObject')).toEqual(
        config[modelName].createMessageObject,
      );
      expect(getModelConfigValue(modelName, 'arguments')).toEqual(
        config[modelName].arguments,
      );
    });

    test('should return false for non-existent keys', () => {
      const modelName = 'aimlapi';
      expect(getModelConfigValue(modelName, 'nonexistent.key')).toEqual(false);
    });

    test('should return false for non-existent model', () => {
      const modelName = 'nonexistentModel';
      expect(getModelConfigValue(modelName, 'url')).toEqual(false);
    });
  });
});
