/**
 * @file test/interfaces/cohere.test.js
 * @description Tests for the Cohere API client.
 */

const Cohere = require('../../src/interfaces/cohere.js');
const { cohereApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

const message = {
  messages: [
    {
      role: 'user',
      content: 'Hello.',
    },
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

runTests(Cohere, cohereApiKey, 'Cohere', 'command-r', message, true);
