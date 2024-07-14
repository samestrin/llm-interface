![HyperBee AI](https://samestrin.github.io/media/llm-interface/hyperbee.ai.1024x641.png)

# [HyperBee AI](https://hyperbee.ai)

HyperBeeAI is an artificial intelligence (AI) company that develops small-footprint language models (LLMs) designed for on-premises deployment. Their technology aims to reduce computing costs and enhance data privacy for businesses by enabling the use of powerful AI capabilities locally. HyperBeeAI's platform includes a proprietary framework for training and deploying customized LLMs, addressing the growing demand for efficient and secure AI solutions in various industries.

## Interface Name

- `hyperbeeai`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'hyperbeeai': process.env.HYPERBEEAI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('hyperbeeai', 'Explain the importance of low latency LLMs.');
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

- `default`: hive
- `large`: gpt-4o
- `small`: gemini-1.5-flash
- `agent`: gpt-4o


## Options

The following parameters can be passed through `options`.

- `add_generation_prompt`: If true, adds the generation prompt to the chat template.
- `best_of`: Number of completions to generate and return the best.
- `echo`: If set to true, the input prompt is echoed back in the output.
- `frequency_penalty`: Penalizes new tokens based on their existing frequency in the text so far, reducing the likelihood of repeating the same line. Positive values reduce the frequency of tokens appearing in the generated text.
- `ignore_eos`: Whether to ignore the end-of-sequence token.
- `include_stop_str_in_output`: Whether to include the stop string in the output.
- `input_value`: _Details not available, please refer to the LLM provider documentation._
- `json_schema`: _Details not available, please refer to the LLM provider documentation._
- `language`: _Details not available, please refer to the LLM provider documentation._
- `length_penalty`: Penalty for length of the response.
- `logit_bias`: An optional parameter that modifies the likelihood of specified tokens appearing in the model-generated output.
- `logprobs`: Includes the log probabilities of the most likely tokens, providing insights into the model's token selection process.
- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `min_p`: Minimum probability threshold for token selection.
- `n`: Specifies the number of responses to generate for each input message. Note that costs are based on the number of generated tokens across all choices. Keeping n as 1 minimizes costs.
- `optimization`: _Details not available, please refer to the LLM provider documentation._
- `output_mode`: _Details not available, please refer to the LLM provider documentation._
- `presence_penalty`: Penalizes new tokens based on whether they appear in the text so far, encouraging the model to talk about new topics. Positive values increase the likelihood of new tokens appearing in the generated text.
- `repetition_penalty`: Penalizes new tokens based on whether they appear in the prompt and the generated text so far. Values greater than 1 encourage the model to use new tokens, while values less than 1 encourage the model to repeat tokens.
- `skip_special_tokens`: Whether to skip special tokens in the response.
- `spaces_between_special_tokens`: Whether to include spaces between special tokens.
- `stop`: Up to 4 sequences where the API will stop generating further tokens.
- `stop_token_ids`: Token IDs at which to stop generating further tokens.
- `stream`: If set, partial message deltas will be sent, similar to ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.
- `top_k`: The number of highest probability vocabulary tokens to keep for top-k sampling.
- `top_p`: Controls the cumulative probability of token selections for nucleus sampling. It limits the tokens to the smallest set whose cumulative probability exceeds the threshold. It is recommended to alter this or temperature, but not both.
- `use_beam_search`: Whether to use beam search for generating completions.
- `user`: Identifier for the user making the request.


### Features

- Native JSON Mode
- Streaming


## Getting an API Key

**Commercial (Details Pending)**: The Hyperbee AI API is a commercial product.

To get an API key, first create a HyperBee AI account, then visit the link below.

- https://platform.hyperbee.ai/keys


## [HyperBee AI Documentation](https://docs.hyperbee.ai/api)

[HyperBee AI documentation](https://docs.hyperbee.ai/api) is available [here](https://docs.hyperbee.ai/api).
