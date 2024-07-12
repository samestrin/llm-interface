# TheB.ai

TheB is an AI chatbot platform that aims to simplify the integration of artificial intelligence into workflows. It offers various AI chatbot models accessible via API or their user-friendly web application, which is designed for both individual and team use. TheB's platform features include real-time search capabilities, customizable model personas, and long-term memory to improve conversation flow. Additionally, it supports image generation and multiple model options, with advanced parameters for custom model tuning.

## Interface Name

- `thebai`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'thebai': process.env.THEBAI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('thebai', 'Explain the importance of low latency LLMs.');
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

- `default`: gpt-4-turbo
- `large`: llama-3-70b-chat
- `small`: llama-2-7b-chat
- `agent`: gpt-4-turbo


## Options

The following values can be passed through `options`.

- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `model_params.temperature`: _Details not available, please refer to the LLM provider documentation._
- `model_params.top_p`: _Details not available, please refer to the LLM provider documentation._
- `stream`: _Details not available, please refer to the LLM provider documentation._


### Features

- Streaming


## Getting an API Key

**Details Pending:** You can attempt to request an API key by visiting their dashboard.

To get an API key, first create a TheB.ai account, then visit the link below.

- https://beta.theb.ai/home

After visiting the URL, click "Manage Account" -> "API keys" -> "Create key".


## [TheB.ai Documentation](https://docs.theb.ai/)

[TheB.ai documentation](https://docs.theb.ai/) is available [here](https://docs.theb.ai/).
