![Writer](https://writer.com/wp-content/uploads/2024/01/writer-share.png)

# [Writer](https://writer.com)

Writer is a comprehensive AI platform designed for enterprises to harness the power of generative AI. It enables businesses to streamline workflows, enhance productivity, and maintain brand consistency across various applications. Writer's platform offers tools for content creation, analysis, and governance, ensuring high-quality output that aligns with company guidelines and standards. With features like custom AI app deployment, content generation, summarization, and data analysis, Writer empowers teams to unlock new levels of efficiency and innovation in their work.

## Interface Name

- `writer`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'writer': process.env.WRITER_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('writer', 'Explain the importance of low latency LLMs.');
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

- `default`: palmyra-x-002-32k
- `large`: palmyra-x-002-32k
- `small`: palmyra-x-002-32k


## Options

The following parameters can be passed through `options`.

- `choices`: _Details not available, please refer to the LLM provider documentation._
- `created`: _Details not available, please refer to the LLM provider documentation._
- `id`: _Details not available, please refer to the LLM provider documentation._
- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `n`: Specifies the number of responses to generate for each input message. Note that costs are based on the number of generated tokens across all choices. Keeping n as 1 minimizes costs.
- `stop`: Up to 4 sequences where the API will stop generating further tokens.
- `stream`: If set, partial message deltas will be sent, similar to ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.
- `top_p`: Controls the cumulative probability of token selections for nucleus sampling. It limits the tokens to the smallest set whose cumulative probability exceeds the threshold. It is recommended to alter this or temperature, but not both.


### Features

- Streaming


## Getting an API Key

**Commercial with Free Trial:** The Writer API is a commercial service but offers a free tier with $50.00 in free credits to get started.

To get an API key, first create a Writer account, then visit the link below.

- https://dev.writer.com/api-guides/quickstart#generate-a-new-api-key

The link above does not take you directly to the API key generation page, instead it takes you to the multi-step API key generation directions.


## [Writer Documentation](https://dev.writer.com/home/introduction)

[Writer documentation](https://dev.writer.com/home/introduction) is available [here](https://dev.writer.com/home/introduction).


## [Writer X](https://www.x.com/Get_Writer)

![@Get_Writer](https://pbs.twimg.com/profile_images/1798110641414443008/XP8gyBaY_normal.jpg)

[@Get_Writer](https://www.x.com/Get_Writer)


