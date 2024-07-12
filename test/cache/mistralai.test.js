/**
 * @file test/cache/mistralai.test.js
 * @description Tests for the caching mechanism in the MistralAI class.
 */

const { mistralaiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const runTests = require('./sharedTestCases.js');
runTests('mistralai', mistralaiApiKey);
