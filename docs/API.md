# API Reference

## Table of Contents

- [LLMInterface.setApiKey Function](#llminterfacesetapikey-function)
- [LLMInterface.setModelAlias Function](#llminterfacesetmodelalias-function)
- [LLMInterface.sendMessage Function](#llminterfacesendmessage-function)
  - [The Message Object](#message-object)
  - [Interface Options](#interface-options)
- [LLMInterface.streamMessage Function](#llminterfacestreammessage-function)
- [LLMInterface.getAllModelNames Function](#llminterfacegetallmodelnames-function)
- [LLMInterface.getModelConfigValue Function](#llminterfacegetmodelconfigvalue-function)
- [Valid `llmProvider` Values](#valid-llmprovider-values)
  - [AI21 Studio](#ai21-studio)
  - [AIML API](#aiml-api)
  - [Anyscale](#anyscale)
  - [Anthropic](#anthropic)
  - [Bigmodel](#bigmodel)
  - [Cloudflare AI](#cloudflare-ai)
  - [Cohere](#cohere)
  - [Corcel](#corcel)
  - [DeepInfra](#deepinfra)
  - [Deepseek](#deepseek)
  - [Fireworks AI](#fireworks-ai)
  - [Forefront](#forefront)
  - [Friendli AI](#friendli-ai)
  - [Google Gemini](#google-gemini)
  - [Goose AI](#goose-ai)
  - [Groq](#groq)
  - [Hugging Face](#hugging-face)
  - [Hyperbee AI](#hyperbee-ai)
  - [Lamini](#lamini)
  - [LLaMA.cpp](#llamacpp)
  - [Mistral AI](#mistral-ai)
  - [Monster API](#monster-api)
  - [Neets AI](#neets-ai)
  - [Novita AI](#novita-ai)
  - [NVIDIA](#nvidia)
  - [Octo AI](#octo-ai)
  - [Ollama](#ollama)
  - [OpenAI](#openai)
  - [Perplexity](#perplexity)
  - [Reka AI](#reka-ai)
  - [Replicate](#replicate)
  - [Shuttle AI](#shuttle-ai)
  - [TheB.AI](#thebai)
  - [Together AI](#together-ai)
  - [watsonx.ai](#watsonxai)
  - [Writer](#writer)
- [Underlying Classes](#underlying-classes)
  - [AI21 Studio](#ai21-studio-class)
  - [AIML API](#aiml-api-class)
  - [Anyscale](#anyscale-class)
  - [Anthropic](#anthropic-class)
  - [Bigmodel](#bigmodel-class)
  - [Cloudflare AI](#cloudflare-ai-class)
  - [Cohere](#cohere-class)
  - [Corcel](#corcel-class)
  - [DeepInfra](#deepinfra-class)
  - [Deepseek](#deepseek-class)
  - [Fireworks AI](#fireworks-ai-class)
  - [Forefront](#forefront-class)
  - [Friendli AI](#friendli-ai-class)
  - [Google Gemini](#google-gemini-class)
  - [Goose AI](#goose-ai-class)
  - [Groq](#groq-class)
  - [Hugging Face](#hugging-face-class)
  - [Hyperbee AI](#hyperbee-ai-class)
  - [Lamini](#lamini-class)
  - [LLaMA.cpp](#llamacpp-class)
  - [Mistral AI](#mistral-ai-class)
  - [Monster API](#monster-api-class)
  - [Neets AI](#neets-ai-class)
  - [Novita AI](#novita-ai-class)
  - [NVIDIA](#nvidia-class)
  - [Octo AI](#octo-ai-class)
  - [Ollama](#ollama-class)
  - [OpenAI](#openai-class)
  - [Perplexity Labs](#perplexity-labs-class)
  - [Reka AI](#reka-ai-class)
  - [Replicate](#replicate-class)
  - [Shuttle AI](#shuttle-ai-class)
  - [TheB.AI](#thebai-class)
  - [Together AI](#together-ai-class)
  - [watsonx.ai](#watsonxai-class)
  - [Writer](#writer-class)


## LLMInterface.setApiKey Function

#### `LLMInterface.setApiKey(interfaceNames, apiKey)`

- **Parameters:**
  - `interfaceNames`: A string containing the interface name, or an object with interface names as keys and API keys as values.
  - `apiKey`: A string containing a valid API key. Required if `interfaceNames` is a string.
- **Returns:** A boolean indicating if the update was successful.

##### Example:

```javascript
LLMInterface.setApiKey('openai', process.env.OPENAI_API_KEY);
// or
LLMInterface.setApiKey({ openai: process.env.OPENAI_API_KEY, cohere: process.env.COHERE_API_KEY });
```

## LLMInterface.setModelAlias Function

#### `LLMInterface.setModelAlias(interfaceName, alias, name, tokens = null)`

- **Parameters:**
  - `interfaceName`: A string containing the interface name.
  - `alias`: A string containing the model alias to update (e.g., "default", "large", "small").
  - `name`: A string containing the new model name to set.
  - `tokens`: An optional number specifying the token limit for the new model.
- **Returns:** A boolean indicating if the update was successful.

##### Example:

```javascript
LLMInterface.setModelAlias('openai', 'default', 'gpt-4');
LLMInterface.setModelAlias('openai', 'large', 'gpt-4', 128000);
```

## LLMInterface.sendMessage Function

#### `LLMInterface.sendMessage(llmProvider, message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `llmProvider`: A string containing a valid llmProvider name or an array containing a valid llmProvider and credientials (apiKey or an array of apiKey and account id/space id)
  - `apiKey`: A string containing a valid API key, or an array containing a valid API key and credientials (apiKey or an array of apiKey and account id/space id)
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and `response_format`.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example 1:

```javascript
LLMInterface.setApiKey('openai', process.env.OPENAI_API_KEY);
LLMInterface.sendMessage('openai', message, {
  max_tokens: 150,
})
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });

// or

LLMInterface.sendMessage(['openai',process.env.OPENAI_API_KEY], message, {
  max_tokens: 150,
})
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

## LLMInterface.streamMessage Function

#### `LLMInterface.streamMessage(llmProvider, message, options)`

- **Parameters:**
  - `llmProvider`: A string containing a valid llmProvider name.
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
- **Returns:** A promise that resolves to a stream of response data.

##### Example:

```javascript
LLMInterface.streamMessage('openai', message, { max_tokens: 150 })
  .then((stream) => {
    stream.on('data', (data) => {
      console.log(data);
    });
  })
  .catch((error) => {
    console.error(error);
  });
```

## LLMInterface.getAllModelNames Function

#### `LLMInterface.getAllModelNames()`

- **Returns:** An array of strings containing all model names.

##### Example:

```javascript
const modelNames = LLMInterface.getAllModelNames();
console.log(modelNames);
```

## LLMInterface.getModelConfigValue Function

#### `LLMInterface.getModelConfigValue(modelName, key)`

- **Parameters:**
  - `modelName`: A string containing the name of the model (e.g., "openai").
  - `key`: A string containing the configuration key (e.g., "url", "model.default").
- **Returns:** The configuration value if it exists, otherwise false.

##### Example:

```javascript
const apiUrl = LLMInterface.getModelConfigValue('openai', 'url');
console.log(apiUrl);
```

## The Message Object

The `message` parameter in the `LLMInterface.sendMessage` function can be either a string containing a single message or an object containing the model and messages. The object should have the following structure:

```
{
  model: 'model-name',
  messages: [
    {
      role: 'system' | 'user' | 'assistant',
      content: 'message content'
    }
  ]
}
```

## Interface Options

The `interfaceOptions` parameter in the `LLMInterface.sendMessage` function is an optional object that can specify the following properties:

- `cacheTimeoutSeconds`: Number of seconds to cache the response. Default is 0 (no caching).
- `attemptJsonRepair`: Boolean indicating whether to attempt JSON repair on the response. Default is false.
- `retryAttempts`: Number of retry attempts if the request fails. Default is 1.
- `retryMultiplier`: Multiplier for the retry delay. Default is 0.3.

```
LLMInterface.sendMessage('openai', message, { max_tokens: 150 }, { cacheTimeoutSeconds: 60, attemptJsonRepair: true, retryAttempts: 3, retryMultiplier: 0.5 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```


## Valid `llmProvider` Values

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
- `octoai` - Octo AI
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

## Underlying Classes

### AI21 Studio

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
ai21
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### AIML API

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
aimlapi
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Anyscale

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
anyscale
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Anthropic

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
anthropic
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Bigmodel

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
bigmodel
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Cloudflare AI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
cloudflareai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Cohere

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
cohere
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Corcel

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
corcel
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### DeepInfra

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
deepinfra
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Deepseek

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
deepseek
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Fireworks AI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
fireworksai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Forefront

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
forefront
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Friendli AI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
friendliai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Google Gemini

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and `response_format`.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
gemini
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Goose AI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, and `model`.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
gooseai
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Groq

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
groq
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Hugging Face

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
huggingface
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Hyperbee AI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
hyperbeeai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Lamini

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
lamini
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### LLaMA.cpp

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
llamacpp
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Mistral AI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
mistralai
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Monster API

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
monsterapi
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Neets AI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
neetsai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Novita AI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
novitaai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### NVIDIA

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
nvidia
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Octo AI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
octoai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Ollama

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
ollama
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### OpenAI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and `response_format`.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
openai
  .sendMessage(message, { max_tokens: 150, response_format: 'json_object' })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Perplexity Labs

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
perplexity
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Reka AI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
rekaai
  .sendMessage(message, {})
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Replicate

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
replicate
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Shuttle AI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
shuttleai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### TheB.AI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
thebai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Together AI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
togetherai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### watsonx.ai

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
watsonxai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Writer

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascriptjavascript
writer
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```
