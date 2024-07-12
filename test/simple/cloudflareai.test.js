/**
 * @file test/simple/cloudflareai.test.js
 * @description Simplified tests for the Cloudflare AI API client.
 */

const CloudflareAI = require('../../src/interfaces/cloudflareai.js');
const {
  cloudflareaiApiKey,
  cloudflareaiAccountId,
} = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

runTests(
  CloudflareAI,
  [cloudflareaiApiKey, cloudflareaiAccountId],
  'CloudflareAI',
  simplePrompt,
);
