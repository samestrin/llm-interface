/**
 * @file perplexity.test.js
 * @description Simplified tests for the Perplexity API client.
 */

const Perplexity = require('../../src/interfaces/perplexity.js');
const { perplexityApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

runTests(Perplexity, perplexityApiKey, 'Perplexity', simplePrompt);
