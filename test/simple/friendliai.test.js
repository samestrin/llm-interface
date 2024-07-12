/**
 * @file friendliai.test.js
 * @description Simplified tests for the Friendli AI API client.
 */

const FriendliAI = require('../../src/interfaces/friendliai.js');
const { friendliaiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

runTests(FriendliAI, friendliaiApiKey, 'FriendliAI', simplePrompt);
