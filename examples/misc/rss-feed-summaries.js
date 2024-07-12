/**
 * @file examples/misc/rss-feed-summaries.js
 * @description This example demonstrates automatic summarization generation using an RSS feed containing full-length articles. The example uses the "xml2js" module to process the RSS feed.
 *
 * To run this example, you need to install the required module by executing:
 *
 *    npm install xml2js dotenv
 */

const axios = require('axios');
const xml2js = require('xml2js');
const { LLMInterface } = require('../../src/index.js');
const {
  prettyHeader,
  prettyText,
  YELLOW,
  GREEN,
  RESET,
} = require('../../src/utils/utils.js');
require('dotenv').config({ path: '../../.env' });

// Setup your key and interface
const interfaceName = 'groq';
const apiKey = process.env.GROQ_API_KEY;

// RSS URL
const rssFeed = 'https://feeds.arstechnica.com/arstechnica/technology-lab';

// Example description
const description = `This example demonstrates automatic summarization generation using an RSS feed containing full-length articles. The example uses the "xml2js" module to process the RSS feed (artificially limited to 3 items). 

To run this example, you need to install the required module by executing: 

  npm install xml2js dotenv

The RSS feed used in this example is: ${YELLOW}${rssFeed}${RESET}`;

LLMInterface.setApiKey(interfaceName, apiKey);

/**
 * Fetches RSS feed data from the given URL.
 * @param {string} url - The URL of the RSS feed.
 * @returns {Promise<string>} - A promise that resolves to the RSS feed data as a string.
 * @throws {Error} - Throws an error if the request fails.
 */
async function fetchRssFeed(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

/**
 * Parses the given RSS feed XML data.
 * @param {string} xml - The RSS feed XML data as a string.
 * @returns {Promise<object>} - A promise that resolves to the parsed RSS feed data.
 * @throws {Error} - Throws an error if parsing fails.
 */
async function parseRssFeed(xml) {
  try {
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xml);
    return result.rss.channel[0];
  } catch (error) {
    console.error(error);
  }
}
/**
 * Prints a line of characters to the console.
 * @param {string} char - The character to use for the line.
 * @param {number} length - The length of the line. Defaults to the width of the console.
 */
function printLine(char = '-', length = process.stdout.columns) {
  console.log(char.repeat(length));
}

/**
 * Summarizes the given content using a language model interface.
 * @param {string} content - The content to summarize.
 * @returns {Promise<string>} - A promise that resolves to the summary of the content.
 * @throws {Error} - Throws an error if the summarization process fails.
 */
async function summarizeContent(content) {
  const prompt = `Carefully review the following article:

${content}

Create a short, factual summary based on the information provided in the article. Do not supplement it with any of your existing knowledge. Return just the summary, do not include any text like "Here's a summary:".
`;
  const summary = await LLMInterface.sendMessage(
    interfaceName,
    prompt,
    {
      max_tokens: 1024,
    },
    { cacheTimeoutSeconds: 86400 },
  );
  return summary;
}

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  prettyHeader('RSS Feed Summarization', description, false, interfaceName);
  console.log('\n');
  printLine();
  console.log('');

  try {
    const rssData = await fetchRssFeed(rssFeed);

    let channel = await parseRssFeed(rssData);

    prettyText(
      `${GREEN}${channel.title[0]}: ${channel.description[0]}${RESET}\n\n`,
    );

    let items = channel.item;

    items = items.slice(0, 3); // The items have been artifically reduced
    for (const item of items) {
      const title = item.title[0];
      const link = item.link[0];
      const content = item['content:encoded']
        ? item['content:encoded'][0]
        : item.description[0];

      const pubDate = item.pubDate[0];

      console.time('Timer');
      const summary = await summarizeContent(content);

      const originalLength = content.length;
      const summaryLength = summary.results.length;
      const reduction =
        ((originalLength - summaryLength) / originalLength) * 100;

      prettyText(
        `${GREEN}${title} (${reduction.toFixed(2)}% Reduction)${RESET}\n`,
      );
      prettyText(`${YELLOW}${link}${RESET}\n`);

      console.log(`${pubDate}\n${summary.results}\n`);

      console.timeEnd('Timer');
      console.log();
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

exampleUsage();
