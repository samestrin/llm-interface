# LLaMA.CPP

LLaMA.CPP is an open-source project that enables inference of Large Language Models (LLMs) like LLaMA on various hardware. Written in C/C++, it boasts minimal dependencies and supports diverse platforms, from Apple Silicon to NVIDIA GPUs. Notably, it excels in quantization techniques, reducing model sizes and accelerating inference speeds.  LLaMA.CPP democratizes access to powerful AI capabilities, allowing users to run sophisticated language models on consumer-grade devices.

LLaMA.CPP uses `n_predict` instead of `max_tokens`; however you can safely use `max_tokens` because it will be converted automatically. To use embeddings you will also need to start your webserver with `--embedding` argument and an appropriate model. _The expected port is `8080`._

## Interface Name

- `llamacpp`


## Model Aliases

The following model aliases are provided for this provider. 

- `default`: gpt-3.5-turbo
- `large`: gpt-3.5-turbo
- `small`: gpt-3.5-turbo
- `agent`: openhermes


## Options

The following values can be passed through `options`.

- `cache_prompt`: _Details not available, please refer to LLaMA.CPP documentation._
- `dynatemp_exponent`: _Details not available, please refer to LLaMA.CPP documentation._
- `dynatemp_range`: _Details not available, please refer to LLaMA.CPP documentation._
- `frequency_penalty`: Penalizes new tokens based on their existing frequency in the text so far, reducing the likelihood of repeating the same line. Positive values reduce the frequency of tokens appearing in the generated text.
- `grammar`: _Details not available, please refer to LLaMA.CPP documentation._
- `id_slot`: _Details not available, please refer to LLaMA.CPP documentation._
- `ignore_eos`: Whether to ignore the end-of-sequence token.
- `image_data`: _Details not available, please refer to LLaMA.CPP documentation._
- `json_schema`: _Details not available, please refer to LLaMA.CPP documentation._
- `logit_bias`: An optional parameter that modifies the likelihood of specified tokens appearing in the model-generated output.
- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `min_keep`: _Details not available, please refer to LLaMA.CPP documentation._
- `min_p`: Minimum probability threshold for token selection.
- `mirostat`: _Details not available, please refer to LLaMA.CPP documentation._
- `mirostat_eta`: _Details not available, please refer to LLaMA.CPP documentation._
- `mirostat_tau`: _Details not available, please refer to LLaMA.CPP documentation._
- `n_keep`: _Details not available, please refer to LLaMA.CPP documentation._
- `n_probs`: _Details not available, please refer to LLaMA.CPP documentation._
- `penalize_nl`: _Details not available, please refer to LLaMA.CPP documentation._
- `penalty_prompt`: _Details not available, please refer to LLaMA.CPP documentation._
- `presence_penalty`: Penalizes new tokens based on whether they appear in the text so far, encouraging the model to talk about new topics. Positive values increase the likelihood of new tokens appearing in the generated text.
- `repeat_last_n`: _Details not available, please refer to LLaMA.CPP documentation._
- `repeat_penalty`: _Details not available, please refer to LLaMA.CPP documentation._
- `samplers`: _Details not available, please refer to LLaMA.CPP documentation._
- `seed`: A random seed for reproducibility. If specified, the system will attempt to sample deterministically, ensuring repeated requests with the same seed and parameters return the same result. Determinism is not guaranteed.
- `stop`: Up to 4 sequences where the API will stop generating further tokens.
- `stream`: If set, partial message deltas will be sent, similar to ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
- `system_prompt`: _Details not available, please refer to LLaMA.CPP documentation._
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.
- `tfs_z`: _Details not available, please refer to LLaMA.CPP documentation._
- `top_k`: The number of highest probability vocabulary tokens to keep for top-k sampling.
- `top_p`: Controls the cumulative probability of token selections for nucleus sampling. It limits the tokens to the smallest set whose cumulative probability exceeds the threshold. It is recommended to alter this or temperature, but not both.
- `typical_p`: _Details not available, please refer to LLaMA.CPP documentation._


## Features

- Streaming: true
- Embeddings: true


## Getting an API Key


To get an API key, first create a LLaMA.CPP account, then visit the link below.

- http://localhost:8080/v1/chat/completions


## LLaMA.CPP Documentation](undefined

[LLaMA.CPP documentation](https://github.com/ggerganov/llama.cpp/blob/master/examples/server/README.md) is available [here](https://github.com/ggerganov/llama.cpp/blob/master/examples/server/README.md).
