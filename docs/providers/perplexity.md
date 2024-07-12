![Perplexity AI](https://ppl-ai-public.s3.amazonaws.com/static/img/pplx-default-preview.png)

# [Perplexity AI](https://www.perplexity.ai)

Perplexity AI is a cutting-edge answer engine that utilizes large language models (LLMs) to provide accurate and informative responses to user inquiries. By leveraging the power of AI, Perplexity AI aims to enhance the search experience by delivering concise answers along with relevant sources, saving users time and effort. Additionally, Perplexity AI offers features like summarizing information from web pages and generating creative content, making it a versatile tool for research, learning, and exploring new ideas.

## Interface Name

- `perplexity`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'perplexity': process.env.PERPLEXITY_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('perplexity', 'Explain the importance of low latency LLMs.');
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

- `default`: llama-3-sonar-large-32k-online
- `large`: llama-3-sonar-large-32k-online
- `small`: llama-3-sonar-small-32k-online
- `agent`: llama-3-sonar-large-32k-online


## Options

The following values can be passed through `options`.

- `frequency_penalty`: _Details not available, please refer to the LLM provider documentation._
- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `presence_penalty`: _Details not available, please refer to the LLM provider documentation._
- `return_citations`: _Details not available, please refer to the LLM provider documentation._
- `return_images`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `top_k`: _Details not available, please refer to the LLM provider documentation._
- `top_p`: _Details not available, please refer to the LLM provider documentation._


### Features

- Streaming: true


## Getting an API Key

**Commercial (Credit Card Required):** The Perplexity API requires a credit card to get started.

To get an API key, first create a Perplexity AI account, then visit the link below.

- https://www.perplexity.ai/settings/api


## [Perplexity AI Documentation](https://docs.perplexity.ai/)

[Perplexity AI documentation](https://docs.perplexity.ai/) is available [here](https://docs.perplexity.ai/).


![@perplexity_ai](https://pbs.twimg.com/profile_images/1798110641414443008/XP8gyBaY_normal.jpg)
[@perplexity_ai](https://www.x.com/perplexity_ai)

Anthropic
