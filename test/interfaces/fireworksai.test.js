/**
 * @file test/interfaces/fireworksai.test.js
 * @description Tests for the FireworksAI API client.
 */

const FireworksAI = require('../../src/interfaces/fireworksai.js');
const { fireworksaiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

const message = {
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

runTests(
  FireworksAI,
  fireworksaiApiKey,
  'FireworksAI',
  'accounts/fireworks/models/phi-3-mini-128k-instruct',
  message,
);
