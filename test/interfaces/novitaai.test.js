/**
 * @file test/interfaces/novitaai.test.js
 * @description Tests for the NovitaAI API client.
 */

const NovitaAI = require('../../src/interfaces/novitaai.js');
const { novitaaiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

const message = {
  messages: [
    {
      role: 'user',
      content: simplePrompt,
    },
  ],
};

runTests(
  NovitaAI,
  novitaaiApiKey,
  'NovitaAI',
  'meta-llama/llama-3-8b-instruct',
  message,
);
