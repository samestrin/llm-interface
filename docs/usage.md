# LLM Interface Usage Documentation

## Table of Contents

- [LLMInterface](#llminterface)
  - [getAllModelNames()](#getallmodelnames)
  - [getInterfaceConfigValue(interfaceName, key)](#getInterfaceConfigValueinterfacename-key)
  - [setApiKey(interfaceNames, apiKey)](#setapikeyinterfacenames-apikey)
  - [setEmbeddingsModelAlias(interfaceName, alias, name)](#setembeddingsmodelaliasinterfacename-alias-name)
  - [setModelAlias(interfaceName, alias, name)](#setmodelaliasinterfacename-alias-name)
  - [configureCache(cacheConfig = {})](#configurecachecacheconfig--)
  - [flushCache()](#flushcache)
  - [sendMessage(interfaceName, message, options = {}, interfaceOptions = {})](#sendmessageinterfacename-message-options---interfaceoptions--)
  - [streamMessage(interfaceName, message, options = {})](#streammessageinterfacename-message-options--)
  - [embedding(interfaceName, embeddingString, options = {}, interfaceOptions = {})](#embeddinginterfacename-embeddingstring-options---interfaceoptions--)
  - [chat.completions.create(interfaceName, message, options = {}, interfaceOptions = {})](#chatcompletionscreateinterfacename-message-options---interfaceoptions--)
  - [Supported Interface Names](#supported-interface-names)
- [LLMInterfaceSendMessage](#llminterfacesendmessage)
  - [LLMInterfaceSendMessage(interfaceName, apiKey, message, options = {}, interfaceOptions = {})](#llminterfacesendmessageinterfacename-apikey-message-options---interfaceoptions--)
- [LLMInterfaceStreamMessage](#llminterfacestreammessage)
  - [LLMInterfaceStreamMessage(interfaceName, apiKey, message, options = {})](#llminterfacestreammessageinterfacename-apikey-message-options--)
- [Message Object](#message-object)
  - [Structure of a Message Object](#structure-of-a-message-object)
- [Options Object](#options-object)
  - [Structure of an Options Object](#structure-of-an-options-object)
- [Interface Options Object](#interface-options-object)
  - [Structure of an Interface Options Object](#structure-of-an-interface-options-object)
- [Caching](#caching)
  - [Simple Cache](#simple-cache)
    - [Example Usage](#example-usage-1)
  - [Flat Cache](#flat-cache)
    - [Installation](#installation-1)
    - [Example Usage](#example-usage-2)
  - [Cache Manager](#cache-manager)
    - [Installation](#installation-2)
    - [Example Usage](#example-usage-3)
    - [Advanced Backends](#advanced-backends)
      - [Redis](#redis)
      - [Memcached](#memcached)
      - [MongoDB](#mongodb)
  - [Memory Cache](#memory-cache)
    - [Example Usage](#example-usage-4)
- [Examples](#examples)

## LLMInterface

To use the `LLMInterface.*` functions, first import `LLMInterface`. You can do this using either the CommonJS `require` syntax:

```javascript
const { LLMInterface } = require('llm-interface');
```

or the ES6 `import` syntax:

```javascript
import { LLMInterface } from 'llm-interface';
```

### getAllModelNames()

Retrieves a sorted list of all model names available in the configuration.

```javascript
const modelNames = LLMInterface.getAllModelNames();
console.log(modelNames);
```

### getInterfaceConfigValue(interfaceName, key)

Retrieves a specific configuration value for a given model.

- `interfaceName` (String): The name of the model.
- `key` (String): The configuration key to retrieve.

```javascript
const apiKey = LLMInterface.getInterfaceConfigValue('openai', 'apiKey');
console.log(apiKey);
```

### setApiKey(interfaceNames, apiKey)

Sets the API key for one or multiple interfaces.

- `interfaceNames` (String|Object): The name of the interface or an object mapping interface names to API keys.
- `apiKey` (String): The API key.

```javascript
LLMInterface.setApiKey('openai', 'your-api-key');
// or
LLMInterface.setApiKey({ openai: 'your-api-key', cohere: 'another-api-key' });
```

### setEmbeddingsModelAlias(interfaceName, alias, name)

Sets an alias for a model within a specific interface.

- `interfaceName` (String): The name of the interface.
- `alias` (String): The alias to set.
- `name` (String): The model name.

```javascript
LLMInterface.setEmbeddingsModelAlias('openai', 'default', 'text-embedding-3-large');
```

### setModelAlias(interfaceName, alias, name)

Sets an alias for a model within a specific interface.

- `interfaceName` (String): The name of the interface.
- `alias` (String): The alias to set.
- `name` (String): The model name.

```javascript
LLMInterface.setModelAlias('openai', 'default', 'gpt-3.5-turbo');
```

### configureCache(cacheConfig = {})

Configures the cache system for the session. LLMInterface supports three caching mechanisms: `simple-cache`, `flat-cache`, and `cache-manager`. To use `flat-cache` or `cache-manager`, you need to install the corresponding packages.

- `cacheConfig` (Object): Configuration options for the cache.

```javascript
LLMInterface.configureCache({ cache: 'simple-cache', path: './cache' });
```

### flushCache()

Clears the active cache for the session. Ensure you run LLMInterface.configureCache() beforehand.

```javascript
LLMInterface.flushCache();
```

### sendMessage(interfaceName, message, options = {}, interfaceOptions = {})

Sends a message to a specified interface and returns the response. _The specified interface must already have its API key set, or it must be passed using the array format._

- `interfaceName` (String|Array): The name of the LLM interface or an array containing the name of the LLM interface and the API key.
- `message` (String|Object): The message to send.
- `options` (Object|number, optional): Additional options for the embedding generation. If a number, it represents the cache timeout in seconds.
- `interfaceOptions` (Object, optional): Interface-specific options.

```javascript
// use this after you've set your API key
try {
  const response = await LLMInterface.sendMessage('openai', 'Hello, world!', {
    max_tokens: 100,
  });
  console.log(response.results);
} catch (error) {
  console.error(error.message);
}
// or use this to set your API key in the same command
try {
  const response = await LLMInterface.sendMessage(
    ['openai', 'your-api-key'],
    'Hello, world!',
    { max_tokens: 100 },
  );
  console.log(response.results);
} catch (error) {
  console.error(error.message);
}
```

### streamMessage(interfaceName, message, options = {})

Streams a message to a specified interface and returns the response stream. _You can also stream responses using LLMInterface.sendMessage, just pass options.stream=true._

- `interfaceName` (String): The name of the LLM interface.
- `message` (String|Object): The message to send.
- `options` (Object|number, optional): Additional options for the embedding generation. If a number, it represents the cache timeout in seconds.

```javascript
try {
  const stream = await LLMInterface.streamMessage('openai', 'Hello, world!', {
    max_tokens: 100,
  });
  const result = await processStream(stream.data);
} catch (error) {
  console.error(error.message);
}
```

_processStream(stream) is not part of LLMInterface. It is defined in the[streaming mode example](/examples/misc/streaming-mode.js)._

### embedding(interfaceName, embeddingString, options = {}, interfaceOptions = {})

Generates embeddings using a specified LLM interface.

- `interfaceName` (String): The name of the LLM interface to use.
- `embeddingString` (String): The string to generate embeddings for.
- `options` (Object|number, optional): Additional options for the embedding generation. If a number, it represents the cache timeout in seconds.
- `interfaceOptions` (Object, optional): Options specific to the LLM interface.
- `defaultProvider` (String, optional): The default provider to use if the specified interface doesn't support embeddings. Defaults to 'voyage'.

```javascript
try {
  const embeddings = await LLMInterface.embedding('openai', 'Text to embed', {
    max_tokens: 100,
  });
  console.log(embeddings);
} catch (error) {
  console.error(error.message);
}
```

### chat.completions.create(interfaceName, message, options = {}, interfaceOptions = {})

Alias for `LLMInterface.sendMessage` (For those OpenAI fans :)).

```javascript
const response = await LLMInterface.chat.completions.create(
  'openai',
  'Hello, world!',
  { max_tokens: 100 },
);
console.log(response.results);
```

### Supported Interface Names

The following are the interfaceNames for each supported LLM provider (in alphabetical order):

|  | Interface Name | Provider Name | [.sendMessage](#sendmessageinterfacename-message-options---interfaceoptions--) | [.embeddings](#embeddinginterfacename-embeddingstring-options---interfaceoptions--)
| --- | --- | --- | --- | --- |
| ![ai21](https://samestrin.github.io/media/llm-interface/icons/ai21.png) | `ai21` | [AI21 Studio](providers/ai21.md) | - [x] | - [x] |
|  | `ailayer` | [AiLAYER](providers/ailayer.md) | - [x] | - [ ] |
| ![aimlapi](https://samestrin.github.io/media/llm-interface/icons/aimlapi.png) | `aimlapi` | [AIMLAPI](providers/aimlapi.md) | - [x] | - [x] |
| ![anthropic](https://samestrin.github.io/media/llm-interface/icons/anthropic.png) | `anthropic` | [Anthropic](providers/anthropic.md) | - [x] | - [ ] |
| ![anyscale](https://samestrin.github.io/media/llm-interface/icons/anyscale.png) | `anyscale` | [Anyscale](providers/anyscale.md) | - [x] | - [x] |
| ![cloudflareai](https://samestrin.github.io/media/llm-interface/icons/cloudflareai.png) | `cloudflareai` | [Cloudflare AI](providers/cloudflareai.md) | - [x] | - [x] |
| ![cohere](https://samestrin.github.io/media/llm-interface/icons/cohere.png) | `cohere` | [Cohere](providers/cohere.md) | - [x] | - [x] |
| ![corcel](https://samestrin.github.io/media/llm-interface/icons/corcel.png) | `corcel` | [Corcel](providers/corcel.md) | - [x] | - [ ] |
| ![deepinfra](https://samestrin.github.io/media/llm-interface/icons/deepinfra.png) | `deepinfra` | [DeepInfra](providers/deepinfra.md) | - [x] | - [x] |
| ![deepseek](https://samestrin.github.io/media/llm-interface/icons/deepseek.png) | `deepseek` | [DeepSeek](providers/deepseek.md) | - [x] | - [ ] |
|  | `fireworksai` | [Fireworks AI](providers/fireworksai.md) | - [x] | - [x] |
| ![forefront](https://samestrin.github.io/media/llm-interface/icons/forefront.png) | `forefront` | [Forefront AI](providers/forefront.md) | - [x] | - [ ] |
|  | `friendliai` | [FriendliAI](providers/friendliai.md) | - [x] | - [ ] |
|  | `gemini` | [Google Gemini](providers/gemini.md) | - [x] | - [x] |
| ![gooseai](https://samestrin.github.io/media/llm-interface/icons/gooseai.png) | `gooseai` | [GooseAI](providers/gooseai.md) | - [x] | - [ ] |
|  | `groq` | [Groq](providers/groq.md) | - [x] | - [ ] |
|  | `huggingface` | [Hugging Face Inference](providers/huggingface.md) | - [x] | - [x] |
|  | `hyperbeeai` | [HyperBee AI](providers/hyperbeeai.md) | - [x] | - [ ] |
| ![lamini](https://samestrin.github.io/media/llm-interface/icons/lamini.png) | `lamini` | [Lamini](providers/lamini.md) | - [x] | - [x] |
|  | `llamacpp` | [LLaMA.CPP](providers/llamacpp.md) | - [x] | - [x] |
|  | `azureai` | [Microsoft Azure AI](providers/azureai.md) | - [x] | - [x] |
| ![mistralai](https://samestrin.github.io/media/llm-interface/icons/mistralai.png) | `mistralai` | [Mistral AI](providers/mistralai.md) | - [x] | - [x] |
| ![monsterapi](https://samestrin.github.io/media/llm-interface/icons/monsterapi.png) | `monsterapi` | [Monster API](providers/monsterapi.md) | - [x] | - [ ] |
| ![neetsai](https://samestrin.github.io/media/llm-interface/icons/neetsai.png) | `neetsai` | [Neets.ai](providers/neetsai.md) | - [x] | - [ ] |
|  | `novitaai` | [Novita AI](providers/novitaai.md) | - [x] | - [ ] |
|  | `nvidia` | [NVIDIA AI](providers/nvidia.md) | - [x] | - [ ] |
|  | `octoai` | [OctoAI](providers/octoai.md) | - [x] | - [ ] |
|  | `ollama` | [Ollama](providers/ollama.md) | - [x] | - [x] |
|  | `openai` | [OpenAI](providers/openai.md) | - [x] | - [x] |
| ![perplexity](https://samestrin.github.io/media/llm-interface/icons/perplexity.png) | `perplexity` | [Perplexity AI](providers/perplexity.md) | - [x] | - [ ] |
| ![rekaai](https://samestrin.github.io/media/llm-interface/icons/rekaai.png) | `rekaai` | [Reka AI](providers/rekaai.md) | - [x] | - [ ] |
| ![replicate](https://samestrin.github.io/media/llm-interface/icons/replicate.png) | `replicate` | [Replicate](providers/replicate.md) | - [x] | - [ ] |
| ![shuttleai](https://samestrin.github.io/media/llm-interface/icons/shuttleai.png) | `shuttleai` | [Shuttle AI](providers/shuttleai.md) | - [x] | - [ ] |
|  | `siliconflow` | [SiliconFlow](providers/siliconflow.md) | - [x] | - [x] |
|  | `thebai` | [TheB.ai](providers/thebai.md) | - [x] | - [ ] |
| ![togetherai](https://samestrin.github.io/media/llm-interface/icons/togetherai.png) | `togetherai` | [Together AI](providers/togetherai.md) | - [x] | - [x] |
|  | `voyage` | [Voyage AI](providers/voyage.md) | - [ ] | - [x] |
|  | `watsonxai` | [Watsonx AI](providers/watsonxai.md) | - [x] | - [x] |
| ![writer](https://samestrin.github.io/media/llm-interface/icons/writer.png) | `writer` | [Writer](providers/writer.md) | - [x] | - [ ] |
|  | `zhipuai` | [Zhipu AI](providers/zhipuai.md) | - [x] | - [ ] |

_This is regularly updated! :)_

## LLMInterfaceSendMessage

To use the `LLMInterfaceSendMessage` function, first import `LLMInterfaceSendMessage`. You can do this using either the CommonJS `require` syntax:

```javascript
const { LLMInterfaceSendMessage } = require('llm-interface');
```

or the ES6 `import` syntax:

```javascript
import { LLMInterfaceSendMessage } from 'llm-interface';
```

### LLMInterfaceSendMessage(interfaceName, apiKey, message, options = {}, interfaceOptions = {})

Sends a message using the specified LLM interface.

- `interfaceName` (String): The name of the LLM interface.
- `apiKey` (String): The API key.
- `message` (String|Object): The message to send.
- `options` (Object, optional): Additional options for the message.
- `interfaceOptions` (Object, optional): Interface-specific options.

```javascript
try {
  const response = await LLMInterfaceSendMessage(
    'openai',
    'your-api-key',
    'Hello, world!',
    { max_tokens: 100 },
  );
  console.log(response.results);
} catch (error) {
  console.error(error.message);
}
```

## LLMInterfaceStreamMessage

To use the `LLMInterfaceStreamMessage` function, first import `LLMInterfaceStreamMessage`. You can do this using either the CommonJS `require` syntax:

```javascript
const { LLMInterfaceStreamMessage } = require('llm-interface');
```

or the ES6 `import` syntax:

```javascript
import { LLMInterfaceStreamMessage } from 'llm-interface';
```

### LLMInterfaceStreamMessage(interfaceName, apiKey, message, options = {})

Streams a message using the specified LLM interface.

- `interfaceName` (String): The name of the LLM interface.
- `apiKey` (String): The API key.
- `message` (String|Object): The message to send.
- `options` (Object, optional): Additional options for the message.

````javascript
try {}
  const stream = await LLMInterfaceStreamMessage('openai', 'your-api-key', 'Hello, world!', { max_tokens: 100 });
  const result = await processStream(stream.data);
} catch (error) {
  console.error(error.message)
}
```
_processStream(stream) is defined in the [streaming mode example](/examples/misc/streaming-mode.js)._

## Message Object

The message object is a critical component when interacting with the various LLM APIs through the LLMInterface npm module. It contains the data that will be sent to the LLM for processing and allows for complex conversations. Below is a detailed explanation of the structure of a valid message object."

### Structure of a Message Object

A valid message object typically includes the following properties:

- `model`: A string specifying the model to use for the request (optional).
- `messages`: An array of message objects that form the conversation history.

Different LLMs may have their own message object rules. For example, both Anthropic and Gemini always expect the initial message to have the `user` role. Please be aware of this and structure your message objects accordingly. _LLMInterface will attempt to auto-correct invalid objects where possible._

## Options Object

The options object is an optional component that lets you send LLM provider specific parameters. While parameter names are fairly consistent, they can vary slightly, so it is important to pay attention. However, `max_token` is a special value, and is automatically normalized.

### Structure of an Options Object

A valid `options` object can contain any number of LLM provider specific parameters, however it always contains the default `options.max_tokens` value of 150:

- `max_tokens` (default: 150)

Two other common values of interest are:

- `stream` (default: false)
- `response_format` (default: null)

If `options.stream` is true, then a LLMInterface.sendMessage() or LLMInterfaceSendMessage() call becomes a LLMInterface.streamMessage() call.

If `options.response_format` is set to "json_object", along with including a JSON schema in the prompt, many LLM providers will return a valid JSON object. _Not all providers support this feature._

```javascript
const options = {
  max_tokens: 1024,
  temperature: 0.3 // Lower values are more deterministic, Higher are more creative
}

````

## Interface Options Object

The `interfaceOptions` is an optional component when interacting with the various LLM APIs through the LLMInterface npm module. It contains interface-specific configuration.

### Structure of an Interface Options Object

A valid `interfaceOptions` object can contain any of the following properties:

- `retryAttempts` (default: 1)
- `retryMultiplier` (default: 0.3)
- `cacheTimeoutSeconds` (default: false)
- `attemptJsonRepair` (default: false)
- `includeOriginalResponse` (default: false)

```javascript
const interfaceOptions = {
  retryAttempts: 3,
  retryMultiplier: 0.5, // llm-interface uses progressive delays, Lower values are faster
  cacheTimeoutSeconds: 60,
  attemptJsonRepair: true,
  includeOriginalResponse: true,
};
```

## Caching

Caching is an essential feature that can significantly improve the performance of your application by reducing the number of requests made to the LLM APIs. The LLMInterface npm module supports various caching mechanisms, each with its own use case and configuration options. Below are examples showing how to use different caching strategies.

### Simple Cache

Simple Cache uses the default cache engine provided by the LLMInterface npm module. It is suitable for basic caching needs without additional dependencies.

#### Example Usage

Here's how to configure the Simple Cache:

```javascript
LLMInterface.configureCache({ cache: 'simple-cache' });
```

### Flat Cache

Flat Cache is a simple and efficient in-memory cache that uses a file-based storage. It is ideal for lightweight caching needs and is easy to set up.

#### Installation

Before using the Flat Cache, install the necessary package:

```javascript
npm install flat-cache

```

#### Example Usage

Here's how to configure the Flat Cache:

```javascript
LLMInterface.configureCache({ cache: 'flat-cache' });
```

### Cache Manager

Cache Manager is a well-known package that supports many backends for caching. It allows you to use various storage systems for caching, such as in-memory, Redis, SQLite, and file system-based caches. This flexibility makes it a robust choice for different caching needs.

#### Installation

Before using Cache Manager, install the necessary packages, include the packages for your store:

```javascript
npm install cache-manager@4.0.0 cache-manager-fs-hash

```

#### Example Usage

Here's how to configure the Cache Manager with a file system-based store (using cache-manager-fs-hash):

```javascript
const fsStore = require('cache-manager-fs-hash');

LLMInterface.configureCache({
  cache: 'cache-manager',
  config: {
    store: fsStore,
    options: {
      path: '../../cache', // Path to the directory where cache files will be stored
      ttl: 60 * 60, // Time to live in seconds (1 hour)
      subdirs: true, // Create subdirectories to reduce the number of files per directory
      zip: false, // Compress files to save space
    },
  },
});
```

#### Advanced Backends

Cache Manager also supports advanced backends like Redis, Memcached, and MongoDB. Here are examples of how to configure each:

- **Redis**

```javascript
const redisStore = require('cache-manager-redis-store');

LLMInterface.configureCache({
  cache: 'cache-manager',
  config: {
    store: redisStore,
    options: {
      host: 'localhost', // Redis server host
      port: 6379, // Redis server port
      ttl: 60 * 60, // Time to live in seconds (1 hour)
    },
  },
});
```

- **Memcached**

```javascript
const memcachedStore = require('cache-manager-memcached-store');

LLMInterface.configureCache({
  cache: 'cache-manager',
  config: {
    store: memcachedStore,
    options: {
      servers: '127.0.0.1:11211', // Memcached server address
      ttl: 60 * 60, // Time to live in seconds (1 hour)
    },
  },
});
```

- **MongoDB**

```javascript
const mongoStore = require('cache-manager-mongodb');

LLMInterface.configureCache({
  cache: 'cache-manager',
  config: {
    store: mongoStore,
    options: {
      uri: 'mongodb://localhost:27017/cache', // MongoDB connection URI
      collection: 'cacheCollection', // MongoDB collection name
      ttl: 60 * 60, // Time to live in seconds (1 hour)
    },
  },
});
```

### Memory Cache

Memory Cache stores responses in memory for quick retrieval during subsequent requests within the specified time-to-live (TTL).

#### Example Usage

```javascript
LLMInterface.configureCache({ cache: 'memory-cache' });
```
