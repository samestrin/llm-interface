![Watsonx AI](https://samestrin.github.io/media/llm-interface/watsonx.ai.1600x900.png)

# [Watsonx AI](https://ibm.com)

IBM watsonx is an AI and data platform designed to help businesses scale and accelerate the impact of AI with trusted data. It's comprised of three components: watsonx.ai, a studio for building and deploying AI models; watsonx.data, a data store built on an open lakehouse architecture; and watsonx.governance, a toolkit to enable AI workflows to be built with responsible and trustworthy principles. Additionally, the platform offers a range of AI assistants tailored for specific business functions. IBM watsonx is designed to be open, using open-source technologies and offering a choice of models, targeted to address specific enterprise needs, and trusted, ensuring data governance and responsible AI practices.

## Interface Name

- `watsonxai`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({
  watsonxai: [process.env.WATSONXAI_API_KEY, process.env.WATSONXAI_SPACE_ID],
});

async function main() {
  try {
    const response = await LLMInterface.sendMessage(
      'watsonxai',
      'Explain the importance of low latency LLMs.',
    );
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

- `default`: ibm/granite-13b-chat-v2
- `large`: meta-llama/llama-3-70b-instruct
- `small`: google/flan-t5-xxl
- `agent`: meta-llama/llama-3-70b-instruct

### Embeddings Model Aliases

- `default`: ibm/slate-125m-english-rtrvr
- `large`: ibm/slate-125m-english-rtrvr
- `small`: ibm/slate-30m-english-rtrvr

## Options

The following parameters can be passed through `options`.

- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `random_seed`: _Details not available, please refer to the LLM provider documentation._
- `repeat_penalty`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.
- `top_k`: The number of highest probability vocabulary tokens to keep for top-k sampling.
- `top_p`: Controls the cumulative probability of token selections for nucleus sampling. It limits the tokens to the smallest set whose cumulative probability exceeds the threshold. It is recommended to alter this or temperature, but not both.

## Features

- Embeddings

## Getting an API Key

**Free Tier Available:** The watsonx.ai API is a commercial product but offers a free tier. No credit card is required for the free tier.

To get an API key, first create a Watsonx AI account, then visit the link below.

- https://cloud.ibm.com/iam/apikeys

In addition to an API key, you will also need a [space id](https://dataplatform.cloud.ibm.com/ml-runtime/spaces/create-space).

## [Watsonx AI Documentation](https://dataplatform.cloud.ibm.com/docs/content/wsj/getting-started/welcome-main.html?context=wx&audience=wdp)

[Watsonx AI documentation](https://dataplatform.cloud.ibm.com/docs/content/wsj/getting-started/welcome-main.html?context=wx&audience=wdp) is available [here](https://dataplatform.cloud.ibm.com/docs/content/wsj/getting-started/welcome-main.html?context=wx&audience=wdp).
