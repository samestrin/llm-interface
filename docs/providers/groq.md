# [Groq](https://www.groq.com)

Groq is a company that develops hardware and software for accelerating artificial intelligence and machine learning workloads. They specialize in creating Tensor Streaming Processor (TSP) architecture, which is designed to optimize the performance and efficiency of AI computations. Groq's technology aims to deliver high performance and low latency for various applications, such as natural language processing, computer vision, and recommendation systems. The company's focus on hardware acceleration distinguishes them in the field of AI infrastructure providers.

## Interface Name

- `groq`


## Model Aliases

The following model aliases are provided for this provider. 

- `default`: llama3-8b-8192
- `large`: llama3-70b-8192
- `small`: gemma-7b-it
- `agent`: llama3-8b-8192


## Options

The following values can be passed through `options`.

- `frequency_penalty`: Penalizes new tokens based on their existing frequency in the text so far, reducing the likelihood of repeating the same line. Positive values reduce the frequency of tokens appearing in the generated text.
- `function_call`: _Details not available, please refer to Groq documentation._
- `functions`: _Details not available, please refer to Groq documentation._
- `logit_bias`: An optional parameter that modifies the likelihood of specified tokens appearing in the model-generated output.
- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `n`: Specifies the number of responses to generate for each input message. Note that costs are based on the number of generated tokens across all choices. Keeping n as 1 minimizes costs.
- `presence_penalty`: Penalizes new tokens based on whether they appear in the text so far, encouraging the model to talk about new topics. Positive values increase the likelihood of new tokens appearing in the generated text.
- `stop`: Up to 4 sequences where the API will stop generating further tokens.
- `stream`: If set, partial message deltas will be sent, similar to ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.
- `top_p`: Controls the cumulative probability of token selections for nucleus sampling. It limits the tokens to the smallest set whose cumulative probability exceeds the threshold. It is recommended to alter this or temperature, but not both.
- `user`: Identifier for the user making the request.


## Features

- Streaming: true
- Functions: true


## Getting an API Key

**Free**: The Groq API is currently free to use.

To get an API key, first create a Groq account, then visit the link below.

- https://console.groq.com/keys


## Groq Documentation](undefined

[Groq documentation](https://docs.api.groq.com/index.html) is available [here](https://docs.api.groq.com/index.html).
