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
- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `n`: _Details not available, please refer to the LLM provider documentation._
- `stop`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `top_p`: _Details not available, please refer to the LLM provider documentation._


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


