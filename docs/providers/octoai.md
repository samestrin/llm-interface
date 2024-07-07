# OctoAI

OctoAI, originating from the University of Washington, specializes in creating efficient, reliable, and customizable AI systems. The company builds on GenAI optimization and offers a broad range of hardware options or integrates into existing environments. OctoAI's roots trace back to the creators of Apache TVM, a technology enabling ML models to run efficiently on any hardware. Their mission is to harness the value of AI innovations, supported by significant funding and a global team.

## Interface Name

- `octoai`


## Model Aliases

The following model aliases are provided for this provider. 

- `default`: mistral-7b-instruct
- `large`: mixtral-8x22b-instruct
- `small`: mistral-7b-instruct
- `agent`: mixtral-8x22b-instruct


## Options

The following values can be passed through `options`.

- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `presence_penalty`: Penalizes new tokens based on whether they appear in the text so far, encouraging the model to talk about new topics. Positive values increase the likelihood of new tokens appearing in the generated text.
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.
- `top_p`: Controls the cumulative probability of token selections for nucleus sampling. It limits the tokens to the smallest set whose cumulative probability exceeds the threshold. It is recommended to alter this or temperature, but not both.
