![Cohere](https://cdn.sanity.io/images/rjtqmwfu/production/5a374837aab376bb677b3a968c337532ea16f6cb-800x600.png?rect=0,90,800,420&w=1200&h=630)

# [Cohere](https://www.cohere.ai)

**Trial Keys Available**: Cohere is an AI company specializing in large language models (LLMs) designed for enterprise use. They offer a platform that allows developers to leverage pre-built models or create custom models tailored to specific business needs. Cohere's technology empowers businesses to integrate natural language processing capabilities into their applications, streamlining tasks such as text generation, analysis, and understanding. Their focus on enterprise solutions sets them apart, providing secure and customizable AI tools to improve efficiency and productivity across various industries.

## Interface Name

- `cohere`


## Model Aliases

The following model aliases are provided for this provider. 

- `default`: command-r
- `large`: command-r-plus
- `small`: command-light
- `agent`: command-r-plus

## Embeddings

- `default`: embed-english-v3.0
- `large`: embed-english-v3.0
- `small`: embed-english-light-v3.0


## Options

The following values can be passed through `options`.

- `chat_history`: _Details not available, please refer to Cohere documentation._
- `connectors`: _Details not available, please refer to Cohere documentation._
- `conversation_id`: _Details not available, please refer to Cohere documentation._
- `documents`: _Details not available, please refer to Cohere documentation._
- `force_single_step`: _Details not available, please refer to Cohere documentation._
- `frequency_penalty`: Penalizes new tokens based on their existing frequency in the text so far, reducing the likelihood of repeating the same line. Positive values reduce the frequency of tokens appearing in the generated text.
- `k`: _Details not available, please refer to Cohere documentation._
- `max_input_tokens`: _Details not available, please refer to Cohere documentation._
- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `p`: _Details not available, please refer to Cohere documentation._
- `preamble`: _Details not available, please refer to Cohere documentation._
- `presence_penalty`: Penalizes new tokens based on whether they appear in the text so far, encouraging the model to talk about new topics. Positive values increase the likelihood of new tokens appearing in the generated text.
- `prompt_truncation`: _Details not available, please refer to Cohere documentation._
- `seed`: A random seed for reproducibility. If specified, the system will attempt to sample deterministically, ensuring repeated requests with the same seed and parameters return the same result. Determinism is not guaranteed.
- `stop_sequences`: Sequences that indicate to the model when to stop generating further tokens.
- `stream`: If set, partial message deltas will be sent, similar to ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.
- `tool_results`: _Details not available, please refer to Cohere documentation._
- `tools`: A list of external tools available for the AI to use in generating responses.


## Features

- Streaming: true
- Tools: true
- Embeddings: true


## Getting an API Key

The Cohere API offers trial keys with rate limits. These keys are not intended for commercial use.

To get an API key, first create a Cohere account, then visit the link below.

- https://dashboard.cohere.com/api-keys


## Cohere Documentation](undefined

[Cohere documentation](https://docs.cohere.com/) is available [here](https://docs.cohere.com/).
