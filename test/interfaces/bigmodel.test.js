/**
 * @file test/interfaces/bigmodel.test.js
 * @description Tests for the Bigmodel API client.
 */

const Bigmodel = require('../../src/interfaces/bigmodel.js');
const { bigmodelApiKey } = require('../../src/config/config.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const runTests = require('./sharedTestCases.js');

const message = {
  messages: [
    {
      role: 'user',
      content: simplePrompt,
    },
  ],
};

runTests(Bigmodel, bigmodelApiKey, 'Bigmodel', 'glm-4', message);
