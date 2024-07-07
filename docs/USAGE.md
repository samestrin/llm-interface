# LLM Interface Usage Documentation

## Table of Contents

- [LLMInterface](#llminterface)
  - [getAllModelNames()](#getallmodelnames)
  - [getModelConfigValue(interfaceName, key)](#getmodelconfigvalueinterfacename-key)
  - [setApiKey(interfaceNames, apiKey)](#setapikeyinterfacenames-apikey)
  - [setModelAlias(interfaceName, alias, name, tokens = null)](#setmodelaliasinterfacename-alias-name-tokens--null)
  - [configureCache(cacheConfig = {})](#configurecachecacheconfig--)
  - [sendMessage(interfaceName, message, options = {}, interfaceOptions = {})](#sendmessageinterfacename-message-options---interfaceoptions--)
  - [streamMessage(interfaceName, message, options = {})](#streammessageinterfacename-message-options--)
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

```javascriptjavascript
const { LLMInterface } = require('llm-interface');

```

or the ES6 `import` syntax:

```javascriptjavascript
import { LLMInterface } from 'llm-interface';

```

### getAllModelNames()

Retrieves a sorted list of all model names available in the configuration.

```javascriptjavascript
const modelNames = LLMInterface.getAllModelNames();
console.log(modelNames);

```

### getModelConfigValue(interfaceName, key)

Retrieves a specific configuration value for a given model.

- `interfaceName` (String): The name of the model.
- `key` (String): The configuration key to retrieve.

```javascriptjavascript
const apiKey = LLMInterface.getModelConfigValue('openai', 'apiKey');
console.log(apiKey);

```

### setApiKey(interfaceNames, apiKey)

Sets the API key for one or multiple interfaces.

- `interfaceNames` (String|Object): The name of the interface or an object mapping interface names to API keys.
- `apiKey` (String): The API key.

```javascriptjavascript
LLMInterface.setApiKey('openai', 'your-api-key');
// or
LLMInterface.setApiKey({ openai: 'your-api-key', cohere: 'another-api-key' });

```

### setModelAlias(interfaceName, alias, name, tokens = null)

Sets an alias for a model within a specific interface.

- `interfaceName` (String): The name of the interface.
- `alias` (String): The alias to set.
- `name` (String): The model name.
- `tokens` (Number, optional): The token limit for the model.

```javascriptjavascript
LLMInterface.setModelAlias('openai', 'default', 'gpt-3.5-turbo', 4096);

```

### configureCache(cacheConfig = {})

Configures the cache system for the interface.

- `cacheConfig` (Object): Configuration options for the cache.

```javascriptjavascript
LLMInterface.configureCache({ cache: 'simple-cache', path: './cache' });

```

### sendMessage(interfaceName, message, options = {}, interfaceOptions = {})

Sends a message to a specified interface and returns the response. _The specified interface must aleady have its API key set, or it must be passed using the array format._

- `interfaceName` (String|Array): The name of the LLM interface or an array containing the name of the LLM interface and the API key.
- `message` (String|Object): The message to send.
- `options` (Object, optional): Additional options for the message.
- `interfaceOptions` (Object, optional): Interface-specific options.

```javascriptjavascript
try {
  const response = await LLMInterface.sendMessage('openai', 'Hello, world!', { max_tokens: 100 });
  console.log(response.results);
} catch (error) {
  console.error(error.message)
}
// or
try {
  const response = await LLMInterface.sendMessage(['openai', 'your-api-key'], 'Hello, world!', { max_tokens: 100 });
  console.log(response.results);
} catch (error) {
  console.error(error.message)
}

```

### streamMessage(interfaceName, message, options = {})

Streams a message to a specified interface and returns the response stream.

- `interfaceName` (String): The name of the LLM interface.
- `message` (String|Object): The message to send.
- `options` (Object, optional): Additional options for the message.

```javascriptjavascript
try {
  const stream = await LLMInterface.streamMessage('openai', 'Hello, world!', { max_tokens: 100 });
  const result = await processStream(stream.data);
} catch (error) {
  console.error(error.message)
}
```javascript
_processStream(stream) is defined in the [streaming mode example](/examples/misc/streaming-mode.js)._

### Supported Interface Names

The following are supported LLM providers (in alphabetical order):

- `ai21` - AI21 Studio
- `aimlapi` - AIML API
- `anyscale` - Anyscale
- `anthropic` - Anthropic
- `bigmodel` - Bigmodel
- `cloudflareai` - Cloudflare AI
- `cohere` - Cohere
- `corcel` - Corcel
- `deepinfra` - DeepInfra
- `deepseek` - Deepseek
- `fireworksai` - Fireworks AI
- `forefront` - Forefront
- `friendliai` - Friendli AI
- `gemini` - Google Gemini
- `gooseai` - Goose AI
- `groq` - Groq
- `huggingface` - Hugging Face
- `hyperbeeai` - Hyperbee AI
- `lamini` - Lamini
- `llamacpp` - LLaMA.cpp
- `mistralai` - Mistral AI
- `monsterapi` - Monster API
- `neetsai` - Neets AI
- `novitaai` - Novita AI
- `nvidia` - NVIDIA
- `octoml` - Octo AI
- `ollama` - Ollama
- `openai` - OpenAI
- `perplexity` - Perplexity
- `rekaai` - Reka AI
- `replicate` - Replicate
- `shuttleai` - Shuttle AI
- `thebai` - TheB.AI
- `togetherai` - Together AI
- `watsonxai` - watsonx.ai
- `writer` - Writer

_This is regularly updated! :)_

## LLMInterfaceSendMessage

To use the `LLMInterfaceSendMessage` function, first import `LLMInterfaceSendMessage`. You can do this using either the CommonJS `require` syntax:

```javascriptjavascript
const { LLMInterfaceSendMessage } = require('llm-interface');

```

or the ES6 `import` syntax:

```javascriptjavascript
import { LLMInterfaceSendMessage } from 'llm-interface';

```

### LLMInterfaceSendMessage(interfaceName, apiKey, message, options = {}, interfaceOptions = {})

Sends a message using the specified LLM interface.

- `interfaceName` (String): The name of the LLM interface.
- `apiKey` (String): The API key.
- `message` (String|Object): The message to send.
- `options` (Object, optional): Additional options for the message.
- `interfaceOptions` (Object, optional): Interface-specific options.

```javascriptjavascript
try {
  const response = await LLMInterfaceSendMessage('openai', 'your-api-key', 'Hello, world!', { max_tokens: 100 });
  console.log(response.results);
} catch (error) {
  console.error(error.message)
}

```

## LLMInterfaceStreamMessage

To use the `LLMInterfaceStreamMessage` function, first import `LLMInterfaceStreamMessage`. You can do this using either the CommonJS `require` syntax:

```javascriptjavascript
const { LLMInterfaceStreamMessage } = require('llm-interface');

```

or the ES6 `import` syntax:

```javascriptjavascript
import { LLMInterfaceStreamMessage } from 'llm-interface';

```

### LLMInterfaceStreamMessage(interfaceName, apiKey, message, options = {})

Streams a message using the specified LLM interface.

- `interfaceName` (String): The name of the LLM interface.
- `apiKey` (String): The API key.
- `message` (String|Object): The message to send.
- `options` (Object, optional): Additional options for the message.

```javascriptjavascript
try {}
  const stream = await LLMInterfaceStreamMessage('openai', 'your-api-key', 'Hello, world!', { max_tokens: 100 });
  const result = await processStream(stream.data);
} catch (error) {
  console.error(error.message)
}
```javascript
_processStream(stream) is defined in the [streaming mode example](/examples/misc/streaming-mode.js)._

## Message Object

The message object is a critical component when interacting with the various LLM APIs through the `llm-interface` package. It contains the data that will be sent to the LLM for processing and allows for complex conversations. Below is a detailed explanation of a valid message object.

### Structure of a Message Object

A valid message object typically includes the following properties:

- `model`: A string specifying the model to use for the request (optional).
- `messages`: An array of message objects that form the conversation history.

Different LLMs may have their own message object rules. For example, both Anthropic and Gemini always expect the initial message to have the `user` role. Please be aware of this and structure your message objects accordingly. _`llm-interface` will attempt to auto-correct invalid objects where possible._

## Options Object

The options object is an optional component that lets you send LLM provider specific parameters. While paramter names are fairly consistent, they can vary slightly, so its important to pay attention. However, `max_token` is a special value, and is automatically normalized.

### Structure of an Options Object

A valid `options` object can contain any number of LLM provider specific parameters, however it always contains the default `options.max_tokens` value of 150:

- `max_tokens` (default: 150)

Two other common values of interest are:

- `stream` (default: false)
- `response_format` (default: null)

If `options.stream` is true, then a LLMInterface.sendMessage() or LLMInterfaceSendMessage() call becomes a LLMInterface.streamMessage() call.

If `options.response_format` is set to "json_object", along with including a JSON schema in the prompt, many LLM providers will return a valid JSON object. _Not all providers support this feature._

```javascriptjavascript
const options = {
  max_tokens: 1024,
  temperature: 0.3 // Lower values are more deterministic, Higher are more creative
}

```

## Interface Options Object

The `interfaceOptions` is an optional component when interacting with the various LLM APIs through the `llm-interface` package. It contains interface-specific configuration.

### Structure of an Interface Options Object

A valid `interfaceOptions` object can contain any of the following properties:

- `retryAttempts` (default: 1)
- `retryMultiplier` (default: 0.3)
- `cacheTimeoutSeconds` (default: false)
- `attemptJsonRepair` (default: false)
- `includeOriginalResponse` (default: false)

```javascriptjavascript
const interfaceOptions = {
  retryAttempts: 3,
  retryMultiplier: 0.5, // llm-interface uses progressive delays, Lower values are faster
  cacheTimeoutSeconds: 60,
  attemptJsonRepair: true,
  includeOriginalResponse: true
};

```

## Caching

Caching is an essential feature that can significantly improve the performance of your application by reducing the number of requests made to the LLM APIs. The `llm-interface` package supports various caching mechanisms, each with its own use case and configuration options. Below are examples showing how to use different caching strategies.

### Simple Cache

Simple Cache uses the default cache engine provided by the `llm-interface` package. It is suitable for basic caching needs without additional dependencies.

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

Cache Manager is a well-known package that supports many backends for caching. It allows you to use various storage systems for caching, such as in-memory, Redis, and file system-based caches. This flexibility makes it a robust choice for different caching needs.

#### Installation

Before using Cache Manager, install the necessary packages:

```javascript
npm install cache-manager@4.0.0 cache-manager-fs-hash

```

#### Example Usage

Here's how to configure the Cache Manager with a file system-based backend:

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
LLMInterface.configureCache({ cache: 'flat-cache' });

```

## Examples

Various [examples](/examples) are available, in alphabetical order they are:

- [Caching](/examples/caching)
- [Interface Options](/examples/interface-options)
- [JSON](/examples/json)
- [Langchain.js](/examples/langchain)
- [Miscellaneous](/examples/misc)
- [Mixture of Agents (MoA)](/examples/moa)
