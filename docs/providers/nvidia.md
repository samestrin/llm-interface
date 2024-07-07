# NVIDIA AI

NVIDIA NIM is a set of inference microservices designed to accelerate the deployment of large language models (LLMs). Part of NVIDIA AI Enterprise, NIM provides models as optimized containers, enabling developers to easily deploy them on various platforms like clouds, data centers, or workstations. This streamlines the process of building generative AI applications like copilots, chatbots, and more. Additionally, NIM helps enterprises maximize their infrastructure investments by boosting efficiency and allowing for more responses from the same amount of compute resources.

## Interface Name

- `nvidia`


## Model Aliases

The following model aliases are provided for this provider. 

- `default`: nvidia/llama3-chatqa-1.5-8b
- `large`: nvidia/nemotron-4-340b-instruct
- `small`: microsoft/phi-3-mini-128k-instruct


## Options

The following values can be passed through `options`.

- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `stream`: If set, partial message deltas will be sent, similar to ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.
- `top_p`: Controls the cumulative probability of token selections for nucleus sampling. It limits the tokens to the smallest set whose cumulative probability exceeds the threshold. It is recommended to alter this or temperature, but not both.


## Features

- Streaming: true


## NVIDIA AI Documentation](undefined

[NVIDIA AI documentation](https://developer.nvidia.com/accelerate-ai-applications/get-started) is available [here](https://developer.nvidia.com/accelerate-ai-applications/get-started).
