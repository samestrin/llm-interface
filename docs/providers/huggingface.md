![Hugging Face Inference API](https://huggingface.co/front/thumbnails/v2-2.png)

# [Hugging Face Inference API](https://www.huggingface.co)

Hugging Face offers a serverless Inference API, allowing users to easily test and evaluate various machine learning models, including both publicly available and private ones. With simple HTTP requests, users can access over 150,000 models hosted on Hugging Face's shared infrastructure. The API covers a wide range of tasks in natural language processing, audio, and vision, making it a versatile tool for developers and researchers. While free to use, the Inference API is rate limited, with options for higher request rates and dedicated endpoints for production-level workloads.

## Interface Name

- `huggingface`


## Model Aliases

The following model aliases are provided for this provider. 

- `default`: meta-llama/Meta-Llama-3-8B-Instruct
- `large`: meta-llama/Meta-Llama-3-8B-Instruct
- `small`: microsoft/Phi-3-mini-4k-instruct
- `agent`: meta-llama/Meta-Llama-3-8B-Instruct

## Embeddings

- `default`: sentence-transformers/all-mpnet-base-v2
- `large`: sentence-transformers/sentence-t5-large
- `small`: sentence-transformers/all-MiniLM-L6-v2


## Options

The following values can be passed through `options`.

- `arguments will vary by model`: _Details not available, please refer to Hugging Face Inference API documentation._
- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.
- `top_k`: The number of highest probability vocabulary tokens to keep for top-k sampling.
- `top_p`: Controls the cumulative probability of token selections for nucleus sampling. It limits the tokens to the smallest set whose cumulative probability exceeds the threshold. It is recommended to alter this or temperature, but not both.


## Features

- Embeddings: true


## Getting an API Key

**Free Tier Available**: The Hugging Face Inference API is currently free for rate-limited, non-commercial use.

To get an API key, first create a Hugging Face Inference API account, then visit the link below.

- https://huggingface.co/settings/tokens


## Hugging Face Inference API Documentation](undefined

[Hugging Face Inference API documentation](https://huggingface.co/docs/api-inference/index) is available [here](https://huggingface.co/docs/api-inference/index).
