![Hugging Face Inference](https://huggingface.co/front/thumbnails/v2-2.png)

# [Hugging Face Inference](https://huggingface.co)

Hugging Face offers a serverless Inference API, allowing users to easily test and evaluate various machine learning models, including both publicly available and private ones. With simple HTTP requests, users can access over 150,000 models hosted on Hugging Face's shared infrastructure. The API covers a wide range of tasks in natural language processing, audio, and vision, making it a versatile tool for developers and researchers. While free to use, the Inference API is rate limited, with options for higher request rates and dedicated endpoints for production-level workloads.

## Interface Name

- `huggingface`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'huggingface': process.env.HUGGINGFACE_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('huggingface', 'Explain the importance of low latency LLMs.');
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

- `default`: meta-llama/Meta-Llama-3-8B-Instruct
- `large`: meta-llama/Meta-Llama-3-8B-Instruct
- `small`: microsoft/Phi-3-mini-4k-instruct
- `agent`: meta-llama/Meta-Llama-3-8B-Instruct

### Embeddings Model Aliases

- `default`: sentence-transformers/all-mpnet-base-v2
- `large`: sentence-transformers/sentence-t5-large
- `small`: sentence-transformers/all-MiniLM-L6-v2


## Options

The following parameters can be passed through `options`.

- `arguments will vary by model`: _Details not available, please refer to the LLM provider documentation._
- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.
- `top_k`: The number of highest probability vocabulary tokens to keep for top-k sampling.
- `top_p`: Controls the cumulative probability of token selections for nucleus sampling. It limits the tokens to the smallest set whose cumulative probability exceeds the threshold. It is recommended to alter this or temperature, but not both.


## Features

- Embeddings


## Getting an API Key

**Free Tier Available (Rate Limited)**: The Inference API is free to use, but may be rate limited for heavy usage. Sending requests gradually is recommended to avoid errors.

To get an API key, first create a Hugging Face Inference account, then visit the link below.

- https://huggingface.co/settings/tokens


## [Hugging Face Inference Documentation](https://huggingface.co/docs/api-inference/index)

[Hugging Face Inference documentation](https://huggingface.co/docs/api-inference/index) is available [here](https://huggingface.co/docs/api-inference/index).


## [Hugging Face Inference X](https://www.x.com/huggingface)

![@huggingface](https://pbs.twimg.com/profile_images/1798110641414443008/XP8gyBaY_normal.jpg)

[@huggingface](https://www.x.com/huggingface)


