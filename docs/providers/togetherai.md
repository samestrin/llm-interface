![Together AI](https://cdn.prod.website-files.com/64f6f2c0e3f4c5a91c1e823a/654692b86325351d86c33550_og-hp.jpg)

# [Together AI](https://www.together.xyz)

Together is an AI company that develops large language models (LLMs). It provides various platforms and models, such as OpenChatKit, RedPajama, and GPT-JT, to empower developers and researchers in the field of natural language processing (NLP). Together's focus is on open-source AI research and infrastructure, enabling collaboration and innovation in the rapidly growing AI landscape.

## Interface Name

- `togetherai`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'togetherai': process.env.TOGETHERAI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('togetherai', 'Explain the importance of low latency LLMs.');
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

- `default`: google/gemma-7b
- `large`: mistralai/Mixtral-8x22B
- `small`: google/gemma-2b
- `agent`: Qwen/Qwen1.5-14B

### Embeddings

- `default`: bert-base-uncased
- `large`: BAAI/bge-large-en-v1.5
- `small`: BAAI/bge-base-en-v1.5 


## Options

The following values can be passed through `options`.

- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `response_format`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `tool_choice`: _Details not available, please refer to the LLM provider documentation._
- `tools`: _Details not available, please refer to the LLM provider documentation._


### Features

- Native JSON Mode
- Streaming
- Tools
- Embeddings


## Getting an API Key

**Commercial with Free Trial:** The Together AI API is a commercial product but offers a $5.00 credit to get started. No credit card is required initially.

To get an API key, first create a Together AI account, then visit the link below.

- https://api.together.xyz/settings/api-keys


## [Together AI Documentation](https://docs.together.ai/docs/introduction)

[Together AI documentation](https://docs.together.ai/docs/introduction) is available [here](https://docs.together.ai/docs/introduction).
