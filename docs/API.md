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
  - [AI21 Studio Class](#ai21-studio-class)
  - [AIML API Class](#aiml-api-class)
  - [Anyscale Class](#anyscale-class)
  - [Anthropic Class](#anthropic-class)
  - [Bigmodel Class](#bigmodel-class)
  - [Cloudflare AI Class](#cloudflare-ai-class)
  - [Cohere Class](#cohere-class)
  - [Corcel Class](#corcel-class)
  - [DeepInfra Class](#deepinfra-class)
  - [Deepseek Class](#deepseek-class)
  - [Fireworks AI Class](#fireworks-ai-class)
  - [Forefront Class](#forefront-class)
  - [Friendli AI Class](#friendli-ai-class)
  - [Google Gemini Class](#google-gemini-class)
  - [Goose AI Class](#goose-ai-class)
  - [Groq Class](#groq-class)
  - [Hugging Face Class](#hugging-face-class)
  - [Hyperbee AI Class](#hyperbee-ai-class)
  - [Lamini Class](#lamini-class)
  - [LLaMA.cpp Class](#llamacpp-class)
  - [Mistral AI Class](#mistral-ai-class)
  - [Monster API Class](#monster-api-class)
  - [Neets AI Class](#neets-ai-class)
  - [Novita AI Class](#novita-ai-class)
  - [NVIDIA Class](#nvidia-class)
  - [Octo AI Class](#octo-ai-class)
  - [Ollama Class](#ollama-class)
  - [OpenAI Class](#openai-class)
  - [Perplexity Labs Class](#perplexity-labs-class)
  - [Reka AI Class](#reka-ai-class)
  - [Replicate Class](#replicate-class)
  - [Shuttle AI Class](#shuttle-ai-class)
  - [TheB.AI Class](#thebai-class)
  - [Together AI Class](#together-ai-class)
  - [watsonx.ai Class](#watsonxai-class)
  - [Writer Class](#writer-class)


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

### AI21 Studio Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
ai21
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### AIML API Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
aimlapi
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Anyscale Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
anyscale
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Anthropic Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
anthropic
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Bigmodel Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
bigmodel
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Cloudflare AI Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
cloudflareai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Cohere Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
cohere
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Corcel Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
corcel
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### DeepInfra Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
deepinfra
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Deepseek Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
deepseek
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Fireworks AI Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
fireworksai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Forefront Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
forefront
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Friendli AI Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
friendliai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Google Gemini Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and `response_format`.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
gemini
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Goose AI Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, and `model`.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
gooseai
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Groq Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
groq
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Hugging Face Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
huggingface
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Hyperbee AI Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
hyperbeeai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Lamini Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
lamini
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### LLaMA.cpp Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascript
llamacpp
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Mistral AI Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
mistralai
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Monster API Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
monsterapi
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Neets AI Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
neetsai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Novita AI Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
novitaai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### NVIDIA Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
nvidia
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Octo AI Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
octoai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Ollama Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
ollama
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### OpenAI Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and `response_format`.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
openai
  .sendMessage(message, { max_tokens: 150, response_format: 'json_object' })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Perplexity Labs Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
perplexity
  .sendMessage(message, { max_tokens: 100 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Reka AI Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
rekaai
  .sendMessage(message, {})
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Replicate Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
replicate
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Shuttle AI Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
shuttleai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### TheB.AI Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
thebai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Together AI Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
togetherai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### watsonx.ai Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
watsonxai
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Writer Class

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying interface options.
- **Returns:** A promise that resolves to a response JSON object.

##### Example:
```javascript
writer
  .sendMessage(message, { max_tokens: 150 })
  .then((response) => {
    console.log(response.results);
  })
  .catch((error) => {
    console.error(error);
  });
```
