/**
 * @file test/interfaces/nvidia.test.js
 * @description Tests for the NVIDIA API client.
 */

const NVIDIA = require('../../src/interfaces/nvidia.js');
const { nvidiaApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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

runTests(NVIDIA, nvidiaApiKey, 'NVIDIA', 'meta-llama-3-8b-instruct', message);
