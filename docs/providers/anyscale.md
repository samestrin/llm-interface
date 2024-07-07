![Anyscale](https://images.ctfassets.net/xjan103pcp94/cpKmR4XdiqNwmVIPyso3s/420926d0c276ff5e80faae17200f2acb/Webinar-Anyscale_logo.png)

# [Anyscale](https://endpoints.anyscale.com)

Anyscale is a leading AI platform that enables developers and AI teams to build, deploy, and scale AI applications with unmatched efficiency. Built on the Ray open-source framework, Anyscale offers a fully managed platform with capabilities like orchestration, experiment management, and hyperparameter tuning. Anyscale is used by thousands of organizations to accelerate their AI development, providing a seamless experience from laptop to production across diverse AI workloads.

## Interface Name

- `anyscale`


## Model Aliases

The following model aliases are provided for this provider. 

- `default`: mistralai/Mixtral-8x22B-Instruct-v0.1
- `large`: meta-llama/Llama-3-70b-chat-hf
- `small`: mistralai/Mistral-7B-Instruct-v0.1
- `agent`: mistralai/Mixtral-8x22B-Instruct-v0.1

## Embeddings

- `default`: thenlper/gte-large
- `large`: thenlper/gte-large
- `small`: BAAI/bge-large-en-v1.5


## Options

The following values can be passed through `options`.

- `frequency_penalty`: Penalizes new tokens based on their existing frequency in the text so far, reducing the likelihood of repeating the same line. Positive values reduce the frequency of tokens appearing in the generated text.
- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.
- `top_p`: Controls the cumulative probability of token selections for nucleus sampling. It limits the tokens to the smallest set whose cumulative probability exceeds the threshold. It is recommended to alter this or temperature, but not both.


## Features

- Embeddings: true


## Getting an API Key

**Commercial with Free Trial**: The Anyscale API does not require a credit card and comes with $10 credit to get started.

To get an API key, first create an Anyscale account, then visit the link below.

- https://console.anyscale.com/v2/api-keys


## Anyscale Documentation](undefined

[Anyscale documentation](https://docs.anyscale.com/reference/) is available [here](https://docs.anyscale.com/reference/).
