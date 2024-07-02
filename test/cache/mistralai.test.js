/**
 * @file test/cache/mistralai.test.js
 * @description Tests for the caching mechanism in the MistralAI class.
 */

const MistralAI = require('../../src/interfaces/mistralai');
const { mistralaiApiKey } = require('../../src/config/config.js');
const runTests = require('./sharedTestCases.js');
runTests(MistralAI, mistralaiApiKey, 'MistralAI', 'mistral-small-latest');
