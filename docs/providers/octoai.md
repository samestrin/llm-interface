![OctoAI](https://www.datocms-assets.com/45680/1715637918-octoai-efficient-reliable-customizable-genai.png?auto=format)

# OctoAI

OctoAI, originating from the University of Washington, specializes in creating efficient, reliable, and customizable AI systems. The company builds on GenAI optimization and offers a broad range of hardware options or integrates into existing environments. OctoAI's roots trace back to the creators of Apache TVM, a technology enabling ML models to run efficiently on any hardware. Their mission is to harness the value of AI innovations, supported by significant funding and a global team.

## Interface Name

- `octoai`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'octoai': process.env.OCTOAI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('octoai', 'Explain the importance of low latency LLMs.');
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

- `default`: mistral-7b-instruct
- `large`: mixtral-8x22b-instruct
- `small`: mistral-7b-instruct
- `agent`: mixtral-8x22b-instruct


## Options

The following values can be passed through `options`.

- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `presence_penalty`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `top_p`: _Details not available, please refer to the LLM provider documentation._


## Getting an API Key

**Commercial with Free Trial:** The Octo AI API is a commercial product but offers a $5.00 credit to get started. No credit card is required initially. 

To get an API key, first create an OctoAI account, then visit the link below.

- https://octoml.cloud/settings


## [OctoAI Documentation](https://octo.ai/docs/getting-started/quickstart)

[OctoAI documentation](https://octo.ai/docs/getting-started/quickstart) is available [here](https://octo.ai/docs/getting-started/quickstart).
