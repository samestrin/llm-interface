![Cohere](https://cdn.sanity.io/images/rjtqmwfu/production/5a374837aab376bb677b3a968c337532ea16f6cb-800x600.png?rect=0,90,800,420&w=1200&h=630)

# [Cohere](https://www.cohere.ai)

**Trial Keys Available**: Cohere is an AI company specializing in large language models (LLMs) designed for enterprise use. They offer a platform that allows developers to leverage pre-built models or create custom models tailored to specific business needs. Cohere's technology empowers businesses to integrate natural language processing capabilities into their applications, streamlining tasks such as text generation, analysis, and understanding. Their focus on enterprise solutions sets them apart, providing secure and customizable AI tools to improve efficiency and productivity across various industries.

## Interface Name

- `cohere`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'cohere': process.env.COHERE_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('cohere', 'Explain the importance of low latency LLMs.');
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

- `default`: command-r
- `large`: command-r-plus
- `small`: command-light
- `agent`: command-r-plus

### Embeddings

- `default`: embed-english-v3.0
- `large`: embed-english-v3.0
- `small`: embed-english-light-v3.0


## Options

The following values can be passed through `options`.

- `chat_history`: _Details not available, please refer to the LLM provider documentation._
- `connectors`: _Details not available, please refer to the LLM provider documentation._
- `conversation_id`: _Details not available, please refer to the LLM provider documentation._
- `documents`: _Details not available, please refer to the LLM provider documentation._
- `force_single_step`: _Details not available, please refer to the LLM provider documentation._
- `frequency_penalty`: _Details not available, please refer to the LLM provider documentation._
- `k`: _Details not available, please refer to the LLM provider documentation._
- `max_input_tokens`: _Details not available, please refer to the LLM provider documentation._
- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `p`: _Details not available, please refer to the LLM provider documentation._
- `preamble`: _Details not available, please refer to the LLM provider documentation._
- `presence_penalty`: _Details not available, please refer to the LLM provider documentation._
- `prompt_truncation`: _Details not available, please refer to the LLM provider documentation._
- `seed`: _Details not available, please refer to the LLM provider documentation._
- `stop_sequences`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `tool_results`: _Details not available, please refer to the LLM provider documentation._
- `tools`: _Details not available, please refer to the LLM provider documentation._


### Features

- Streaming
- Tools
- Embeddings


## Getting an API Key

The Cohere API offers trial keys with rate limits. These keys are not intended for commercial use.

To get an API key, first create a Cohere account, then visit the link below.

- https://dashboard.cohere.com/api-keys


## [Cohere Documentation](https://docs.cohere.com/)

[Cohere documentation](https://docs.cohere.com/) is available [here](https://docs.cohere.com/).
