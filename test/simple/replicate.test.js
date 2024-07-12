/**
 * @file test/simple/replicate.test.js
 * @description Simplified tests for the Replicate API client.
 */

const Replicate = require('../../src/interfaces/replicate.js');
const { replicateApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

runTests(Replicate, replicateApiKey, 'Replicate', simplePrompt);
