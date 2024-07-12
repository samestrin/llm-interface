# [Mistral AI](https://www.mistral.ai)

Mistral AI is a French artificial intelligence company focused on developing and providing large language models (LLMs). They emphasize open-source principles, making their models accessible and customizable for various applications. Mistral AI offers a range of models with varying sizes and capabilities, catering to different user needs. The company has gained significant attention and funding due to its commitment to transparency and collaboration within the AI community.

## Interface Name

- `mistralai`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'mistralai': process.env.MISTRALAI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('mistralai', 'Explain the importance of low latency LLMs.');
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

- `default`: mistral-large-latest
- `large`: mistral-large-latest
- `small`: mistral-small-latest
- `agent`: mistral-large-latest

### Embeddings Model Aliases

- `default`: mistral-embed
- `large`: mistral-embed
- `small`: mistral-embed


## Options

The following parameters can be passed through `options`.

- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `random_seed`: _Details not available, please refer to the LLM provider documentation._
- `response_format`: _Details not available, please refer to the LLM provider documentation._
- `safe_prompt`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `top_p`: _Details not available, please refer to the LLM provider documentation._


### Features

- Native JSON Mode
- Streaming
- Embeddings


## Getting an API Key

**Commercial with Free Trial:** The MistralAI API is a commercial product but offers a $5.00 credit to get started. No credit card is required initially.

To get an API key, first create a Mistral AI account, then visit the link below.

- https://console.mistralai.ai/api-keys/


## [Mistral AI Documentation](https://docs.mistral.ai/)

[Mistral AI documentation](https://docs.mistral.ai/) is available [here](https://docs.mistral.ai/).
