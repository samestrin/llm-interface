/**
 * @file examples/moa/moa.js
 * @description Example showing use of Mixture of Agents (MoA) (https://www.together.ai/blog/together-moa) to improve response quality. In this example, three LLM providers are used. Gemini is used as the Proposer and the Aggregator. Gemini, Hugging Face, and Groq are used as the Agents. The Proposer attempts to break down a simplePrompt into supporting questions, then the Agents answer the questions, and the Aggregator synthesizes a final response. Upon completion of synthesis, a control response is requested from Gemini. Finally, Gemini is used to evaluate the differences between both responses and provide a report. The example can be run in two modes, 'fast' or 'comprehensive'; in 'fast' mode, the questions are spread across the LLM providers, in 'comprehensive' mode, every LLM provider must answer every question. The number of questions can vary, which may require multiple Agent requests.
 *
 * To run this example, you will need to install the required packages:
 *
 *    npm install markdown-to-text readline dotenv
 */

const { LLMInterface } = require('../../src/index.js');
const {
  startTimer,
  endTimer,
  compareSpeeds,
} = require('../../src/utils/timer.js');
const { getProposerResponse } = require('./utils/proposer');
const { compareResponses } = require('./utils/comparer');
const {
  getMoaResponsesFast,
  getMoaResponsesComprehensive,
} = require('./utils/moa');
const { getAggregatorResponse } = require('./utils/aggregator');
const { getControlResponse } = require('./utils/control');
const { removeMarkdownColor } = require('./utils/markdown');
const {
  prettyHeader,
  prettyText,
  GREEN,
  YELLOW,
  RESET,
} = require('../../src/utils/utils.js');
const { getModelByAlias } = require('../../src/utils/config.js');
const readline = require('readline');
require('dotenv').config({ path: '../../.env' });

// Run modes
const runMode = ['Comprehensive', 'Fast'];

// Setup roles
const proposer = 'gemini';
const moas = ['huggingface', 'groq', 'gemini'];
const aggregator = 'gemini';
const control = 'gemini';
const comparer = 'gemini';

// Setup API keys
LLMInterface.setApiKey({
  huggingface: process.env.HUGGINGFACE_API_KEY,
  groq: process.env.GROQ_API_KEY,
  gemini: process.env.GEMINI_API_KEY,
});

// Setup concurrency
const max_concurrent_moas = 2;

// Example description
const description = `Example showing use of Mixture of Agents (MoA) (https://www.together.ai/blog/together-moa) to improve response quality. The value of MoA increases significantly with the addition of more agents and responses.
Sure! Here’s a shortened version:

Leveraging diverse language models from multiple providers, each agent brings unique strengths, enhancing the quality and robustness of responses. Increasing the number of responses improves corpus comprehensiveness and coverage, ensuring diverse viewpoints and a more accurate, reliable synthesized output.

In this example, three LLM providers are used. Gemini is used as the Proposer and the Aggregator. Gemini, Hugging Face, and Groq are used as the Agents. The Proposer attempts to break down a simplePrompt into supporting questions, then the Agents answer the questions, and the Aggregator synthesizes a final MoA response. Upon completion of the MoA workflow, a control response is requested from Gemini, then Gemini is used again to evaluate the differences between both responses and provide a report.

The example can be run in two modes, 'fast' or 'comprehensive'; in 'fast' mode, the questions are spread across the LLM providers, in 'comprehensive' mode, every LLM provider must answer every question. Running the example in the two modes can highlight the value of increasing the number of providers and responses.

To run this example, you will need to install the required packages:

  npm install markdown-to-text readline dotenv`;

/**
 * Main exampleUsage() function.
 * @param {string} [mode='Fast'] - The mode of execution, either 'fast' or 'comprehensive'.
 * @returns {Promise<void>}
 */
async function exampleUsage(mode = 'Fast') {
  console.time('Timer (All)');
  prettyHeader(
    `Mixture of Agents (MoA) in '${mode}' mode Example`,
    description,
  );

  const aggStartTimer = startTimer();
  console.time('Timer');
  let questionsArray = [];
  const proposerQuestions = await getProposerResponse(proposer);
  if (proposerQuestions) {
    questionsArray = proposerQuestions.map((q) => q.question);
    const questionsString = questionsArray.join('\n');
    console.log(`> ${questionsString.replaceAll('\n', '\n> ')}\n`);
  } else {
    console.error("Error: Can't get questions from Proposer");
    return;
  }
  console.timeEnd('Timer');

  // Get MoA responses (supports two modes: 'fast' and 'comprehensive')
  console.time('Timer');

  prettyText(`\n${GREEN}Get MoA responses using '${mode}' mode${RESET}\n`);
  mode === 'Fast'
    ? prettyText(
      `${YELLOW}In 'fast' mode, each question will be answered once.${RESET}\n\n`,
    )
    : prettyText(
      `${YELLOW}In 'comprehensive' mode, each question will be answered N times, with N being the number of Agents.${RESET}\n\n`,
    );
  let moaResponses = [];

  if (mode === 'Fast') {
    moaResponses = await getMoaResponsesFast(
      moas,
      questionsArray,
      max_concurrent_moas,
    );
  } else if (mode === 'Comprehensive') {
    moaResponses = await getMoaResponsesComprehensive(
      moas,
      questionsArray,
      max_concurrent_moas,
    );
  }
  console.log();
  console.timeEnd('Timer');

  // Get Aggregator response
  console.time('Timer');
  prettyText(
    `\n${GREEN}Get Aggregator response using ${aggregator} and ${getModelByAlias(
      aggregator,
      'large',
    )}${RESET}\n`,
  );
  prettyText(`${YELLOW}Using small model aggregated MoA responses${RESET}\n\n`);

  const aggregatedFinalResponse = await getAggregatorResponse(
    moaResponses,
    aggregator,
  );
  if (aggregatedFinalResponse) {
    process.stdout.write(
      `\n> ${removeMarkdownColor(aggregatedFinalResponse).replaceAll(
        '\n',
        '\n> ',
      )}`,
    );
  } else {
    console.log("Error: Can't get aggregator response");
  }
  console.log('\n');
  console.timeEnd('Timer');
  console.log();
  const aggEndTimer = endTimer(aggStartTimer, 'Timer (MoAs)');
  console.log(`${aggEndTimer[0]}`);

  // Get the control response
  const controlStartTimer = startTimer();
  prettyText(
    `\n${GREEN}Get Control response using ${control} and ${getModelByAlias(
      control,
      'large',
    )}${RESET}\n`,
  );
  const controlResponse = await getControlResponse(control);
  if (controlResponse) {
    process.stdout.write(
      `\n> ${removeMarkdownColor(controlResponse).replaceAll('\n', '\n> ')}`,
    );
  } else {
    console.log("Error: Can't get control response");
  }

  const controlEndTimer = endTimer(
    controlStartTimer,
    'Timer (Control Response)',
  );
  console.log(`\n${controlEndTimer[0]}`);

  // Compare the results
  if (aggregatedFinalResponse && controlResponse) {
    console.time('Timer');
    prettyText(
      `\n${GREEN}Compare responses using ${comparer} and ${getModelByAlias(
        comparer,
        'default',
      )}${RESET}\n`,
    );
    prettyText(
      `${YELLOW}We are comparing small model aggregated MoA responses against a ${control} and ${getModelByAlias(
        control,
        'default',
      )} (which is the largest available model) based response${RESET}\n`,
    );

    const comparison = await compareResponses(
      aggregatedFinalResponse,
      controlResponse,
      comparer,
      control,
    );
    if (comparison) {
      process.stdout.write(
        `\n> ${removeMarkdownColor(comparison).replaceAll('\n', '\n> ')}`,
      );
    } else {
      console.log("Error: Can't get comparison response");
    }
    console.log('\n');
    console.log(
      `${compareSpeeds(
        ['MoA', aggEndTimer[1]],
        ['Control', controlEndTimer[1]],
      )}\n`,
    );
    console.timeEnd('Timer');
    console.log();
    console.timeEnd('Timer (All)');
    console.log();
  }
}

// Create an interface for reading input from the process.stdin
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to display choices and prompt for input
function promptUser(callback) {
  prettyHeader(`Mixture of Agents (MoA) Example`, description);
  console.log('\n');
  prettyText(`\n${GREEN}Select Mode:${RESET}\n\n`);
  runMode.forEach((choice, index) => {
    if (choice === 'Fast') {
      prettyText(
        `${index + 1
        }.) ${YELLOW}Fast${RESET} ---------- 1 Responses For Each Question\n`,
      );
    } else {
      prettyText(
        `${index + 1}.) ${YELLOW}Comprehensive${RESET} - ${moas.length
        } Responses For Each Question\n`,
      );
    }
  });
  console.log();

  rl.question('Enter the number of your choice: ', (answer) => {
    const choiceIndex = parseInt(answer, 10) - 1;

    if (choiceIndex >= 0 && choiceIndex < runMode.length) {
      rl.close();
      callback(null, runMode[choiceIndex]);
    } else {
      console.log('Invalid choice. Please try again.');
      promptUser(callback);
    }
  });
}

// Using the promptUser function with a callback
promptUser((err, selectedChoice) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log();
    exampleUsage(selectedChoice);
  }
});
