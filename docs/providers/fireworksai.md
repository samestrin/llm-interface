# [Fireworks AI](https://www.fireworks.ai)

Fireworks AI is a platform designed to empower developers and businesses to leverage the power of generative AI. It offers a comprehensive suite of tools and services, including fast and affordable text and image model inference, fine-tuning capabilities, and on-demand private GPU inference. This enables developers to build innovative products and applications with generative AI while benefiting from optimized performance and customizable solutions. Fireworks AI is committed to accelerating product innovation and making generative AI accessible to a wide range of users.

## Interface Name

- `fireworksai`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'fireworksai': process.env.FIREWORKSAI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('fireworksai', 'Explain the importance of low latency LLMs.');
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

- `default`: accounts/fireworks/models/llama-v3-8b-instruct
- `large`: accounts/fireworks/models/llama-v3-70b-instruct
- `small`: accounts/fireworks/models/phi-3-mini-128k-instruct
- `agent`: accounts/fireworks/models/llama-v3-8b-instruct

### Embeddings

- `default`: nomic-ai/nomic-embed-text-v1.5
- `large`: nomic-ai/nomic-embed-text-v1.5
- `small`: nomic-ai/nomic-embed-text-v1.5


## Options

The following values can be passed through `options`.

- `context_length_exceeded_behavior`: _Details not available, please refer to the LLM provider documentation._
- `frequency_penalty`: _Details not available, please refer to the LLM provider documentation._
- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `n`: _Details not available, please refer to the LLM provider documentation._
- `name`: _Details not available, please refer to the LLM provider documentation._
- `presence_penalty`: _Details not available, please refer to the LLM provider documentation._
- `prompt_truncate_len`: _Details not available, please refer to the LLM provider documentation._
- `response_format`: _Details not available, please refer to the LLM provider documentation._
- `role`: _Details not available, please refer to the LLM provider documentation._
- `stop`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `tools`: _Details not available, please refer to the LLM provider documentation._
- `top_k`: _Details not available, please refer to the LLM provider documentation._
- `top_p`: _Details not available, please refer to the LLM provider documentation._
- `user`: _Details not available, please refer to the LLM provider documentation._


### Features

- Native JSON Mode
- Streaming
- Tools
- Embeddings


## Getting an API Key

**Free Tier Available**: The Fireworks AI API offers a free developer tier and commercial accounts. No credit card is required for the free tier.

To get an API key, first create a Fireworks AI account, then visit the link below.

- https://fireworks.ai/api-keys


## [Fireworks AI Documentation](https://readme.fireworks.ai/docs/quickstart)

[Fireworks AI documentation](https://readme.fireworks.ai/docs/quickstart) is available [here](https://readme.fireworks.ai/docs/quickstart).
