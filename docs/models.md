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


### [AI21 Studio](providers/ai21.md)  &nbsp;![ai21](https://samestrin.github.io/media/llm-interface/icons/ai21.png)

- `default`: jamba-instruct
- `large`: jamba-instruct
- `small`: jamba-instruct
- `agent`: jamba-instruct


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [AiLAYER](providers/ailayer.md) 

- `default`: Llama-2-70b
- `large`: Qwen/Qwen1.5-72B-Chat
- `small`: alpaca-7b
- `agent`: Llama-2-70b


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [AIMLAPI](providers/aimlapi.md)  &nbsp;![aimlapi](https://samestrin.github.io/media/llm-interface/icons/aimlapi.png)

- `default`: gpt-3.5-turbo-16k
- `large`: Qwen/Qwen1.5-72B-Chat
- `small`: Qwen/Qwen1.5-0.5B-Chat
- `agent`: gpt-4-32k-0613


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Anyscale](providers/anyscale.md)  &nbsp;![anyscale](https://samestrin.github.io/media/llm-interface/icons/anyscale.png)

- `default`: mistralai/Mixtral-8x22B-Instruct-v0.1
- `large`: meta-llama/Llama-3-70b-chat-hf
- `small`: mistralai/Mistral-7B-Instruct-v0.1
- `agent`: mistralai/Mixtral-8x22B-Instruct-v0.1


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Anthropic](providers/anthropic.md)  &nbsp;![anthropic](https://samestrin.github.io/media/llm-interface/icons/anthropic.png)

- `default`: claude-3-sonnet-20240229
- `large`: claude-3-opus-20240229
- `small`: claude-3-haiku-20240307
- `agent`: claude-3-sonnet-20240229


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Cloudflare AI](providers/cloudflareai.md)  &nbsp;![cloudflareai](https://samestrin.github.io/media/llm-interface/icons/cloudflareai.png)

- `default`: @cf/meta/llama-3-8b-instruct
- `large`: @hf/thebloke/llama-2-13b-chat-awq
- `small`: @cf/tinyllama/tinyllama-1.1b-chat-v1.0
- `agent`: @cf/meta/llama-3-8b-instruct


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Cohere](providers/cohere.md)  &nbsp;![cohere](https://samestrin.github.io/media/llm-interface/icons/cohere.png)

- `default`: command-r
- `large`: command-r-plus
- `small`: command-light
- `agent`: command-r-plus


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Corcel](providers/corcel.md)  &nbsp;![corcel](https://samestrin.github.io/media/llm-interface/icons/corcel.png)

- `default`: gpt-4-turbo-2024-04-09
- `large`: gpt-4o
- `small`: cortext-lite
- `agent`: gemini-pro


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [DeepInfra](providers/deepinfra.md)  &nbsp;![deepinfra](https://samestrin.github.io/media/llm-interface/icons/deepinfra.png)

- `default`: openchat/openchat-3.6-8b
- `large`: nvidia/Nemotron-4-340B-Instruct
- `small`: microsoft/WizardLM-2-7B
- `agent`: Qwen/Qwen2-7B-Instruct


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [DeepSeek](providers/deepseek.md)  &nbsp;![deepseek](https://samestrin.github.io/media/llm-interface/icons/deepseek.png)

- `default`: deepseek-chat
- `large`: deepseek-chat
- `small`: deepseek-chat
- `agent`: deepseek-chat


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Fireworks AI](providers/fireworksai.md) 

- `default`: accounts/fireworks/models/llama-v3-8b-instruct
- `large`: accounts/fireworks/models/llama-v3-70b-instruct
- `small`: accounts/fireworks/models/phi-3-mini-128k-instruct
- `agent`: accounts/fireworks/models/llama-v3-8b-instruct


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Forefront AI](providers/forefront.md)  &nbsp;![forefront](https://samestrin.github.io/media/llm-interface/icons/forefront.png)

- `default`: forefront/Mistral-7B-Instruct-v0.2-chatml
- `large`: forefront/Mistral-7B-Instruct-v0.2-chatml
- `small`: forefront/Mistral-7B-Instruct-v0.2-chatml
- `agent`: 


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [FriendliAI](providers/friendliai.md) 

- `default`: mixtral-8x7b-instruct-v0-1
- `large`: meta-llama-3-70b-instruct
- `small`: meta-llama-3-8b-instruct
- `agent`: gemma-7b-it


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Google Gemini](providers/gemini.md) 

- `default`: gemini-1.5-flash
- `large`: gemini-1.5-pro
- `small`: gemini-1.5-flash
- `agent`: gemini-1.5-pro


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [GooseAI](providers/gooseai.md)  &nbsp;![gooseai](https://samestrin.github.io/media/llm-interface/icons/gooseai.png)

- `default`: gpt-neo-20b
- `large`: gpt-neo-20b
- `small`: gpt-neo-125m
- `agent`: gpt-j-6b


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Groq](providers/groq.md) 

- `default`: llama3-8b-8192
- `large`: llama3-70b-8192
- `small`: gemma-7b-it
- `agent`: llama3-8b-8192


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Hugging Face Inference](providers/huggingface.md) 

- `default`: meta-llama/Meta-Llama-3-8B-Instruct
- `large`: meta-llama/Meta-Llama-3-8B-Instruct
- `small`: microsoft/Phi-3-mini-4k-instruct
- `agent`: meta-llama/Meta-Llama-3-8B-Instruct


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [HyperBee AI](providers/hyperbeeai.md) 

- `default`: hive
- `large`: gpt-4o
- `small`: gemini-1.5-flash
- `agent`: gpt-4o


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Lamini](providers/lamini.md)  &nbsp;![lamini](https://samestrin.github.io/media/llm-interface/icons/lamini.png)

- `default`: meta-llama/Meta-Llama-3-8B-Instruct
- `large`: meta-llama/Meta-Llama-3-8B-Instruct
- `small`: microsoft/phi-2
- `agent`: meta-llama/Meta-Llama-3-8B-Instruct


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [LLaMA.CPP](providers/llamacpp.md) 

- `default`: gpt-3.5-turbo
- `large`: gpt-3.5-turbo
- `small`: gpt-3.5-turbo
- `agent`: openhermes


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Mistral AI](providers/mistralai.md)  &nbsp;![mistralai](https://samestrin.github.io/media/llm-interface/icons/mistralai.png)

- `default`: mistral-large-latest
- `large`: mistral-large-latest
- `small`: mistral-small-latest
- `agent`: mistral-large-latest


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Monster API](providers/monsterapi.md)  &nbsp;![monsterapi](https://samestrin.github.io/media/llm-interface/icons/monsterapi.png)

- `default`: meta-llama/Meta-Llama-3-8B-Instruct
- `large`: google/gemma-2-9b-it
- `small`: microsoft/Phi-3-mini-4k-instruct
- `agent`: google/gemma-2-9b-it


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Neets.ai](providers/neetsai.md)  &nbsp;![neetsai](https://samestrin.github.io/media/llm-interface/icons/neetsai.png)

- `default`: Neets-7B
- `large`: mistralai/Mixtral-8X7B-Instruct-v0.1
- `small`: Neets-7B
- `agent`: 


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Novita AI](providers/novitaai.md) 

- `default`: meta-llama/llama-3-8b-instruct
- `large`: meta-llama/llama-3-70b-instruct
- `small`: meta-llama/llama-3-8b-instruct
- `agent`: meta-llama/llama-3-70b-instruct


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [NVIDIA AI](providers/nvidia.md) 

- `default`: nvidia/llama3-chatqa-1.5-8b
- `large`: nvidia/nemotron-4-340b-instruct
- `small`: microsoft/phi-3-mini-128k-instruct
- `agent`: nvidia/llama3-chatqa-1.5-8b


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [OctoAI](providers/octoai.md) 

- `default`: mistral-7b-instruct
- `large`: mixtral-8x22b-instruct
- `small`: mistral-7b-instruct
- `agent`: mixtral-8x22b-instruct


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Ollama](providers/ollama.md) 

- `default`: llama3
- `large`: llama3
- `small`: llama3
- `agent`: 


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [OpenAI](providers/openai.md) 

- `default`: gpt-3.5-turbo
- `large`: gpt-4o
- `small`: gpt-3.5-turbo
- `agent`: gpt-4o


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Perplexity AI](providers/perplexity.md)  &nbsp;![perplexity](https://samestrin.github.io/media/llm-interface/icons/perplexity.png)

- `default`: llama-3-sonar-large-32k-online
- `large`: llama-3-sonar-large-32k-online
- `small`: llama-3-sonar-small-32k-online
- `agent`: llama-3-sonar-large-32k-online


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Reka AI](providers/rekaai.md)  &nbsp;![rekaai](https://samestrin.github.io/media/llm-interface/icons/rekaai.png)

- `default`: reka-core
- `large`: reka-core
- `small`: reka-edge
- `agent`: reka-core


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Replicate](providers/replicate.md)  &nbsp;![replicate](https://samestrin.github.io/media/llm-interface/icons/replicate.png)

- `default`: mistralai/mistral-7b-instruct-v0.2
- `large`: meta/meta-llama-3-70b-instruct
- `small`: mistralai/mistral-7b-instruct-v0.2
- `agent`: meta/meta-llama-3-70b-instruct


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Shuttle AI](providers/shuttleai.md)  &nbsp;![shuttleai](https://samestrin.github.io/media/llm-interface/icons/shuttleai.png)

- `default`: shuttle-2-turbo
- `large`: shuttle-2-turbo
- `small`: shuttle-2-turbo
- `agent`: shuttle-2-turbo


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [TheB.ai](providers/thebai.md) 

- `default`: gpt-4-turbo
- `large`: llama-3-70b-chat
- `small`: llama-2-7b-chat
- `agent`: gpt-4-turbo


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Together AI](providers/togetherai.md)  &nbsp;![togetherai](https://samestrin.github.io/media/llm-interface/icons/togetherai.png)

- `default`: google/gemma-7b
- `large`: mistralai/Mixtral-8x22B
- `small`: google/gemma-2b
- `agent`: Qwen/Qwen1.5-14B


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Watsonx AI](providers/watsonxai.md) 

- `default`: ibm/granite-13b-chat-v2
- `large`: meta-llama/llama-3-70b-instruct
- `small`: google/flan-t5-xxl
- `agent`: meta-llama/llama-3-70b-instruct


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Writer](providers/writer.md)  &nbsp;![writer](https://samestrin.github.io/media/llm-interface/icons/writer.png)

- `default`: palmyra-x-002-32k
- `large`: palmyra-x-002-32k
- `small`: palmyra-x-002-32k
- `agent`: 


![](https://samestrin.github.io/media/llm-interface/icons/blank.png)
### [Zhipu AI](providers/zhipuai.md) 

- `default`: glm-4-airx
- `large`: glm-4
- `small`: glm-4-flash
- `agent`: glm-4

