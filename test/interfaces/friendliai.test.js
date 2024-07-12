/**
 * @file test/interfaces/friendliai.test.js
 * @description Tests for the FriendliAI API client.
 */

const FriendliAI = require('../../src/interfaces/friendliai.js');
const { friendliaiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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
  FriendliAI,
  friendliaiApiKey,
  'FriendliAI',
  'meta-llama-3-8b-instruct',
  message,
);
