/**
 * @file test/interfaces/ailayer.test.js
 * @description Tests for the AILayer API client.
 */

const AILayer = require('../../src/interfaces/ailayer.js');
const { ailayerApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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

runTests(AILayer, ailayerApiKey, 'AILayer', 'alpaca-7b', message);
