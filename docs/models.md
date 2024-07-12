# Models

## Table of Contents

1. [Model Aliases](#model-aliases)
2. [Model Alias Values](#model-alias-values)
    - [AI21 Studio](#ai21)
    - [AiLAYER](#ailayer)
    - [AIMLAPI](#aimlapi)
    - [Anyscale](#anyscale)
    - [Anthropic](#anthropic)
    - [Cloudflare AI](#cloudflareai)
    - [Cohere](#cohere)
    - [Corcel](#corcel)
    - [DeepInfra](#deepinfra)
    - [DeepSeek](#deepseek)
    - [Fireworks AI](#fireworksai)
    - [Forefront AI](#forefront)
    - [FriendliAI](#friendliai)
    - [Google Gemini](#gemini)
    - [GooseAI](#gooseai)
    - [Groq](#groq)
    - [Hugging Face Inference](#huggingface)
    - [HyperBee AI](#hyperbeeai)
    - [Lamini](#lamini)
    - [LLaMA.CPP](#llamacpp)
    - [Mistral AI](#mistralai)
    - [Monster API](#monsterapi)
    - [Neets.ai](#neetsai)
    - [Novita AI](#novitaai)
    - [NVIDIA AI](#nvidia)
    - [OctoAI](#octoai)
    - [Ollama](#ollama)
    - [OpenAI](#openai)
    - [Perplexity AI](#perplexity)
    - [Reka AI](#rekaai)
    - [Replicate](#replicate)
    - [Shuttle AI](#shuttleai)
    - [TheB.ai](#thebai)
    - [Together AI](#togetherai)
    - [Watsonx AI](#watsonxai)
    - [Writer](#writer)
    - [Zhipu AI](#zhipuai)

## Model Aliases

To simplify using LLMInterface.sendMessage(), you can use the following model aliases:

- `default`
- `large`
- `small`
- `agent`

If no model is passed, the system will use the default model for the LLM provider. If you'd prefer to specify your model by size instead of name, pass `large` or `small`.

Aliases can simplify working with multiple LLM providers letting you call different providers with the same model names out of the box.

```javascript
const openaiResult = await LLMInterface.sendMessage("openai", "Explain the importance of low latency LLMs", { model: "small" });
const geminiResult = await LLMInterface.sendMessage("gemini", "Explain the importance of low latency LLMs", { model: "small" });
```

Changing the aliases is easy:

```javascript
LLMInterface.setModelAlias("openai", "default", "gpt-3.5-turbo");
```

## Model Alias Values

### [undefined](providers/ai21.md)  ![ai21](https://samestrin.github.io/media/llm-interface/icons/ai21.png)


### [undefined](providers/ailayer.md) 


### [undefined](providers/aimlapi.md)  ![aimlapi](https://samestrin.github.io/media/llm-interface/icons/aimlapi.png)


### [undefined](providers/anyscale.md)  ![anyscale](https://samestrin.github.io/media/llm-interface/icons/anyscale.png)


### [undefined](providers/anthropic.md)  ![anthropic](https://samestrin.github.io/media/llm-interface/icons/anthropic.png)


### [undefined](providers/cloudflareai.md)  ![cloudflareai](https://samestrin.github.io/media/llm-interface/icons/cloudflareai.png)


### [undefined](providers/cohere.md)  ![cohere](https://samestrin.github.io/media/llm-interface/icons/cohere.png)


### [undefined](providers/corcel.md)  ![corcel](https://samestrin.github.io/media/llm-interface/icons/corcel.png)


### [undefined](providers/deepinfra.md)  ![deepinfra](https://samestrin.github.io/media/llm-interface/icons/deepinfra.png)


### [undefined](providers/deepseek.md)  ![deepseek](https://samestrin.github.io/media/llm-interface/icons/deepseek.png)


### [undefined](providers/fireworksai.md) 


### [undefined](providers/forefront.md)  ![forefront](https://samestrin.github.io/media/llm-interface/icons/forefront.png)


### [undefined](providers/friendliai.md) 


### [undefined](providers/gemini.md) 


### [undefined](providers/gooseai.md)  ![gooseai](https://samestrin.github.io/media/llm-interface/icons/gooseai.png)


### [undefined](providers/groq.md) 


### [undefined](providers/huggingface.md) 


### [undefined](providers/hyperbeeai.md) 


### [undefined](providers/lamini.md)  ![lamini](https://samestrin.github.io/media/llm-interface/icons/lamini.png)


### [undefined](providers/llamacpp.md) 


### [undefined](providers/mistralai.md)  ![mistralai](https://samestrin.github.io/media/llm-interface/icons/mistralai.png)


### [undefined](providers/monsterapi.md)  ![monsterapi](https://samestrin.github.io/media/llm-interface/icons/monsterapi.png)


### [undefined](providers/neetsai.md)  ![neetsai](https://samestrin.github.io/media/llm-interface/icons/neetsai.png)


### [undefined](providers/novitaai.md) 


### [undefined](providers/nvidia.md) 


### [undefined](providers/octoai.md) 


### [undefined](providers/ollama.md) 


### [undefined](providers/openai.md) 


### [undefined](providers/perplexity.md)  ![perplexity](https://samestrin.github.io/media/llm-interface/icons/perplexity.png)


### [undefined](providers/rekaai.md)  ![rekaai](https://samestrin.github.io/media/llm-interface/icons/rekaai.png)


### [undefined](providers/replicate.md)  ![replicate](https://samestrin.github.io/media/llm-interface/icons/replicate.png)


### [undefined](providers/shuttleai.md)  ![shuttleai](https://samestrin.github.io/media/llm-interface/icons/shuttleai.png)


### [undefined](providers/thebai.md) 


### [undefined](providers/togetherai.md)  ![togetherai](https://samestrin.github.io/media/llm-interface/icons/togetherai.png)


### [undefined](providers/watsonxai.md) 


### [undefined](providers/writer.md)  ![writer](https://samestrin.github.io/media/llm-interface/icons/writer.png)


### [undefined](providers/zhipuai.md) 


