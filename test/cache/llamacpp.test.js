/**
 * @file test/cache/llamacpp.test.js
 * @description Tests for the caching mechanism in the LlamaCPP class.
 */

const { llamaURL } = require('../../src/utils/loadApiKeysFromEnv.js');
const runTests = require('./sharedTestCases.js');
runTests('llamacpp', llamaURL);
