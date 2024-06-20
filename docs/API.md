# API Reference

## Table of Contents

1. [LLMInterfaceSendMessage Function](#llminterfacesendmessage-function)
2. [Valid `llmProvider` Values](#valid-llmprovider-values)
   - [AI21 Studio](#ai21---ai21-studio)
   - [Anthropic](#anthropic---anthropic)
   - [Cloudflare AI](#cloudflareai---cloudflare-ai)
   - [Cohere](#cohere---cohere)
   - [Fireworks AI](#fireworksai---fireworks-ai)
   - [Google Gemini](#gemini---google-gemini)
   - [Goose AI](#gooseai---goose-ai)
   - [Groq](#groq---groq)
   - [Hugging Face](#huggingface---hugging-face)
   - [LLaMA.cpp](#llamacpp---llamacpp)
   - [Mistral AI](#mistralai---mistral-ai)
   - [OpenAI](#openai---openai)
   - [Perplexity](#perplexity---perplexity)
   - [Reka AI](#rekaai---reka-ai)
3. [Underlying Classes](#underlying-classes)
   - [OpenAI](#openai)
   - [AI21](#ai21)
   - [Anthropic](#anthropic)
   - [Cloudflare AI](#cloudflare-ai)
   - [Cohere](#cohere)
   - [Gemini](#gemini)
   - [Goose AI](#goose-ai)
   - [Groq](#groq)
   - [Hugging Face](#hugging-face)
   - [Mistral AI](#mistral-ai)
   - [Perplexity Labs](#perplexity-labs)
   - [Reka AI](#reka-ai)
   - [LLaMA.cpp](#llamacpp)

## LLMInterfaceSendMessage Function

#### `LLMInterfaceSendMessage(llmProvider, apiKey, message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `llmProvider`: A string containing a valid llmProvider name.
  - `apiKey`: A string containing a valid API key, or an array containing a valid API key and account id.
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and `response_format`.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `attemptJsonRepair` (default: false), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
- **Returns:** A promise that resolves to a response JSON object.

##### Example:

```javascript
LLMInterfaceSendMessage('openai', process.env.OPENAI_API_KEY, message, {
  max_tokens: 150,
})
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
- `anthropic` - Anthropic
- `cloudflareai` - Cloudflare AI
- `cohere` - Cohere
- `fireworksai` - Fireworks AI
- `gemini` - Google Gemini
- `gooseai` - Goose AI
- `groq` - Groq
- `huggingface` - Hugging Face
- `llamacpp` - LLaMA.cpp
- `mistralai` - Mistral AI
- `openai` - OpenAI
- `perplexity` - Perplexity
- `rekaai` - Reka AI

## Underlying Classes

### OpenAI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and `response_format`.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `attemptJsonRepair` (default: false), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
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

### AI21

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `attemptJsonRepair` (default: false), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
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

### Anthropic

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `attemptJsonRepair` (default: false), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
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

### Cloudflare AI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `attemptJsonRepair` (default: false), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
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

### Cohere

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `attemptJsonRepair` (default: false), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
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

### Gemini

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and `response_format`.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `attemptJsonRepair` (default: false), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
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

### Goose AI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, and `model`.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `attemptJsonRepair` (default: false), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
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

### Groq

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `attemptJsonRepair` (default: false), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
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

### Hugging Face

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `attemptJsonRepair` (default: false), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
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

### Mistral AI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `attemptJsonRepair` (default: false), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
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

### Perplexity Labs

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `attemptJsonRepair` (default: false), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
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

### Reka AI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`, `model`, and any other LLM specific values.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `attemptJsonRepair` (default: false), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
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

### LLaMA.cpp

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages or a string containing a single message to send.
  - `options`: An optional object containing `max_tokens`.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `attemptJsonRepair` (default: false), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
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
