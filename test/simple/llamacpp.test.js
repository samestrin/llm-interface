/**
 * @file llamacpp.test.js
 * @description Simplified tests for the LLamaCPP API client.
 */

const LLamaCPP = require('../../src/interfaces/llamacpp.js');
const { llamaURL } = require('../../src/config/config.js');
const {
  simplePrompt,
  options,
  expectedMaxLength,
} = require('../../src/utils/defaults.js');

const axios = require('axios');
const { safeStringify } = require('../../src/utils/jestSerializer.js');

let response = '';
let responseString = '';
let testString = '<h1>llama.cpp</h1>';

describe('LLamaCPP Simple', () => {
  if (llamaURL) {
    test('URL should be set', async () => {
      expect(typeof llamaURL).toBe('string');
    });

    test('URL loading test', async () => {
      try {
        const fullUrl = llamaURL;
        const parsedUrl = new URL(fullUrl);

        const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}${
          parsedUrl.port ? ':' + parsedUrl.port : ''
        }/`;

        response = await axios.get(baseUrl);
        responseString = response.data;

        expect(response.status).toBe(200);
        expect(response.data).toContain(testString);
      } catch (error) {
        throw new Error(`Failed to load URL: ${safeStringify(error.message)}`);
      }
    });

    test('API Client should send a message and receive a response', async () => {
      if (responseString.includes(testString)) {
        const llamacpp = new LLamaCPP(llamaURL);

        try {
          response = await llamacpp.sendMessage(simplePrompt, options);
        } catch (error) {
          throw new Error(
            `Failed to load URL: ${safeStringify(error.message)}`,
          );
        }

        expect(typeof response).toStrictEqual('object');
      } else {
        throw new Error(`Test string not found in response: ${responseString}`);
      }
    }, 30000);

    test(`Response should be less than ${expectedMaxLength} characters`, async () => {
      if (response && response.results) {
        expect(response.results.length).toBeLessThan(expectedMaxLength);
      } else {
        throw new Error(`Response or response.results is undefined`);
      }
    });
  } else {
    test.skip(`URL is not set`, () => {});
  }
});
