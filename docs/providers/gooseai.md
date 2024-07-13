![GooseAI](https://goose.ai/_next/static/media/twitter-card.ef9b825e.png)

# [GooseAI](https://goose.ai)

Goose AI offers a fully managed, cost-effective Natural Language Processing (NLP) as a Service platform delivered via API. This allows businesses to easily integrate AI-powered language capabilities into their products and services without needing to manage complex infrastructure. GooseAI claims to provide these services at a significantly lower cost compared to other providers, making it an attractive option for businesses looking to leverage AI while managing expenses.

## Interface Name

- `gooseai`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'gooseai': process.env.GOOSEAI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('gooseai', 'Explain the importance of low latency LLMs.');
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

- `default`: gpt-neo-20b
- `large`: gpt-neo-20b
- `small`: gpt-neo-125m
- `agent`: gpt-j-6b


## Options

The following parameters can be passed through `options`.

- `echo`: _Details not available, please refer to the LLM provider documentation._
- `frequency_penalty`: _Details not available, please refer to the LLM provider documentation._
- `logit_bias`: _Details not available, please refer to the LLM provider documentation._
- `logprobs`: _Details not available, please refer to the LLM provider documentation._
- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `min_tokens`: _Details not available, please refer to the LLM provider documentation._
- `n`: _Details not available, please refer to the LLM provider documentation._
- `presence_penalty`: _Details not available, please refer to the LLM provider documentation._
- `prompt`: _Details not available, please refer to the LLM provider documentation._
- `repetition_penalty`: _Details not available, please refer to the LLM provider documentation._
- `repetition_penalty_range`: _Details not available, please refer to the LLM provider documentation._
- `repetition_penalty_slope`: _Details not available, please refer to the LLM provider documentation._
- `stop`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `tfs`: _Details not available, please refer to the LLM provider documentation._
- `top_a`: _Details not available, please refer to the LLM provider documentation._
- `top_k`: _Details not available, please refer to the LLM provider documentation._
- `top_p`: _Details not available, please refer to the LLM provider documentation._
- `typical_p`: _Details not available, please refer to the LLM provider documentation._


### Features

- Streaming


## Getting an API Key

**Commercial with Free Trial**: The Goose AI API is a commercial product but offers a $9.99 credit to get started. No credit card is required initially.

To get an API key, first create a GooseAI account, then visit the link below.

- https://goose.ai/dashboard/apikeys


## [GooseAI Documentation](https://goose.ai/docs)

[GooseAI documentation](https://goose.ai/docs) is available [here](https://goose.ai/docs).


## [GooseAI X](https://www.x.com/gooseai_NLP)

![@gooseai_NLP](https://pbs.twimg.com/profile_images/1798110641414443008/XP8gyBaY_normal.jpg)

[@gooseai_NLP](https://www.x.com/gooseai_NLP)


