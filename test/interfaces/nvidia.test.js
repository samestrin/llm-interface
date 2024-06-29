/**
 * @file test/interfaces/nvidia.test.js
 * @description Tests for the NVIDIA API client.
 */

const NVIDIA = require('../../src/interfaces/nvidia.js');
const { nvidiaApiKey } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');
const { Readable } = require('stream');

let response = '';
let model = 'meta-llama-3-8b-instruct';

describe('NVIDIA Interface', () => {
  if (nvidiaApiKey) {
    let response;

    test('API Key should be set', () => {
      expect(typeof nvidiaApiKey).toBe('string');
    });

    test('API Client should send a message and receive a response', async () => {
      const nvidia = new NVIDIA(nvidiaApiKey);
      const message = {
        model,
        messages: [
          {
            role: 'user',
            content: simplePrompt,
          },
        ],
      };

      try {
        response = await nvidia.sendMessage(message, options);
      } catch (error) {
        throw new Error(`Test failed: ${safeStringify(error)}`);
      }
      expect(typeof response).toStrictEqual('object');
    });

    test('API Client should stream a message and receive a response stream', async () => {
      const nvidia = new NVIDIA(nvidiaApiKey);
      const message = {
        model,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.',
          },
          {
            role: 'user',
            content: simplePrompt,
          },
        ],
      };

      try {
        const stream = await nvidia.streamMessage(message, options);

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
    test.skip(`API Key is not set`, () => {});
  }
});
