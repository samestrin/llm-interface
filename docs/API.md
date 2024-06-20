# API Reference

## LLMInterfaceSendMessage Function

#### `LLMInterfaceSendMessage(llmProvider, apiKey, message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `llmProvider`: A string containing a valid llmProvider name.
  - `apiKey`: A string containing a valid API key.
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens`, `model`, and `response_format`.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `attemptJsonRepair` (default: false), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
- **Returns:** A promise that resolves to a response JSON object.
- **Example:**

```javascript

```

## Underlying Classes

### OpenAI

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens`, `model`, and `response_format`.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `attemptJsonRepair` (default: false), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
- **Returns:** A promise that resolves to a response JSON object.
- **Example:**

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
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens` and `model`.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
- **Returns:** A promise that resolves to a response JSON object.
- **Example:**

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
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens` and `model`.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
- **Returns:** A promise that resolves to a response JSON object.
- **Example:**

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

### Cohere

#### `sendMessage(message, options, cacheTimeoutSeconds)`

- **Parameters:**
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens` and `model`.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
- **Returns:** A promise that resolves to a response JSON object.
- **Example:**

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
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens`, `model`, and `response_format`.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `attemptJsonRepair` (default: false), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
- **Returns:** A promise that resolves to a response JSON object.
- **Example:**

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
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens`, and `model`.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
- **Returns:** A promise that resolves to a response JSON object.
- **Example:**

```javascript
goose
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
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens` and `model`.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
- **Returns:** A promise that resolves to a response JSON object.
- **Example:**

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
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens` and `model`.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
- **Returns:** A promise that resolves to a response JSON object.
- **Example:**

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
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens` and `model`.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
- **Returns:** A promise that resolves to a response JSON object.
- **Example:**

```javascript
mistral
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
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens` and `model`.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
- **Returns:** A promise that resolves to a response JSON object.
- **Example:**

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
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens` and `model`.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
- **Returns:** A promise that resolves to a response JSON object.
- **Example:**

```javascript
reka
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
  - `message`: An object containing the model and messages to send.
  - `options`: An optional object containing `max_tokens`.
  - `interfaceOptions`: An optional object specifying `cacheTimeoutSeconds` (default:0), `retryAttempts` (default: 1). and `retryMultiplier` (default: 0.3).
- **Returns:** A promise that resolves to a response JSON object.
- **Example:**

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
