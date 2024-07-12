# [Zhipu AI](https://www.bigmodel.cn)

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
- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `request_id`: _Details not available, please refer to the LLM provider documentation._
- `stop`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `tool_choice`: _Details not available, please refer to the LLM provider documentation._
- `tools`: _Details not available, please refer to the LLM provider documentation._
- `top_p`: _Details not available, please refer to the LLM provider documentation._
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
