/**
 * @file test/interfaces/ollama.test.js
 * @description Tests for the Ollama API client.
 */

const Ollama = require('../../src/interfaces/ollama.js');
const { ollamaURL } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');
const { safeStringify } = require('../../src/utils/jestSerializer.js');
const axios = require('axios');
const { Readable } = require('stream');

let response = '';
let model = 'llama3';
let testString = 'Ollama is running';

describe('Ollama Interface', () => {
  if (ollamaURL) {
    let response;

    test('URL should be set', async () => {
      expect(typeof ollamaURL).toBe('string');
    });

    test('URL loading test', async () => {
      try {
        const fullUrl = ollamaURL;
        const parsedUrl = new URL(fullUrl);

        const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}${
          parsedUrl.port ? ':' + parsedUrl.port : ''
        }/`;

        const response = await axios.get(baseUrl);

        expect(response.status).toBe(200);
        expect(response.data).toContain(testString);
      } catch (error) {
        throw new Error(`Failed to load URL: ${error.message}`);
      }
    });

    test('API Client should send a message and receive a response', async () => {
      const ollama = new Ollama(ollamaURL);
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
        response = await ollama.sendMessage(message, options);
      } catch (error) {
        throw new Error(`Test failed: ${safeStringify(error)}`);
      }

      expect(typeof response).toStrictEqual('object');
    }, 30000);

    test('API Client should stream a message and receive a response stream', async () => {
      const ollama = new Ollama(ollamaURL);
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
        const stream = await ollama.streamMessage(message, options);

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
    test.skip(`URL is not set`, () => {});
  }
});
