/**
 * @file openai.test.js
 * @description Simplified tests for the OpenAI API client.
 */

const OpenAI = require('../../src/interfaces/openai.js');
const { openaiApiKey } = require('../../src/config/config.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

runTests(OpenAI, openaiApiKey, 'OpenAI', simplePrompt);
