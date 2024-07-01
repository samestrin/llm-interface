/**
 * @file examples/chart-generation.js
 * @description Example showing
 */

const { VM } = require('vm2');
const { createCanvas } = require('canvas');
const fs = require('fs');

const { LLMInterface } = require('llm-interface');

require('dotenv').config({ path: '../.env' });

// Setup your key and interface
const interface = 'gemini';
const apiKey = process.env.GEMINI_API_KEY;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {

  const weatherData = [
    { day: "Day 1", temperature: 75, humidity: 55, windSpeed: 10 },
    { day: "Day 2", temperature: 78, humidity: 60, windSpeed: 7 },
    { day: "Day 3", temperature: 76, humidity: 52, windSpeed: 12 },
    { day: "Day 4", temperature: 80, humidity: 65, windSpeed: 9 },
    { day: "Day 5", temperature: 74, humidity: 58, windSpeed: 11 },
    { day: "Day 6", temperature: 79, humidity: 62, windSpeed: 8 },
    { day: "Day 7", temperature: 77, humidity: 54, windSpeed: 10 }
  ];

  const prompt = `Step 1. Assume I already have node.js and 'canva' installed. Assume the following data:

const weatherData = ${weatherData}

step 2. Write code to generate a chart using node.js. The output chat filename should be "chart.png".
step 3. Display the generated code; only the code, this is the a rule. Validate the works before displaying and show me only the validated results with not additional text.`;

  LLMInterface.setApiKey(interface, apiKey);
  let response;
  try {
    response = await LLMInterface.sendMessage(interface, prompt, {
      max_tokens: 4096,
    });
  } catch (error) {
    console.error('Error processing LLMInterface.sendMessage:', error);
  }
  try {
    // Create a new VM instance
    const vm = new VM({
      sandbox: {
        require,
        createCanvas,
        fs,
      },
      require: {
        external: true,
        root: "./"
      },
    });

    // Execute the code within the VM
    vm.run(code);
  } catch (error) {
    console.log(error)
  }
  if (fs.existsSync('chart.png')) {
    console.log('Chart has been saved as chart.png');
  } else {
    console.log('Failed to save the chart.');
  }
}
