# LLM Interface Documentation

Welcome to the documentation for the LLM Interface package. This documentation provides comprehensive guides on how to set up, configure, and use the LLM Interface with various Language Model providers.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [API Keys](#api-keys)
- [Usage](#usage)
  - [LLMInterface](#llminterface)
    - [getAllModelNames()](#getallmodelnames)
    - [getEmbeddingsModelAlias(interfaceName, alias)](#getembeddingsmodelaliasinterfacename-alias)
    - [getInterfaceConfigValue(interfaceName, key)](#getInterfaceConfigValueinterfacename-key)
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
      - [Example Usage](#example-usage-1)
    - [Flat Cache](#flat-cache)
      - [Installation](#installation-1)
      - [Example Usage](#example-usage-2)
    - [Cache Manager](#cache-manager)
      - [Installation](#installation-2)
      - [Example Usage](#example-usage-3)
      - [Advanced Backends](#advanced-backends)
        - [Redis](#redis)
        - [Memcached](#memcached)
        - [MongoDB](#mongodb)
    - [Memory Cache](#memory-cache)
      - [Example Usage](#example-usage-4)
  - [Support](#support)
  - [Model Aliases](#model-aliases)
  - [Embeddings Model Aliases](#embedding-model-aliases)
  - [Jailbreaking](#jailbreaking)
  - [Glossary](#glossary)
  - [Examples](#examples)

## Introduction

The LLM Interface npm module provides a unified interface for interacting with various large language models (LLMs). This documentation covers setup, configuration, usage, and examples to help you integrate LLMs into your projects efficiently.

## Installation

## API Keys

To interact with different LLM providers, you will need API keys. Refer to [API Keys](api-keys.md) for detailed instructions on obtaining and configuring API keys for supported providers.

## Usage

The [Usage](usage.md) section contains detailed documentation on how to use the LLM Interface npm module. This includes:

### LLMInterface

- [getAllModelNames()](usage.md#getallmodelnames)
- [getEmbeddingsModelAlias(interfaceName, alias)](usage.md#getembeddingsmodelaliasinterfacename-alias)
- [getInterfaceConfigValue(interfaceName, key)](usage.md#getInterfaceConfigValueinterfacename-key)
- [getModelAlias(interfaceName, alias)](usage.md#getmodelaliasinterfacename-alias)
- [setApiKey(interfaceNames, apiKey)](usage.md#setapikeyinterfacenames-apikey)
- [setEmbeddingsModelAlias(interfaceName, alias, name)](usage.md#setembeddingsmodelaliasinterfacename-alias-name)
- [setModelAlias(interfaceName, alias, name)](usage.md#setmodelaliasinterfacename-alias-name)
- [configureCache(cacheConfig = {})](usage.md#configurecachecacheconfig--)
- [flushCache()](usage.md#flushcache)
- [sendMessage(interfaceName, message, options = {}, interfaceOptions = {})](usage.md#sendmessageinterfacename-message-options---interfaceoptions--)
- [streamMessage(interfaceName, message, options = {})](usage.md#streammessageinterfacename-message-options--)
- [embeddings(interfaceName, embeddingString, options = {}, interfaceOptions = {})](usage.md#embeddingsinterfacename-embeddingstring-options---interfaceoptions--)
- [chat.completions.create(interfaceName, message, options = {}, interfaceOptions = {})](usage.md#chatcompletionscreateinterfacename-message-options---interfaceoptions--)

### LLMInterfaceSendMessage

- [LLMInterfaceSendMessage(interfaceName, apiKey, message, options = {}, interfaceOptions = {})](usage.md#llminterfacesendmessageinterfacename-apikey-message-options---interfaceoptions--)

_This is a legacy function and will be depreciated._

### LLMInterfaceStreamMessage

- [LLMInterfaceStreamMessage(interfaceName, apiKey, message, options = {})](usage.md#llminterfacestreammessageinterfacename-apikey-message-options--)

_This is a legacy function and will be depreciated._

### Message Object

- [Structure of a Message Object](usage.md#structure-of-a-message-object)

### Options Object

- [Structure of an Options Object](usage.md#structure-of-an-options-object)

### Interface Options Object

- [Structure of an Interface Options Object](usage.md#structure-of-an-interface-options-object)

### Caching

- [Simple Cache](usage.md#simple-cache)
  - [Example Usage](usage.md#example-usage-1)
- [Flat Cache](usage.md#flat-cache)
  - [Installation](usage.md#installation-1)
  - [Example Usage](usage.md#example-usage-2)
- [Cache Manager](usage.md#cache-manager)
  - [Installation](usage.md#installation-2)
  - [Example Usage](usage.md#example-usage-3)
  - [Advanced Backends](usage.md#advanced-backends)
    - [Redis](usage.md#redis)
    - [Memcached](usage.md#memcached)
    - [MongoDB](usage.md#mongodb)
- [Memory Cache](usage.md#memory-cache)
  - [Example Usage](usage.md#example-usage-4)

## Support

A complete list of [supported providers](support.md) is availabe [here](support.md).

## Model Aliases

The LLMInterface supports multiple model aliases for different providers. See [Models](models.md) for a list of model aliases and their descriptions.

For more detailed information, please refer to the respective sections in the documentation.

## Jailbreaking

If you'd like to attempt to [jailbreak](jailbreaking.md#jailbreaking) your AI model you try a version of the message obeject found [here](jailbreaking.md#jailbreaking).

_Thanks to Shuttle AI for the original concept!_

## Glossary

A [glossary](glossary.md) of terms is available [here](glossary.md).

## Examples

Check out [Examples](examples.md) for practical demonstrations of how to use the LLM Interface npm module in various scenarios.
