/**
 * @file test/interfaces/deepinfra.test.js
 * @description Tests for the DeepInfra API client.
 */

const Corcel = require('../../src/interfaces/corcel.js');
const { corcelApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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

runTests(Corcel, corcelApiKey, 'Corcel', 'cortext-lite', message, true, false);
// they support max_tokens but the response length is longer then the average
