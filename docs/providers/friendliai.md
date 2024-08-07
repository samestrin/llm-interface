![FriendliAI](https://friendli.ai/opengraph-image.png)

# [FriendliAI](https://friendli.ai)

FriendliAI is a company focused on making generative AI accessible to all businesses. They provide efficient and scalable solutions for deploying and managing generative AI models, eliminating the complexities often associated with this technology. FriendliAI offers various products, such as Friendli Container, Friendli Dedicated Endpoints, and Friendli Serverless Endpoints, to cater to different needs and budgets. Their mission is to empower companies to innovate and achieve their goals through the effective use of generative AI.

## Interface Name

- `friendliai`

### Example Usage

```javascript
const { LLMInterface } = require('llm-interface');

LLMInterface.setApiKey({'friendliai': process.env.FRIENDLIAI_API_KEY});

async function main() {
  try {
    const response = await LLMInterface.sendMessage('friendliai', 'Explain the importance of low latency LLMs.');
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

- `default`: mixtral-8x7b-instruct-v0-1
- `large`: meta-llama-3-70b-instruct
- `small`: meta-llama-3-8b-instruct
- `agent`: gemma-7b-it


## Options

The following parameters can be passed through `options`.

- `frequency_penalty`: Penalizes new tokens based on their existing frequency in the text so far, reducing the likelihood of repeating the same line. Positive values reduce the frequency of tokens appearing in the generated text.
- `max_tokens`: The maximum number of tokens that can be generated in the chat completion. The total length of input tokens and generated tokens is limited by the model's context length.
- `n`: Specifies the number of responses to generate for each input message. Note that costs are based on the number of generated tokens across all choices. Keeping n as 1 minimizes costs.
- `presence_penalty`: Penalizes new tokens based on whether they appear in the text so far, encouraging the model to talk about new topics. Positive values increase the likelihood of new tokens appearing in the generated text.
- `response_format`: Defines the format of the AI's response. Setting this to { "type": "json_object" } enables JSON mode, ensuring the message generated by the model is valid JSON.
- `stop`: Up to 4 sequences where the API will stop generating further tokens.
- `stream`: If set, partial message deltas will be sent, similar to ChatGPT. Tokens will be sent as data-only server-sent events as they become available, with the stream terminated by a data: [DONE] message.
- `temperature`: Controls the randomness of the AI's responses. A higher temperature results in more random outputs, while a lower temperature makes the output more focused and deterministic. Generally, it is recommended to alter this or top_p, but not both.
- `timeout_microseconds`: _Details not available, please refer to the LLM provider documentation._


### Features

- Native JSON Mode
- Streaming


## Getting an API Key

**Commercial with Free Trial**: The Friendli AI API is a commercial product but offers a $5.00 credit to get started.

To get an API key, first create a FriendliAI account, then visit the link below.

- https://suite.friendli.ai/user-settings/tokens


## [FriendliAI Documentation](https://docs.friendli.ai/)

[FriendliAI documentation](https://docs.friendli.ai/) is available [here](https://docs.friendli.ai/).
