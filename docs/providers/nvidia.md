![NVIDIA AI](https://www.nvidia.com/content/dam/en-zz/Solutions/homepage/v2/sfg/nvidia-corporate-og-image-1200x630.jpg)

# [NVIDIA AI](https://www.nvidia.com)

NVIDIA NIM is a set of inference microservices designed to accelerate the deployment of large language models (LLMs). Part of NVIDIA AI Enterprise, NIM provides models as optimized containers, enabling developers to easily deploy them on various platforms like clouds, data centers, or workstations. This streamlines the process of building generative AI applications like copilots, chatbots, and more. Additionally, NIM helps enterprises maximize their infrastructure investments by boosting efficiency and allowing for more responses from the same amount of compute resources.

## Interface Name

- `nvidia`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'nvidia': process.env.NVIDIA_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('nvidia', 'Explain the importance of low latency LLMs.');
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

- `default`: nvidia/llama3-chatqa-1.5-8b
- `large`: nvidia/nemotron-4-340b-instruct
- `small`: microsoft/phi-3-mini-128k-instruct
- `agent`: nvidia/llama3-chatqa-1.5-8b


## Options

The following values can be passed through `options`.

- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `top_p`: _Details not available, please refer to the LLM provider documentation._


### Features

- Streaming: true


## Getting an API Key

**Commercial with Free Trial:** The NVIDIA API comes with 1000 credits to get started. Navigate to a specific model page to obtain your API key.

To get an API key, first create a NVIDIA AI account, then visit the link below.

- https://build.nvidia.com/meta/llama3-70b

After visiting the URL, click on "Get API Key". You can find the link on the right side of the page.


## [NVIDIA AI Documentation](https://developer.nvidia.com/accelerate-ai-applications/get-started)

[NVIDIA AI documentation](https://developer.nvidia.com/accelerate-ai-applications/get-started) is available [here](https://developer.nvidia.com/accelerate-ai-applications/get-started).


![@NVIDIA](https://pbs.twimg.com/profile_images/1798110641414443008/XP8gyBaY_normal.jpg)
[@NVIDIA](https://www.x.com/NVIDIA)

Anthropic
