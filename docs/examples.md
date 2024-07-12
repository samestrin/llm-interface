# Examples

## Table of Contents

  - [Using LLMInterface](#using-llminterface)
    - [Basic Usage](#basic-usage)
      - [Chat](#chat)
      - [Prompt](#prompt)
      - [Streaming Mode](#streaming-mode)
    - [Embeddings](#embeddings)
      - [Embeddings](#embeddings-1)
      - [Embeddings Failover](#embeddings-failover)
      - [Embeddings Custom Failover](#embeddings-custom-failover)
    - [Caching](#caching)
      - [Simple Cache](#simple-cache)
      - [Memory Cache](#memory-cache)
      - [Flat Cache](#flat-cache)
      - [Cache Manager](#cache-manager)
    - [Interface Options](#interface-options)
      - [Auto Retry Failed Requests](#auto-retry-failed-requests)
      - [Include Original Response](#include-original-response)
      - [JSON Repair](#json-repair)
    - [JSON](#json)
      - [JSON Output](#json-output)
      - [JSON Repair](#json-repair-1)
      - [Native JSON Output](#native-json-output)
  - [What Can You Do with LLMInterface?](#what-can-you-do-with-llminterface)
    - [Langchain.js](#langchainjs)
      - [Retrieval-Augmented Generation (RAG)](#retrieval-augmented-generation-rag)
    - [Mixture of Agents (MoA)](#mixture-of-agents-moa)
      - [Mixture of Agents (MoA)](#mixture-of-agents-moa-1)
    - [Miscellaneous](#miscellaneous)
      - [Chart Generation](#chart-generation)
      - [RSS Feed Summarization](#rss-feed-summarization)

## Using LLMInterface

The following examples focus on LLMInterface usage.

### Basic Usage

- **[Chat](/examples/basic-usage/chat.js)**: Basic LLMInterface.sendMessage() chat usage. This example features an OpenAI compatible structure.
- **[Prompt](/examples/basic-usage/prompt.js)**: Basic LLMInterface.sendMessage() prompt usage.
- **[Streaming Mode](/examples/basic-usage/steaming-mode.js)**: LLMInterface.sendMessage() streaming mode prompt usage.

### Embeddings

- **[Embeddings](/examples/embeddings/embeddings.js)**: Basic LLMInterface.embeddings() usage example.
- **[Embeddings Failover](/examples/embeddings/embeddings-failover.js)**: LLMInterface.embeddings() with default failover usage example.
- **[Embeddings Custom Failover](/examples/embeddings/embeddings-custom-failover.js)**: LLMInterface.embeddings() with custom failover usage example.

### Caching

- **[Simple Cache](/examples/caching/simple-cache.js)**: Default file-based cache usage example.
- **[Memory Cache](/examples/caching/memory-cache.js)**: High-speed in-memory cache usage example.
- **[Flat Cache](/examples/caching/flat-cache.js)**: NPM `flat-cache`, a JSON flat file cache, usage example. ([Node Package](https**://www.npmjs.com/package/flat-cache))
- **[Cache Manager](/examples/caching/cache-manager.js)**: NPM `cache-manager`, an advanced caching system supporting multiple backends including MongoDB, Memcache, Redis, SQLite, and more, usage example. ([Node Package](https**://www.npmjs.com/package/cache-manager))

### Interface Options

- **[Auto Retry Failed Requests](/examples/interface-options/auto-retry-failed-requests.js)**: Controlling retries with _interfaceOptions.retryAttempts_ and _interfaceOptions.retryMultiplier_ usage example.
- **[Include Original Response](/examples/interface-options/include-original-response.js)**: Including the complete original response with _interfaceOptions.includeOriginalResponse_ usage example.
- **[JSON Repair](/examples/interface-options/json-repair.js)**: Repairing badly formed JSON with _interfaceOptions.attemptJsonRepair_ usage example.

### JSON

- **[JSON Output](/examples/json/json-output.js)**: Requesting a JSON response using the prompt usage example.
- **[JSON Repair](/examples/json/json-repair.js)**: Repairing badly formed JSON with interfaceOptions.attemptJsonRepair usage example.
- **[Native JSON Output](/examples/json/native-json-output.js)**: Requesting a JSON response with _options.response_format_ usage example.

## What Can You Do with LLMInterface?

The following are some examples using LLMInterface.

### Langchain.js

- **[Retrieval-Augmented Generation (RAG)](/examples/langchain/rag.js)**: Example demonstrating Retrieval-Augmented Generation (RAG) using Langchain.js `PromptTemplate` and `LLMChain`.

### Mixture of Agents (MoA)

- **[Mixture of Agents (MoA)](/examples/moa/moa.js)**: Example demonstrating the Mixture of Agents (MoA) concept to improve response quality.

### Miscellaneous

- **[Chart Generation](/examples/misc/chart-generation.js)**: Example demonstrating Node.js code generation, sandboxed execution, and chart generation.
- **[RSS Feed Summarization](/examples/misc/rss-feed-summarization.js)**: Example demonstrating RSS feed summarization.
