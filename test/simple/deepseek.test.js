/**
 * @file test/simple/deepseek.test.js
 * @description Simplified tests for the DeepSeek AI API client.
 */

const DeepSeek = require('../../src/interfaces/deepseek.js');
const { deepseekApiKey } = require('../../src/utils/loadApiKeysFromEnv.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

runTests(DeepSeek, deepseekApiKey, 'DeepSeek', simplePrompt);
