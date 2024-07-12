![Ollama](https://ollama.com/public/og.png)

# Ollama

Ollama is an open-source project that allows users to run large language models (LLMs) on their local devices. It aims to make LLMs more accessible and affordable by providing a user-friendly interface and removing the need for expensive cloud computing resources. Ollama supports various models and offers features like model downloading, running, and fine-tuning, enabling users to customize and experiment with LLMs for a variety of applications.

## Interface Name

- `ollama`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'ollama': process.env.OLLAMA_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('ollama', 'Explain the importance of low latency LLMs.');
    console.log(response.results);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

main();
```

### Model Aliases

The following model aliases are provided for this provider. 

- `default`: llama3
- `large`: llama3
- `small`: llama3

### Embeddings Model Aliases

- `default`: all-minilm
- `large`: all-minilm
- `small`: all-minilm


## Options

The following values can be passed through `options`.

- `format`: _Details not available, please refer to the LLM provider documentation._
- `keep_alive`: _Details not available, please refer to the LLM provider documentation._
- `options`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._


### Features

- Native JSON Mode
- Streaming
- Embeddings


## Getting an API Key

**No API Key (Local URL):**  This is not a traditional API so no API key is required. However, a URL(s) is required to use this service. (Ensure you have the matching models installed locally)

To get an API key, first create an Ollama account, then visit the link below.

- http://localhost:11434/api/chat


## [Ollama Documentation](https://github.com/ollama/ollama/blob/main/docs/api.md)

[Ollama documentation](https://github.com/ollama/ollama/blob/main/docs/api.md) is available [here](https://github.com/ollama/ollama/blob/main/docs/api.md).
