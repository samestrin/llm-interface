/**
 * @file test/interfaces/monsterapi.test.js
 * @description Tests for the MonsterAPI API client.
 */

const MonsterAPI = require('../../src/interfaces/monsterapi.js');
const { monsterapiApiKey } = require('../../src/config/config.js');
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
  'TinyLlama/TinyLlama-1.1B-Chat-v1.0',
  message,
);
