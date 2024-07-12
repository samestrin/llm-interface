/**
 * @file test/interfaces/perplexity.test.js
 * @description Tests for the Perplexity API client.
 */

const Perplexity = require('../../src/interfaces/perplexity.js');
const { perplexityApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
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
  Perplexity,
  perplexityApiKey,
  'Perplexity',
  'llama-3-sonar-small-32k-online',
  message,
);
