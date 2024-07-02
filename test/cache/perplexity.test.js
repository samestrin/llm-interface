/**
 * @file test/cache/perplexity.test.js
 * @description Tests for the caching mechanism in the Perplexity class.
 */

const Perplexity = require('../../src/interfaces/perplexity');
const { perplexityApiKey } = require('../../src/config/config.js');
const runTests = require('./sharedTestCases.js');
runTests(
  Perplexity,
  perplexityApiKey,
  'Perplexity',
  'llama-3-sonar-small-32k-online',
);
