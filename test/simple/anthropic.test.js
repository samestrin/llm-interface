/**
 * @file test/simple/anthropic.test.js
 * @description Simplified tests for the Anthropic API client.
 */

const Anthropic = require('../../src/interfaces/anthropic.js');
const { anthropicApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

runTests(Anthropic, anthropicApiKey, 'Anthropic', simplePrompt);
