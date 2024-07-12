/**
 * @file test/simple/deepinfra.test.js
 * @description Simplified tests for the DeepInfra AI API client.
 */

const DeepInfra = require('../../src/interfaces/deepinfra.js');
const { deepinfraApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

runTests(DeepInfra, deepinfraApiKey, 'DeepInfra', simplePrompt);
