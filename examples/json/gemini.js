/**
 * @file examples/json/native-json-output.js
 * @description This example demonstrates native JSON output by specifying JSON requirements in the prompt and enabling native JSON mode. This ensures server-side JSON validation but may return a null response if the result set exceeds the response token limit.
 *
 * To run this example, you first need to install the required module by executing:
 *
 *    npm install dotenv
 */

const { LLMInterface } = require('../../src/index.js');
const { simplePrompt } = require('../../src/utils/defaults.js');
const { prettyHeader, prettyResult } = require('../../src/utils/utils.js');

require('dotenv').config({ path: '../../.env' });

// Setup your key and interface
const interfaceName = 'cloudflare';
const apiKey = process.env.CLOUDFLARE_API_KEY;
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;

// Example description
const description = `This example demonstrates native JSON output by specifying JSON requirements in the prompt and enabling native JSON mode. This ensures server-side JSON validation but may return a null response if the result set exceeds the response token limit.

To run this example, you first need to install the required modules by executing:

  npm install dotenv

Note that not all providers support native JSON mode, so it is important to check the provider documentation.`;

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  let prompt = `${simplePrompt} Return 5 results.\n\nProvide the response as a valid JSON object; validate the object before responding.\n\nJSON Output Format: [{title, reason}]`;

  prettyHeader(
    'Native JSON Output Example',
    description,
    prompt,
    interfaceName,
  );

  LLMInterface.setApiKey(interfaceName, apiKey);

  let messageObject = {
    model: 'mistralai/Mistral-Nemo-Instruct-2407',
    messages: [
      {
        role: 'system',
        content:
          "You are an expert assistant assuming the roles of an expert 'GoFundTravel' crowdfunding copywriter, expert ghostwriter, expert editor, JSON data generator, and JSON validator to create, refine, validate, and return a single RFC8259 compliant JSON object adhering to the specified schema. Do not show any work, only return a single RFC8529 compliant JSON object.",
      },
      {
        role: 'user',
        content:
          '## Title\n' +
          'Family in need after devastating car accident\n' +
          '## Description\n' +
          'Hello I am Alondra. My aunt Giselle Toscano and uncle Luis Páez were hit by a drunk driver on the night of Tuesday June 4. My aunt is in critical condition and is fighting for her life. She has received multiple surgeries and is pending another major surgery in the next few days. She is facing a long recovery. Any help will be greatly appreciated during this difficult time for our family.\n' +
          '\n' +
          '## Schema\n' +
          '{\n' +
          '  "crowdfunding_description": {\n' +
          '    "title": "String - The main title of the crowdfunding campaign, summarizing the purpose or need.",\n' +
          '    "sections": [\n' +
          '      {\n' +
          '        "heading": "String - A heading for a specific section of the description, highlighting a key point or part of the story.",\n' +
          '        "paragraph": "String - A detailed paragraph providing more information and context related to the heading, sharing personal stories, updates, or specific needs."\n' +
          '      }\n' +
          '    ]\n' +
          '  }\n' +
          '}\n' +
          '## Steps\n' +
          "1. You are an **Expert Crowdfunding Copywriter**. Your task is to write an engaging 'GoFundTravel' crowdfunding campaign story based on the 'Title', and 'Description'. Properly format money and dates. \n" +
          '    1. The story should have 3 section(s), each with 1 paragraph(s) and _exactly 5 sentence(s)_.\n' +
          '    2. The tone should be optimistic, the style casual, and the language accessible.\n' +
          '    3. Write at a general public writing level. \n' +
          "    4. Count the sentences in each section creating a 'Count' for each.\n" +
          '2. You are an **Expert Ghostwriter**: Your task is to improve the campaign story by adding relevant sentences in the same writing style as the **Expert Crowdfunding Copywriter**. Evaluate each section:\n' +
          "    1. If the 'Count' for this section is less than 5, _add exactly (5 - 'Count') additional sentences_ to this section.\n" +
          "    2. Count the sentences in the updated section, this is now the 'Count' for this section.\n" +
          "    3. Repeat adding sentences until 'Count' has (5 - 'Count') sentences.\n" +
          "3. You are an **Expert Editor**. Your task is to review the 'Title' and 'Story' and create a 'Revised Story' that follows the 'Story Rules'. Follow these steps in order:\n" +
          "    1. **Strip Count from Sections**: Remove the 'Count' and its value from all sections.\n" +
          "    2. **Title and Content Optimization**: Optimize the 'Title' for a crowdfunding campaign. Revise the content to be conversational, as if chatting with a friend. Ensure the tone is optimistic, make complaints polite and constructive, and convert technical jargon into everyday language.\n" +
          '    3. **Grammar and Style**: Correct grammar mistakes, convert passive paragraphs to active ones, maintain a consistent voice, and streamline by removing repetitive statements.\n' +
          "4. You are a **JSON data generator**. Your task is to generate a valid JSON object from the 'Revised Story'. You have the following tasks:\n" +
          '    1. Ensure the JSON object conforms to the provided schema.\n' +
          "    2. Validate all fields to ensure 'String' is not used as a value for any field.\n" +
          '    3. Correct any invalid fields and return the valid JSON object.\n' +
          '5. You are a **JSON validator**. Your task is to detect, correct invalid JSON, and return a single valid JSON object. You have the following tasks:\n' +
          '    1. Review the JSON object and correct as needed\n' +
          "        1. Correct any missing {}'s\n" +
          '        2. Correct any invalid or undefined fields\n' +
          '        3. Correct any invalid or undefined values\n' +
          "    2. Validate the JSON object against the 'Schema'. Guarantee the JSON object is fully compliant with the schema.\n" +
          '    3. Return the JSON object.\n',
      },
    ],
    max_tokens: 1024,
    temperature: 1,
  };

  try {
    console.time('Timer');
    const response = await LLMInterface.sendMessage(
      interfaceName,
      messageObject,
      {
        max_tokens: 1024,
      },
      { attemptJsonRepair: true, includeOriginalResponse: true },
    );

    console.log(response.results);
    console.log();
    console.timeEnd('Timer');
    console.log();
  } catch (error) {
    console.error('Error processing LLMInterface.sendMessage:', error);
  }
}

exampleUsage();
