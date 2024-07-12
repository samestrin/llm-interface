/**
 * @file examples/misc/chart-generation.js
 * @description This example demonstrates chart generation using a static data set. The example uses Gemini to write Node.js code that creates a chart using the "canvas" and "vm" modules.
 *
 * To run this example, you need to install the required modules by executing:
 *
 *    npm install canvas vm dotenv
 *
 * The "canvas" module is used to create the chart, and the "vm" module isolates and runs the generated code securely.
 */

const fs = require('fs');
const vm = require('vm');
const os = require('os');
const path = require('path');
const {
  prettyHeader,
  prettyText,
  YELLOW,
  RESET,
} = require('../../src/utils/utils.js');
const { createCanvas } = require('canvas');
const { promisify } = require('util');
const setImmediatePromise = promisify(setImmediate);

const { LLMInterface } = require('../../src/index.js');

require('dotenv').config({ path: '../../.env' });

// Setup your key and interface
const interfaceName = 'gemini';
const apiKey = process.env.GEMINI_API_KEY;

// Example description
const description = `This example demonstrates chart generation using a static data set. The example uses Gemini to write Node.js code that creates a chart using the "canvas" and "vm" modules.

To run this example, you need to install the required modules by executing:

  npm install canvas vm dotenv

The "canvas" module is used to create the chart, and the "vm" module isolates and runs the generated code securely.`;

/**
 * Removes code block markers from a given code string.
 * @param {string} code - The code string with code block markers.
 * @returns {string} - The code string without code block markers.
 */
function stripCodeBlockMarkers(code) {
  return code.replace(/(^```[a-z]*\s*)|(```$)/g, '');
}

/**
 * Runs a script in a sandboxed context and waits for it to complete.
 * @param {string} code - The JavaScript code to run.
 * @param {object} sandbox - The sandbox context in which to run the code.
 * @returns {Promise<void>} - A promise that resolves when the script has completed execution.
 */
async function runScriptInSandbox(code, sandbox) {
  try {
    vm.createContext(sandbox); // Contextify the sandbox
    const script = new vm.Script(code);

    // Running the script in an async manner
    const result = script.runInContext(sandbox);
    if (result && typeof result.then === 'function') {
      await result;
    } else {
      // If the script does not return a promise, we can use setImmediate to yield control
      await setImmediatePromise();
    }

    console.log('Script executed successfully.\n');
  } catch (error) {
    console.error(`Script failed: ${error}\n`);
  }
}

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  const weatherData = [
    { day: 'Day 1', temperature: 65, humidity: 55, windSpeed: 10 },
    { day: 'Day 2', temperature: 70, humidity: 60, windSpeed: 7 },
    { day: 'Day 3', temperature: 76, humidity: 52, windSpeed: 12 },
    { day: 'Day 4', temperature: 80, humidity: 65, windSpeed: 9 },
    { day: 'Day 5', temperature: 65, humidity: 58, windSpeed: 11 },
    { day: 'Day 6', temperature: 89, humidity: 62, windSpeed: 8 },
    { day: 'Day 7', temperature: 50, humidity: 54, windSpeed: 10 },
  ];

  const prompt = `You are an expert javascript developer, and you will be writing node.js code to create a chart.

Step 1. Assume the environment already has:

const { createCanvas } = require('canvas');
const fs = require('fs');

Step 2. Assume the following data:

const weatherData = ${JSON.stringify(weatherData)}

Step 3. Assume the output filename should be "chart.png".
Step 4. Set Requirements: The chart should be a bar chart and it should show the temperature, humidity, and windspeed for each day; assume that each day should show three individual bars, one for each. The chart should have a legend and a title. The chart should have a white background. The image should be large enough that the legend is easily readable and does not obscure anything else. At the end of the generated code include the line 'console.log("The file 'chart.png' was generated.\\n")' after the chart is generated successfully.
Step 5. Write code to generate a chart using node.js. The chart should show the temperature, humidity, and windSpeed, for each day.
Step 6. Review the code your have written carefully, validating that it is 100% working Node.js using only "createCanvas" and "fs" that will successfully generate the desired chart. If you need to make any corrections, make them now, and restart Step 6.
Step 7. Display the generated code; only display the generated the code, this is the a rule. Do not show any additional text.`;

  prettyHeader('Chart Generation', description, prompt, interfaceName);

  LLMInterface.setApiKey(interfaceName, apiKey);

  let response;
  try {
    prettyText(`\n${YELLOW}Generating Node.js code${RESET}\n\n`);
    console.time('Timer');
    response = await LLMInterface.sendMessage(
      interfaceName,
      prompt,
      {
        max_tokens: 4096,
        model: 'large',
      },
      { cacheTimeoutSeconds: 86400 },
    );
    console.timeEnd('Timer');
  } catch (error) {
    console.error('Error processing LLMInterface.sendMessage:', error);
    return;
  }

  prettyText(`\n${YELLOW}Executing Node.js code in a VM sandbox${RESET}\n\n`);
  console.time('Timer');

  const code = stripCodeBlockMarkers(response.results);

  if (!code) {
    console.error('No code generated from LLMInterface');
    return;
  }

  // Create a sandboxed context and execute the script
  const sandbox = {
    require,
    console,
    createCanvas,
    fs,
    Buffer,
  };

  await runScriptInSandbox(code, sandbox);
  console.timeEnd('Timer');
  console.log();
}

exampleUsage();
