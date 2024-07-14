![DeepSeek](https://chat.deepseek.com/deepseek-chat.jpeg)

# [DeepSeek](https://deepseek.com)

DeepSeek offers a chat-based AI model named 'deepseek-chat' for various text generation tasks, including creative writing, code generation, and answering questions. The underlying technology, DeepSeek-V2, is a large language model (LLM) with 236 billion parameters, known for its top-tier performance on major model leaderboards like AlignBench, MT-Bench, and MMLU. DeepSeek-V2 excels at math, code, and reasoning, making 'deepseek-chat' a versatile tool for both technical and creative applications.  It is also an open-source model, which promotes transparency and community collaboration.

## Interface Name

- `deepseek`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'deepseek': process.env.DEEPSEEK_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('deepseek', 'Explain the importance of low latency LLMs.');
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

- `default`: deepseek-chat
- `large`: deepseek-chat
- `small`: deepseek-chat
- `agent`: deepseek-chat


## Options

The following parameters can be passed through `options`.

- `frequency_penalty`: Penalizes new tokens based on their existing frequency in the text so far, reducing the likelihood of repeating the same line. Positive values reduce the frequency of tokens appearing in the generated text.
- `logprobs`: Includes the log probabilities of the most likely tokens, providing insights into the model's token selection process.
- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `presence_penalty`: Penalizes new tokens based on whether they appear in the text so far, encouraging the model to talk about new topics. Positive values increase the likelihood of new tokens appearing in the generated text.
- `stop`: Up to 4 sequences where the API will stop generating further tokens.
- `stream`: If set, partial message deltas will be sent, similar to ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.
- `top_logprobs`: _Details not available, please refer to the LLM provider documentation._
- `top_p`: Controls the cumulative probability of token selections for nucleus sampling. It limits the tokens to the smallest set whose cumulative probability exceeds the threshold. It is recommended to alter this or temperature, but not both.


### Features

- Streaming


## Getting an API Key

**Commercial with Free Trial**: The DeepSeek API is a commercial product and requires a credit or debit card to get started.

To get an API key, first create a DeepSeek account, then visit the link below.

- https://platform.deepseek.com/api_keys


## [DeepSeek Documentation](https://platform.deepseek.com/api-docs/)

[DeepSeek documentation](https://platform.deepseek.com/api-docs/) is available [here](https://platform.deepseek.com/api-docs/).


## [DeepSeek X](https://www.x.com/site)

![@site](https://pbs.twimg.com/profile_images/1798110641414443008/XP8gyBaY_normal.jpg)

[@site](https://www.x.com/site)


