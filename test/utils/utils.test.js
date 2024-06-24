const {
  getMessageObject,
  getSimpleMessageObject,
  parseJSON,
} = require('../../src/utils/utils.js');
const { getModelByAlias } = require('../../src/utils/config.js');
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
      await expect(parseJSON(jsonString, false)).resolves.toStrictEqual(
        expected,
      );
    });

    test('should repair and parse invalid JSON string if attemptRepair is true', async () => {
      const jsonString = "{name: 'John'}";
      const expected = { name: 'John' };
      await expect(parseJSON(jsonString, true)).resolves.toStrictEqual(
        expected,
      );
    });

    test('should return null for invalid JSON string if attemptRepair is false', async () => {
      const jsonString = '{name';
      await expect(parseJSON(jsonString, false)).resolves.toBeNull();
    });
  });
});
