/**
 * @file examples/misc/rss-feed-summaries.js
 * @description Example showing automatic summarization generation. This example uses "xml2js" to process an RSS feed that contains full length articles. To run this example,
 * you will first need to run "npm install xml2js".
 */

const axios = require('axios');
const xml2js = require('xml2js');
const { LLMInterface } = require('../../src/index.js');

require('dotenv').config({ path: '../../.env' });

const rssFeed = 'https://feeds.arstechnica.com/arstechnica/technology-lab';
const interface = 'groq';
const apiKey = process.env.GROQ_API_KEY;

LLMInterface.setApiKey(interface, apiKey);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const fetchRssFeed = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

const parseRssFeed = async (xml) => {
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(xml);
  return result.rss.channel[0].item;
};

const summarizeContent = async (content) => {
  const prompt = `Carefully review the following article:

${content}

Create a short, factual summary based on the information provided in the article. Do not supplement it with any of your existing knowledge. Return just the summary, do not include any text like "Here's a summary:".
`;
  const summary = await LLMInterface.sendMessage(
    interface,
    prompt,
    {
      max_tokens: 1024,
    },
    { cacheTimeoutSeconds: 86400 },
  );
  sleep(500);
  return summary;
};

/**
 * Main exampleUsage() function.
 */
async function exampleUsage() {
  const description = `This example processes the RSS feed: ${rssFeed}. This feed contains full length articles, the following are LLM generated summaries.`;

  console.log('RSS Feed Summarization (Requires "npm install xml2js"):');
  console.log();
  console.log('Description:');
  console.log(`> ${description.replaceAll('\n', '\n> ')}`);
  console.log();
  console.log();
  console.log('---------------------------------------');
  console.log();

  try {
    const rssData = await fetchRssFeed(rssFeed);
    let items = await parseRssFeed(rssData);
    items = items.slice(0, 10);
    for (const item of items) {
      const title = item.title[0];
      const link = item.link[0];
      const content = item['content:encoded']
        ? item['content:encoded'][0]
        : item.description[0];

      const summary = await summarizeContent(content);

      console.log(`Title: ${title}`);
      console.log(`Link: ${link}`);
      console.log(`\n\n${summary.results}\n`);
      console.log(
        `[Results: Original ${content.length} chars vs. Summary ${summary.results.length} chars]\n`,
      );
      console.log('---------------------------------------');
      console.log();
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

exampleUsage();
