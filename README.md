# llm-interface

[![Star on GitHub](https://img.shields.io/github/stars/samestrin/llm-interface?style=social)](https://github.com/samestrin/llm-interface/stargazers) [![Fork on GitHub](https://img.shields.io/github/forks/samestrin/llm-interface?style=social)](https://github.com/samestrin/llm-interface/network/members) [![Watch on GitHub](https://img.shields.io/github/watchers/samestrin/llm-interface?style=social)](https://github.com/samestrin/llm-interface/watchers)

![Version 2.0.10](https://img.shields.io/badge/Version-2.0.10-blue) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Built with Node.js](https://img.shields.io/badge/Built%20with-Node.js-green)](https://nodejs.org/)

## Introduction

`llm-interface` is a wrapper designed to interact with multiple Large Language Model (LLM) APIs. `llm-interface` simplifies integrating various LLM providers, including **AI21 Studio, AiLAYER, AIMLAPI, Anyscale, Anthropic, Microsoft Azure AI, Cloudflare AI, Cohere, Corcel, DeepInfra, DeepSeek, Fireworks AI, Forefront AI, FriendliAI, Google Gemini, GooseAI, Groq, Hugging Face Inference API, HyperBee AI, Lamini, LLaMA.CPP, Mistral AI, Monster API, Neets.ai, Novita AI, NVIDIA AI, OctoAI, Ollama, OpenAI, Perplexity AI, Reka AI, Replicate, Shuttle AI, TheB.ai, Together AI, Voyage AI, Watsonx AI, Writer, and Zhipu AI**, into your applications. It is available as an [NPM package](https://www.npmjs.com/package/llm-interface).

This goal of `llm-interface` is to provide a single, simple, unified interface for sending messages and receiving responses from different LLM services. This will make it easier for developers to work with multiple LLMs without worrying about the specific intricacies of each API.

## Supporting

<!-- Support List -->
![AI21 Studio](https://samestrin.github.io/media/llm-interface/icons/ai21.png) ![AIMLAPI](https://samestrin.github.io/media/llm-interface/icons/aimlapi.png) ![Anthropic](https://samestrin.github.io/media/llm-interface/icons/anthropic.png) ![Anyscale](https://samestrin.github.io/media/llm-interface/icons/anyscale.png) ![Cloudflare AI](https://samestrin.github.io/media/llm-interface/icons/cloudflareai.png) ![Cohere](https://samestrin.github.io/media/llm-interface/icons/cohere.png) ![Corcel](https://samestrin.github.io/media/llm-interface/icons/corcel.png) ![DeepInfra](https://samestrin.github.io/media/llm-interface/icons/deepinfra.png) ![DeepSeek](https://samestrin.github.io/media/llm-interface/icons/deepseek.png) ![Forefront AI](https://samestrin.github.io/media/llm-interface/icons/forefront.png) ![GooseAI](https://samestrin.github.io/media/llm-interface/icons/gooseai.png) ![Lamini](https://samestrin.github.io/media/llm-interface/icons/lamini.png) ![Mistral AI](https://samestrin.github.io/media/llm-interface/icons/mistralai.png) ![Monster API](https://samestrin.github.io/media/llm-interface/icons/monsterapi.png) ![Neets.ai](https://samestrin.github.io/media/llm-interface/icons/neetsai.png) ![Perplexity AI](https://samestrin.github.io/media/llm-interface/icons/perplexity.png) ![Reka AI](https://samestrin.github.io/media/llm-interface/icons/rekaai.png) ![Replicate](https://samestrin.github.io/media/llm-interface/icons/replicate.png) ![Shuttle AI](https://samestrin.github.io/media/llm-interface/icons/shuttleai.png) ![Together AI](https://samestrin.github.io/media/llm-interface/icons/togetherai.png) ![Writer](https://samestrin.github.io/media/llm-interface/icons/writer.png)
<!-- Support List End -->

and more ...

## Features

- **Unified Interface**: `LLMInterface.sendMessage` is a single, consistent interface to interact with **36 different LLM APIs** (34 hosted LLM providers and 2 local LLM providers).
- **Dynamic Module Loading**: Automatically loads and manages LLM interfaces only when they are invoked, minimizing resource usage.
- **Error Handling**: Robust error handling mechanisms to ensure reliable API interactions.
- **Extensible**: Easily extendable to support additional LLM providers as needed.
- **Response Caching**: Efficiently caches LLM responses to reduce costs and enhance performance.
- **Graceful Retries**: Automatically retry failed prompts with increasing delays to ensure successful responses.
- **JSON Output**: Simple to use native JSON output for various LLM providers  including OpenAI, Fireworks AI, Google Gemini, and more.
- **JSON Repair**: Detect and repair invalid JSON responses.

## Updates

**v2.0.10**

- **New LLM Providers**: Anyscale, Bigmodel, Corcel, Deepseek, Hyperbee AI, Lamini, Neets AI, Novita AI, NVIDIA, Shuttle AI, TheB.AI, and Together AI.
- **Caching**: Supports multiple caches: `simple-cache`, `flat-cache`, and `cache-manager`. _`flat-cache` is now an optional package._
- **Logging**: Improved logging with the `loglevel`.
- **More Examples**: [LangChain integrations](/examples/langchain), [Mixture-of-Authorities (MoA)](/examples/moa), [caching](/examples/caching), [interfaceOptions](/examples/interface-options), and [more](/examples/misc).
- **Removed Dependency**: `@anthropic-ai/sdk` is no longer required.

**v2.0.9**

- **New LLM Providers**: Added support for AIML API (_currently not respecting option values_), DeepSeek, Forefront, Ollama, Replicate, and Writer.
- **New LLMInterface Methods**: `LLMInterface.setApiKey`, `LLMInterface.sendMesage`, and `LLMInterface.streamMessage`.
- **Streaming**: Streaming support available for: AI21 Studio, AIML API, DeepInfra, DeepSeek, Fireworks AI, FriendliAI, Groq, Hugging Face, LLaMa.CPP, Mistral AI, Monster API, NVIDIA,
Octo AI, Ollama, OpenAI, Perplexity, Together AI, and Writer.
- **New Interface Function**: `LLMInterfaceStreamMessage`
- **Test Coverage**: 100% test coverage for all interface classes.
- **Examples**: New usage [examples](/examples).

## Dependencies

The project relies on several npm packages and APIs. Here are the primary dependencies:

- `axios`: For making HTTP requests (used for various HTTP AI APIs).
- `@google/generative-ai`: SDK for interacting with the Google Gemini API.
- `dotenv`: For managing environment variables. Used by test cases.
- `jsonrepair`: Used to repair invalid JSON responses.
- `loglevel`:  A minimal, lightweight logging library with level-based logging and filtering.
- `jest`: For running test cases.

The following packages can added to extend LLMInterface's caching capabilities:

- `flat-cache`: A simple JSON based cache.
- `cache-manager`: An extendible cache module that supports various backends including Redis, MongoDB, File System, Memcached, Sqlite, and more.

## Installation

To install the `llm-interface` package, you can use npm:

```bash
npm install llm-interface
```
## Quick Start

- Looking for [API Keys](/docs/api-keys.md)? This document provides helpful links.
- Detailed [usage](/docs/usage.md) documentation is available here.
- Various [examples](/examples) are also available to help you get started.
- A breakdown of [model aliaes](/docs/models.md) aliases is avilable here.
- If you still need more examples, you may wish to review the [test cases](/test/) for further examples.

## Usage

### Example

First import `LLMInterface`. You can do this using either the CommonJS `require` syntax:

```javascript
const { LLMInterface } = require('llm-interface');
```

or the ES6 `import` syntax:

```javascript
import { LLMInterface } from 'llm-interface';
```

then send your prompt to the LLM provider:

```javascript

LLMInterface.setApiKey({'openai': process.env.OPENAI_API_KEY});

try {
  const response = LLMInterface.sendMessage('openai', 'Explain the importance of low latency LLMs.');
} catch (error) {
  console.error(error);
}
```
if you prefer a one-liner, you use:

```javascript
  const response = LLMInterface.sendMessage(['openai',process.env.OPENAI_API_KEY], 'Explain the importance of low latency LLMs.');
```
after you've set the API key once, you can use the simplified format moving forward.

```javascript
  const response = LLMInterface.sendMessage('openai', 'Explain the importance of low latency LLMs.');
```

Passing a more complex message object is just as simple. The same rules apply:

```javascript
const message = {
  model: 'gpt-3.5-turbo',
  messages: [
    { role: 'system', content: 'You are a helpful assistant.' },
    { role: 'user', content: 'Explain the importance of low latency LLMs.' },
  ],
};

try {
  const response = LLMInterface.sendMessage('openai', message, { max_tokens: 150 });
} catch (error) {
  console.error(error);
}
```
_LLMInterfaceSendMessage and LLMInterfaceStreamMessage are still available and will be available until version 3_

## Running Tests

The project includes tests for each LLM handler. To run the tests, use the following command:

```bash
npm test
```

#### Current Test Results

```bash
Test Suites: 9 skipped, 93 passed, 93 of 102 total
Tests:       32 skipped, 458 passed, 490 total
Snapshots:   0 total
Time:        153.963 s
```

_Note: Currently skipping NVIDIA test cases due to API issues._

## Contribute

Contributions to this project are welcome. Please fork the repository and submit a pull request with your changes or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.

## Blogs

- [Comparing 13 LLM Providers API Performance with Node.js: Latency and Response Times Across Models](https://dev.to/samestrin/comparing-13-llm-providers-api-performance-with-nodejs-latency-and-response-times-across-models-2ka4)

## Share

[![Twitter](https://img.shields.io/badge/X-Tweet-blue)](https://twitter.com/intent/tweet?text=Check%20out%20this%20awesome%20project!&url=https://github.com/samestrin/llm-interface) [![Facebook](https://img.shields.io/badge/Facebook-Share-blue)](https://www.facebook.com/sharer/sharer.php?u=https://github.com/samestrin/llm-interface) [![LinkedIn](https://img.shields.io/badge/LinkedIn-Share-blue)](https://www.linkedin.com/sharing/share-offsite/?url=https://github.com/samestrin/llm-interface)
