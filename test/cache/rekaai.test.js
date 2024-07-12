/**
 * @file test/cache/reka.test.js
 * @description Tests for the caching mechanism in the RekaAI class.
 */

const { rekaaiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const runTests = require('./sharedTestCases.js');
runTests('rekaai', rekaaiApiKey);
