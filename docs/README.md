# LLM Interface Documentation<!-- omit from toc -->

Welcome to the documentation for the LLM Interface package. This documentation provides comprehensive guides on how to set up, configure, and use the LLM Interface with various Language Model providers.

## Table of Contents<!-- omit from toc -->

- [Introduction](#introduction)
- [Installation](#installation)
- [API Keys](#api-keys)
- [Usage](#usage)
  - [LLMInterface](#llminterface)
    - [getAllModelNames()](#getallmodelnames)
    - [getEmbeddingsModelAlias(interfaceName, alias)](#getembeddingsmodelaliasinterfacename-alias)
    - [getInterfaceConfigValue(interfaceName, key)](#getinterfaceconfigvalueinterfacename-key)
    - [getModelAlias(interfaceName, alias)](#getmodelaliasinterfacename-alias)
    - [setApiKey(interfaceNames, apiKey)](#setapikeyinterfacenames-apikey)
    - [setEmbeddingsModelAlias(interfaceName, alias, name)](#setembeddingsmodelaliasinterfacename-alias-name)
    - [setModelAlias(interfaceName, alias, name)](#setmodelaliasinterfacename-alias-name)
    - [configureCache(cacheConfig = {})](#configurecachecacheconfig--)
    - [flushCache()](#flushcache)
    - [sendMessage(interfaceName, message, options = {}, interfaceOptions = {})](#sendmessageinterfacename-message-options---interfaceoptions--)
    - [streamMessage(interfaceName, message, options = {})](#streammessageinterfacename-message-options--)
    - [embeddings(interfaceName, embeddingString, options = {}, interfaceOptions = {})](#embeddingsinterfacename-embeddingstring-options---interfaceoptions--)
    - [chat.completions.create(interfaceName, message, options = {}, interfaceOptions = {})](#chatcompletionscreateinterfacename-message-options---interfaceoptions--)
  - [LLMInterfaceSendMessage](#llminterfacesendmessage)
    - [LLMInterfaceSendMessage(interfaceName, apiKey, message, options = {}, interfaceOptions = {})](#llminterfacesendmessageinterfacename-apikey-message-options---interfaceoptions--)
  - [LLMInterfaceStreamMessage](#llminterfacestreammessage)
    - [LLMInterfaceStreamMessage(interfaceName, apiKey, message, options = {})](#llminterfacestreammessageinterfacename-apikey-message-options--)
  - [Message Object](#message-object)
    - [Structure of a Message Object](#structure-of-a-message-object)
  - [Options Object](#options-object)
    - [Structure of an Options Object](#structure-of-an-options-object)
  - [Interface Options Object](#interface-options-object)
    - [Structure of an Interface Options Object](#structure-of-an-interface-options-object)
  - [Caching](#caching)
    - [Simple Cache](#simple-cache)
    - [Flat Cache](#flat-cache)
    - [Cache Manager](#cache-manager)
    - [Memory Cache](#memory-cache)
- [Supported Providers](#supported-providers)
- [Model Aliases](#model-aliases)
- [Jailbreaking](#jailbreaking)
- [Glossary](#glossary)
- [Examples](#examples)

## Introduction

The LLM Interface npm module provides a unified interface for interacting with various large language models (LLMs). This documentation covers setup, configuration, usage, and examples to help you integrate LLMs into your projects efficiently.

## Installation

## API Keys

To interact with different LLM providers, you will need API keys. Refer to [API Keys](api-keys.md) for detailed instructions on obtaining and configuring API keys for supported providers.

## Usage

The [Usage](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md) section contains detailed documentation on how to use the LLM Interface npm module. This includes:

### [LLMInterface](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#llminterface)

#### [getAllModelNames()](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#getallmodelnames)

#### [getEmbeddingsModelAlias(interfaceName, alias)](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#getembeddingsmodelaliasinterfacename-alias)

#### [getInterfaceConfigValue(interfaceName, key)](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#getinterfaceconfigvalueinterfacename-key)

#### [getModelAlias(interfaceName, alias)](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#getmodelaliasinterfacename-alias)

#### [setApiKey(interfaceNames, apiKey)](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#setapikeyinterfacenames-apikey)

#### [setEmbeddingsModelAlias(interfaceName, alias, name)](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#setembeddingsmodelaliasinterfacename-alias-name)

#### [setModelAlias(interfaceName, alias, name)](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#setmodelaliasinterfacename-alias-name)

#### [configureCache(cacheConfig = {})](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#configurecachecacheconfig--)

#### [flushCache()](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#flushcache)

#### [sendMessage(interfaceName, message, options = {}, interfaceOptions = {})](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#sendmessageinterfacename-message-options--interfaceoptions--)

#### [streamMessage(interfaceName, message, options = {})](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#streammessageinterfacename-message-options--)

#### [embeddings(interfaceName, embeddingString, options = {}, interfaceOptions = {})](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#embeddingsinterfacename-embeddingstring-options--interfaceoptions--)

#### [chat.completions.create(interfaceName, message, options = {}, interfaceOptions = {})](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#chatcompletionscreateinterfacename-message-options--interfaceoptions--)

### LLMInterfaceSendMessage

#### [LLMInterfaceSendMessage(interfaceName, apiKey, message, options = {}, interfaceOptions = {})](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#llminterfacesendmessageinterfacename-apikey-message-options--interfaceoptions--)

_This is a legacy function and will be depreciated._

### LLMInterfaceStreamMessage

#### [LLMInterfaceStreamMessage(interfaceName, apiKey, message, options = {})](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#llminterfacestreammessageinterfacename-apikey-message-options--)

_This is a legacy function and will be depreciated._

### Message Object

#### [Structure of a Message Object](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#structure-of-a-message-object)

### Options Object

#### [Structure of an Options Object](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#structure-of-an-options-object)

### Interface Options Object

#### [Structure of an Interface Options Object](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#structure-of-an-interface-options-object)

### Caching

#### [Simple Cache](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#simple-cache)

- [Example Usage](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#example-usage-1)

#### [Flat Cache](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#flat-cache)

- [Installation](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#installation-1)
- [Example Usage](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#example-usage-2)

#### [Cache Manager](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#cache-manager)

- [Installation](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#installation-2)
- [Example Usage](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#example-usage-3)
- [Advanced Backends](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#advanced-backends)
  - [Redis](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#redis)
  - [Memcached](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#memcached)
  - [MongoDB](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#mongodb)

#### [Memory Cache](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#memory-cache)

- [Example Usage](https://www.github.com/samestrin/llm-interface/blob/docs/docs/usage.md#example-usage-4)

## Supported Providers

A complete list of [supported providers](support.md) is available [here](providers.md).

## Model Aliases

The LLMInterface supports multiple model aliases for different providers. See [Models](models.md) for a list of model aliases and their descriptions.

For more detailed information, please refer to the respective sections in the documentation.

## Jailbreaking

If you'd like to attempt to [jailbreak](jailbreaking.md#jailbreaking) your AI model, you can try a version of the message object found [here](jailbreaking.md#jailbreaking).

_Thanks to Shuttle AI for the original concept!_

## Glossary

A [glossary](glossary.md) of terms is available [here](glossary.md).

## Examples

Check out [Examples](examples.md) for practical demonstrations of how to use the LLM Interface npm module in various scenarios.
