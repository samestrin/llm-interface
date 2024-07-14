![GooseAI](https://goose.ai/_next/static/media/twitter-card.ef9b825e.png)

# [GooseAI](https://goose.ai)

Goose AI offers a fully managed, cost-effective Natural Language Processing (NLP) as a Service platform delivered via API. This allows businesses to easily integrate AI-powered language capabilities into their products and services without needing to manage complex infrastructure. GooseAI claims to provide these services at a significantly lower cost compared to other providers, making it an attractive option for businesses looking to leverage AI while managing expenses.

## Interface Name

- `gooseai`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'gooseai': process.env.GOOSEAI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('gooseai', 'Explain the importance of low latency LLMs.');
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

- `default`: gpt-neo-20b
- `large`: gpt-neo-20b
- `small`: gpt-neo-125m
- `agent`: gpt-j-6b


## Options

The following parameters can be passed through `options`.

- `echo`: If set to true, the input prompt is echoed back in the output.
- `frequency_penalty`: Penalizes new tokens based on their existing frequency in the text so far, reducing the likelihood of repeating the same line. Positive values reduce the frequency of tokens appearing in the generated text.
- `logit_bias`: An optional parameter that modifies the likelihood of specified tokens appearing in the model-generated output.
- `logprobs`: Includes the log probabilities of the most likely tokens, providing insights into the model's token selection process.
- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `min_tokens`: Minimum number of tokens in the response.
- `n`: Specifies the number of responses to generate for each input message. Note that costs are based on the number of generated tokens across all choices. Keeping n as 1 minimizes costs.
- `presence_penalty`: Penalizes new tokens based on whether they appear in the text so far, encouraging the model to talk about new topics. Positive values increase the likelihood of new tokens appearing in the generated text.
- `prompt`: _Details not available, please refer to the LLM provider documentation._
- `repetition_penalty`: Penalizes new tokens based on whether they appear in the prompt and the generated text so far. Values greater than 1 encourage the model to use new tokens, while values less than 1 encourage the model to repeat tokens.
- `repetition_penalty_range`: _Details not available, please refer to the LLM provider documentation._
- `repetition_penalty_slope`: _Details not available, please refer to the LLM provider documentation._
- `stop`: Up to 4 sequences where the API will stop generating further tokens.
- `stream`: If set, partial message deltas will be sent, similar to ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.
- `tfs`: _Details not available, please refer to the LLM provider documentation._
- `top_a`: _Details not available, please refer to the LLM provider documentation._
- `top_k`: The number of highest probability vocabulary tokens to keep for top-k sampling.
- `top_p`: Controls the cumulative probability of token selections for nucleus sampling. It limits the tokens to the smallest set whose cumulative probability exceeds the threshold. It is recommended to alter this or temperature, but not both.
- `typical_p`: _Details not available, please refer to the LLM provider documentation._


### Features

- Streaming


## Getting an API Key

**Commercial with Free Trial**: The Goose AI API is a commercial product but offers a $9.99 credit to get started. No credit card is required initially.

To get an API key, first create a GooseAI account, then visit the link below.

- https://goose.ai/dashboard/apikeys


## [GooseAI Documentation](https://goose.ai/docs)

[GooseAI documentation](https://goose.ai/docs) is available [here](https://goose.ai/docs).


## [GooseAI X](https://www.x.com/gooseai_NLP)

![@gooseai_NLP](https://pbs.twimg.com/profile_images/1798110641414443008/XP8gyBaY_normal.jpg)

[@gooseai_NLP](https://www.x.com/gooseai_NLP)


