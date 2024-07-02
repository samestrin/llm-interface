/**
 * @file test/cache/openai.test.js
 * @description Tests for the caching mechanism in the Openai class.
 */

const Openai = require('../../src/interfaces/openai');
const { openaiApiKey } = require('../../src/config/config.js');
const runTests = require('./sharedTestCases.js');
runTests(Openai, openaiApiKey, 'Openai', 'davinci-002');
