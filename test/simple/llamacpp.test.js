/**
 * @file llamacpp.test.js
 * @description Simplified tests for the LLamaCPP API client.
 */

const LlamaCPP = require('../../src/interfaces/llamacpp.js');
const { llamaURL } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');
const axios = require('axios');

let testString = '<h1>llama.cpp</h1>';

describe('LlamaCPP Interface (Outer)', () => {
  if (llamaURL) {
    test('URL should be set', () => {
      expect(typeof llamaURL).toBe('string');
    });

    describe('URL loading test', () => {
      let baseUrl;

      beforeAll(async () => {
        try {
          const fullUrl = llamaURL;
          const parsedUrl = new URL(fullUrl);

          baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}${
            parsedUrl.port ? ':' + parsedUrl.port : ''
          }/`;

          const response = await axios.get(baseUrl);

          expect(response.status).toBe(200);
          expect(response.data).toContain(testString);
        } catch (error) {
          throw new Error(`Failed to load URL: ${error.message}`);
        }
      });

      runTests(LlamaCPP, llamaURL, 'LlamaCPP', simplePrompt);
    });
  } else {
    test.skip('URL is not set', () => {});
  }
});
