/**
 * @file test/cache/goose.test.js
 * @description Tests for the caching mechanism in the GooseAI class.
 */

const { gooseaiApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const runTests = require('./sharedTestCases.js');
runTests('gooseai', gooseaiApiKey);
