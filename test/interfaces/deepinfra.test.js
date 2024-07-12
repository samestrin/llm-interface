/**
 * @file test/interfaces/deepinfra.test.js
 * @description Tests for the DeepInfra API client.
 */

const DeepInfra = require('../../src/interfaces/deepinfra.js');
const { deepinfraApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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
  DeepInfra,
  deepinfraApiKey,
  'DeepInfra',
  'microsoft/WizardLM-2-7B',
  message,
);
