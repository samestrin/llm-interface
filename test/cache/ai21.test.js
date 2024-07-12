/**
 * @file test/cache/ai21.test.js
 * @description Tests for the caching mechanism in the AI21 class.
 */

const { ai21ApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const runTests = require('./sharedTestCases.js');
runTests('ai21', ai21ApiKey);
