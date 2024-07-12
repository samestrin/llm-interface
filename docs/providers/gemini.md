![Google Gemini](https://ai.google.dev/static/site-assets/images/share.png)

# Google Gemini

Google Gemini is a family of multimodal AI models developed by Google. It is designed to process and generate various forms of content, including text, images, and potentially audio and video. Gemini is considered one of Google's most capable and general models, with potential applications ranging from chatbots and virtual assistants to creative tools and search enhancements. Notably, Gemini excels in coding tasks, ranking among the leading foundation models for code generation. The models are being integrated into various Google products and services, aiming to enhance user experiences across platforms and applications.

## Interface Name

- `gemini`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'gemini': process.env.GEMINI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('gemini', 'Explain the importance of low latency LLMs.');
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

- `default`: gemini-1.5-flash
- `large`: gemini-1.5-pro
- `small`: gemini-1.5-flash
- `agent`: gemini-1.5-pro

### Embeddings

- `default`: text-embedding-004
- `large`: text-embedding-004
- `small`: text-embedding-004


## Options

The following values can be passed through `options`.

- `candidateCount`: _Details not available, please refer to the LLM provider documentation._
- `max_tokens`: _Details not available, please refer to the LLM provider documentation._
- `stopSequences`: _Details not available, please refer to the LLM provider documentation._
- `temperature`: _Details not available, please refer to the LLM provider documentation._
- `topK`: _Details not available, please refer to the LLM provider documentation._
- `topP`: _Details not available, please refer to the LLM provider documentation._


### Features

- Native JSON Mode
- Streaming
- Embeddings


## Getting an API Key

**Free**: The Gemini API is currently free to use.

To get an API key, first create a Google Gemini account, then visit the link below.

- https://makersuite.google.com/app/apikey


## [Google Gemini Documentation](https://ai.google.dev/gemini-api/docs)

[Google Gemini documentation](https://ai.google.dev/gemini-api/docs) is available [here](https://ai.google.dev/gemini-api/docs).
