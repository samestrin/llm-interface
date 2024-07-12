/**
 * @file test/interfaces/monsterapi.test.js
 * @description Tests for the MonsterAPI API client.
 */

const MonsterAPI = require('../../src/interfaces/monsterapi.js');
const { monsterapiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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
  MonsterAPI,
  monsterapiApiKey,
  'MonsterAPI',
  'microsoft/Phi-3-mini-4k-instruct',
  message,
  true,
);
