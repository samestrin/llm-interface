/**
 * @file test/cache/llamacpp.test.js
 * @description Tests for the caching mechanism in the LlamaCPP class.
 */

const LlamaCPP = require('../../src/interfaces/llamacpp.js');
const { llamaURL } = require('../../src/config/config.js');
const runTests = require('./sharedTestCases.js');
runTests(LlamaCPP, llamaURL, 'LlamaCPP', '');
