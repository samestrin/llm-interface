/**
 * @file examples/misc/chart-generation.js
 * @description Example showing chart generation using a static data set. This example uses Gemini to write Node.js code that creates a chart using "canvas" and "vm". To run this example,
 * you will first need to run "npm install canvas vm". "canvas" creates the chart, and "vm" isolates and runs the generated code securely.
 */

const fs = require('fs');
const vm = require('vm');
const os = require('os');
const path = require('path');
const { createCanvas } = require('canvas');
const { LLMInterface } = require('../../src/index.js');
require('dotenv').config({ path: '../../.env' });

const interface = 'gemini';
const apiKey = process.env.GEMINI_API_KEY;

/**
 * Removes code block markers from a given code string.
 * @param {string} code - The code string with code block markers.
 * @returns {string} - The code string without code block markers.
 */
function stripCodeBlockMarkers(code) {
  return code.replace(/(^```[a-z]*\s*)|(```$)/g, '');
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
Step 4. Set Requirements: The chart should be a bar chart and it should show the temperature, humidity, and windspeed for each day; assume that each day should show three individual bars, one for each. The chart should have a legend and a title. The chart should have a white background. The image should be large enough that the legend is easily readable and does not obscure anything else. At the end of the generated code include the line 'console.log("The file 'chart.png' was generated.")' after the chart is generated successfully.
Step 5. Write code to generate a chart using node.js. The chart should show the temperature, humidity, and windSpeed, for each day.
Step 6. Review the code your have written carefully, validating that it is 100% working Node.js using only "createCanvas" and "fs" that will sucessfully generate the desired chart. If you need to make any corrections, make them now, and restart Step 6.
Step 7. Display the generated code; only display the generated the code, this is the a rule. Do not show any additional text.`;

  console.log('Chart Generation (Requires "npm install canvas vm"):');
  console.log();
  console.log('Prompt:');
  console.log(`> ${prompt.replaceAll('\n', '\n> ')}`);
  console.log();

  LLMInterface.setApiKey(interface, apiKey);

  let response;

  try {
    response = await LLMInterface.sendMessage(
      interface,
      prompt,
      {
        max_tokens: 4096,
        model: 'large',
      },
      { cacheTimeoutSeconds: 86400 },
    );
  } catch (error) {
    console.error('Error processing LLMInterface.sendMessage:', error);
    return;
  }

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

  try {
    vm.createContext(sandbox); // Contextify the sandbox
    const script = new vm.Script(code);
    await script.runInContext(sandbox);
    console.log('Script executed successfully.');
  } catch (error) {
    console.error('Error running script:', error);
  }
}

exampleUsage();
