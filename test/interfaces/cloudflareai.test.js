/**
 * @file test/interfaces/cloudflareai.test.js
 * @description Tests for the CloudflareAI API client.
 */

const CloudflareAI = require('../../src/interfaces/cloudflareai.js');
const {
  cloudflareaiApiKey,
  cloudflareaiAccountId,
} = require('../../src/utils/loadApiKeysFromEnv.js');
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
  CloudflareAI,
  [cloudflareaiApiKey, cloudflareaiAccountId],
  'CloudflareAI',
  '@cf/tinyllama/tinyllama-1.1b-chat-v1.0',
  message,
  false,
);
