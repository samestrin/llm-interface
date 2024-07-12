/**
 * @file examples/caching/simple-cache.js
 * @description This example demonstrates the usage of the SimpleCache for caching API responses.
 *
 * To run this example, you first need to install the required module by executing:
 *
 *    npm install dotenv
 *
 * SimpleCache is the default cache engine and does not require any additional setup. To use it, simply specify an
 * interfaceOptions.cacheTimeoutSeconds value. Subsequent runs of this script will be faster after the initial execution due to the caching mechanism.
 */

const { LLMInterface } = require('../../src/index.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const { prettyHeader, prettyResult } = require('../../src/utils/utils.js');

require('dotenv').config({ path: '../../.env' });

// Setup your key and interface
const interfaceName = 'groq';
const apiKey = process.env.GROQ_API_KEY;
const args = process.argv;

const description = `This example demonstrates the usage of the SimpleCache for caching API responses. SimpleCache is the default cache engine and does not require any additional setup. To use it, simply specify an interfaceOptions.cacheTimeoutSeconds value. Subsequent runs of this script will be faster after the initial execution due to the caching mechanism.

To run this example, you first need to install the required modules by executing:

  npm install dotenv

To flush the cache you can run this example with the "--flush-cache" argument.`;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  prettyHeader(
    'Simple Cache (Default Cache Engine) Example',
    description,
    simplePrompt,
    interfaceName,
  );

  LLMInterface.setApiKey(interfaceName, apiKey);
  LLMInterface.configureCache();

  const args = process.argv;

  try {
    console.time('Timer');
    const response = await LLMInterface.sendMessage(
      interfaceName,
      simplePrompt,
      {
        max_tokens: 100,
      },
      { cacheTimeoutSeconds: 86400 },
    );

    prettyResult(response.results);

    console.timeEnd('Timer');
    console.log();
  } catch (error) {
    console.error(error);
  }

  if (args.includes('--flush-cache')) {
    console.log('Cache flushed.');
    LLMInterface.flushCache();
  }
}

exampleUsage();
