![Zhipu AI](https://pbs.twimg.com/card_img/1811406553502658563/mjTxJCNo?format=jpg&name=large)

# [Zhipu AI](https://bigmodel.cn)

Zhipu AI is a Chinese technology company specializing in large language models and artificial intelligence. Their platform, accessible through open.bigmodel.cn, offers various AI models like ChatGLM and CodeGeeX, along with tools for developers and businesses. Zhipu AI is dedicated to advancing AI research and promoting its application across diverse industries, making AI technology more accessible and beneficial for everyone.

## Interface Name

- `zhipuai`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'zhipuai': process.env.ZHIPUAI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('zhipuai', 'Explain the importance of low latency LLMs.');
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

- `default`: glm-4-airx
- `large`: glm-4
- `small`: glm-4-flash
- `agent`: glm-4


## Options

The following parameters can be passed through `options`.

- `do_sample`: _Details not available, please refer to the LLM provider documentation._
- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `request_id`: _Details not available, please refer to the LLM provider documentation._
- `stop`: Up to 4 sequences where the API will stop generating further tokens.
- `stream`: If set, partial message deltas will be sent, similar to ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.
- `tool_choice`: Specifies which external tools the AI can use to assist in generating its response.
- `tools`: A list of external tools available for the AI to use in generating responses.
- `top_p`: Controls the cumulative probability of token selections for nucleus sampling. It limits the tokens to the smallest set whose cumulative probability exceeds the threshold. It is recommended to alter this or temperature, but not both.
- `user_id`: _Details not available, please refer to the LLM provider documentation._


### Features

- Streaming
- Tools


## Getting an API Key

**Free Tier Available:** The Zhipu AI API is a commercial product but offers a free tier. No credit card is required for the free tier.

To get an API key, first create a Zhipu AI account, then visit the link below.

- https://open.bigmodel.cn/usercenter/apikeys

_This website is in the Chinese language._


## [Zhipu AI Documentation](https://open.bigmodel.cn/dev/howuse/introduction)

[Zhipu AI documentation](https://open.bigmodel.cn/dev/howuse/introduction) is available [here](https://open.bigmodel.cn/dev/howuse/introduction).
