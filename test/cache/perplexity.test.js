/**
 * @file test/cache/perplexity.test.js
 * @description Tests for the caching mechanism in the Perplexity class.
 */

const { perplexityApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const runTests = require('./sharedTestCases.js');
runTests('perplexity', perplexityApiKey);
