/**
 * @file test/cache/openai.test.js
 * @description Tests for the caching mechanism in the Openai class.
 */

const { openaiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const runTests = require('./sharedTestCases.js');
runTests('openai', openaiApiKey);
