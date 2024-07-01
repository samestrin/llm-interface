const fetch = require('node-fetch');
const xml2js = require('xml2js');
const dotenv = require('dotenv');
const { LLMInterface } = require('llm-interface');

dotenv.config();

const rssFeed = 'https://feeds.arstechnica.com/arstechnica/technology-lab';
const interface = 'groq';
const apiKey = process.env.GROQ_API_KEY;

LLMInterface.setApiKey(apiKey);

const fetchRssFeed = async (url) => {
  const response = await fetch(url);
  const data = await response.text();
  return data;
};

const parseRssFeed = async (xml) => {
  const parser = new xml2js.Parser();
  const result = await parser.parseStringPromise(xml);
  return result.rss.channel[0].item;
};

const summarizeContent = async (content) => {
  const prompt = `Summarize: ${content}`;
  const summary = await LLMInterface.sendMessage(interface, prompt, {
    max_tokens: 1024,
  });
  return summary;
};

const main = async () => {
  try {
    const rssData = await fetchRssFeed(rssFeed);
    const items = await parseRssFeed(rssData);

    for (const item of items) {
      const title = item.title[0];
      const link = item.link[0];
      const content = item['content:encoded'] ? item['content:encoded'][0] : item.description[0];

      const summary = await summarizeContent(content);

      console.log(`Title: ${title}`);
      console.log(`Link: ${link}`);
      console.log(`Summary: ${summary}`);
      console.log('---------------------------------------');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

main();
