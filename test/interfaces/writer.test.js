/**
 * @file test/interfaces/writer.test.js
 * @description Tests for the Writer API client.
 */

const Writer = require('../../src/interfaces/writer.js');
const { writerApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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

runTests(Writer, writerApiKey, 'Writer', 'palmyra-x-002-32k', message);
