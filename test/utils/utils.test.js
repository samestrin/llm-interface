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
  getEmbeddingsModelByAlias,
  getInterfaceConfigValue,
} = require('../../src/utils/config.js');

const {
  loadProviderConfig,
  getConfig,
} = require('../../src/utils/configManager.js');

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
    test('should return the model name based on the provided alias', async () => {
      const interfaceName = 'openai';
      let modelAlias = 'default';

      loadProviderConfig(interfaceName);
      const config = getConfig();

      let expectedModelName = config[interfaceName].model['default'];

      expect(getModelByAlias(interfaceName, modelAlias)).toEqual(
        expectedModelName,
      );
      modelAlias = 'model.default';
      expectedModelName = config[interfaceName].model['default'];
      expect(getModelByAlias(interfaceName, modelAlias)).toEqual(
        expectedModelName,
      );
    });

    test('should return the original model value if the model name is not found', () => {
      const interfaceName = 'openai';
      const modelAlias = 'nonexistent-model';

      expect(getModelByAlias(interfaceName, modelAlias)).toEqual(modelAlias);
    });

    test('should return the original model value if the interfaceName is not found', () => {
      const interfaceName = 'nonexistent-interfaceName';
      const modelAlias = 'gpt-3';

      expect(getModelByAlias(interfaceName, modelAlias)).toEqual(modelAlias);
    });
  });

  describe('getEmbeddingsModelByAlias', () => {
    test('should return the model name based on the provided alias', async () => {
      const interfaceName = 'openai';
      let modelAlias = 'default';

      loadProviderConfig(interfaceName);
      const config = getConfig();

      let expectedModelName = config[interfaceName].embeddings['default'];
      expect(getEmbeddingsModelByAlias(interfaceName, modelAlias)).toEqual(
        expectedModelName,
      );

      modelAlias = 'embeddings.default';
      expectedModelName = config[interfaceName].embeddings['default'];
      expect(getEmbeddingsModelByAlias(interfaceName, modelAlias)).toEqual(
        expectedModelName,
      );
    });

    test('should return the original model value if the model name is not found', () => {
      const interfaceName = 'openai';
      const modelAlias = 'nonexistent-model';

      expect(getEmbeddingsModelByAlias(interfaceName, modelAlias)).toEqual(
        modelAlias,
      );
    });

    test('should return the original model value if the interfaceName is not found', () => {
      const interfaceName = 'nonexistent-interfaceName';
      const modelAlias = 'gpt-3';

      expect(getEmbeddingsModelByAlias(interfaceName, modelAlias)).toEqual(
        modelAlias,
      );
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

  describe('getInterfaceConfigValue', () => {
    test('should return the correct value for a given key', async () => {
      const interfaceName = 'aimlapi';

      loadProviderConfig(interfaceName);
      const config = getConfig();

      expect(getInterfaceConfigValue(interfaceName, 'url')).toEqual(
        config[interfaceName].url,
      );

      expect(getInterfaceConfigValue(interfaceName, 'apiKey')).toEqual(false);
      expect(getInterfaceConfigValue(interfaceName, 'model.default')).toEqual(
        config[interfaceName].model.default,
      );
      expect(getInterfaceConfigValue(interfaceName, 'model.large')).toEqual(
        config[interfaceName].model.large,
      );
      expect(getInterfaceConfigValue(interfaceName, 'model.small')).toEqual(
        config[interfaceName].model.small,
      );
      expect(getInterfaceConfigValue(interfaceName, 'embeddingUrl')).toEqual(
        config[interfaceName].embeddingUrl,
      );
      expect(
        getInterfaceConfigValue(interfaceName, 'embeddings.default'),
      ).toEqual(config[interfaceName].embeddings.default);
      expect(
        getInterfaceConfigValue(interfaceName, 'embeddings.large'),
      ).toEqual(config[interfaceName].embeddings.large);
      expect(
        getInterfaceConfigValue(interfaceName, 'embeddings.small'),
      ).toEqual(config[interfaceName].embeddings.small);
      expect(
        getInterfaceConfigValue(interfaceName, 'createMessageObject'),
      ).toEqual(config[interfaceName].createMessageObject);
    });

    test('should return false for non-existent keys', () => {
      const interfaceName = 'aimlapi';

      expect(getInterfaceConfigValue(interfaceName, 'nonexistent.key')).toEqual(
        false,
      );
    });

    test('should return false for non-existent interfaceName', async () => {
      const interfaceName = 'nonexistent';
      loadProviderConfig(interfaceName);
      expect(getInterfaceConfigValue(interfaceName, 'url')).toEqual(false);
    });

    test('should return false for non-existent model', async () => {
      const interfaceName = 'nonexistentModel';
      const model = 'fakemodel';
      loadProviderConfig(interfaceName, model);
      expect(getInterfaceConfigValue(interfaceName, 'url')).toEqual(false);
    });
  });
});
