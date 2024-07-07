# Ollama

Ollama is an open-source project that allows users to run large language models (LLMs) on their local devices. It aims to make LLMs more accessible and affordable by providing a user-friendly interface and removing the need for expensive cloud computing resources. Ollama supports various models and offers features like model downloading, running, and fine-tuning, enabling users to customize and experiment with LLMs for a variety of applications.

## Interface Name

- `ollama`


## Model Aliases

The following model aliases are provided for this provider. 

- `default`: llama3
- `large`: llama3
- `small`: llama3

## Embeddings

- `default`: all-minilm
- `large`: all-minilm
- `small`: all-minilm


## Options

The following values can be passed through `options`.

- `context`: _Details not available, please refer to Ollama documentation._
- `format`: _Details not available, please refer to Ollama documentation._
- `keep_alive`: _Details not available, please refer to Ollama documentation._
- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `options`: _Details not available, please refer to Ollama documentation._
- `raw`: _Details not available, please refer to Ollama documentation._
- `stream`: If set, partial message deltas will be sent, similar to ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
- `system`: Defines the role and instructions for the system component of the AI interaction, guiding the overall behavior.
- `template`: _Details not available, please refer to Ollama documentation._


## Features

- Native JSON Mode: true
- Streaming: true
- Embeddings: true


## Ollama Documentation](undefined

[Ollama documentation](https://github.com/ollama/ollama/blob/main/docs/api.md) is available [here](https://github.com/ollama/ollama/blob/main/docs/api.md).
