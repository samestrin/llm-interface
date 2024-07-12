# LLM Interface Documentation

Welcome to the documentation for the LLM Interface package. This documentation provides comprehensive guides on how to set up, configure, and use the LLM Interface with various Language Model providers.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [API Keys](#api-keys)
- [Usage](#usage)
  - [LLMInterface](#llminterface)
    - [getAllModelNames()](#getallmodelnames)
    - [getInterfaceConfigValue(interfaceName, key)](#getInterfaceConfigValueinterfacename-key)
    - [setApiKey(interfaceNames, apiKey)](#setapikeyinterfacenames-apikey)
    - [setModelAlias(interfaceName, alias, name, tokens = null)](#setmodelaliasinterfacename-alias-name-tokens--null)
    - [configureCache(cacheConfig = {})](#configurecachecacheconfig--)
    - [sendMessage(interfaceName, message, options = {}, interfaceOptions = {})](#sendmessageinterfacename-message-options---interfaceoptions--)
    - [streamMessage(interfaceName, message, options = {})](#streammessageinterfacename-message-options--)
    - [Supported Interface Names](#supported-interface-names)
  - [LLMInterfaceSendMessage](#llminterfacesendmessage)
    - [LLMInterfaceSendMessage(interfaceName, apiKey, message, options = {}, interfaceOptions = {})](#llminterfacesendmessageinterfacename-apikey-message-options---interfaceoptions--)
  - [LLMInterfaceStreamMessage](#llminterfacestreammessage)
    - [LLMInterfaceStreamMessage(interfaceName, apiKey, message, options = {})](#llminterfacestreammessageinterfacename-apikey-message-options--)
  - [Message Object](#message-object)
    - [Structure of a Message Object](#structure-of-a-message-object)
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
  - [Models](#models)
  - [Jailbreaking](#jailbreaking)
  - [Glossary](#glossary)
  - [Examples](#examples)

## Introduction

The LLMInterface npm module provides a unified interface for interacting with various large language models (LLMs). This documentation covers setup, configuration, usage, and examples to help you integrate LLMs into your projects efficiently.

## Installation

## API Keys

To interact with different LLM providers, you will need API keys. Refer to [API Keys](api-key.md) for detailed instructions on obtaining and configuring API keys for supported providers.

## Usage

The [Usage](usage.md) section contains detailed documentation on how to use the LLMInterface npm module. This includes:

### LLMInterface

- [getAllModelNames()](usage.md#getallmodelnames)
- [getInterfaceConfigValue(interfaceName, key)](usage.md#getInterfaceConfigValueinterfacename-key)
- [setApiKey(interfaceNames, apiKey)](usage.md#setapikeyinterfacenames-apikey)
- [setModelAlias(interfaceName, alias, name, tokens = null)](usage.md#setmodelaliasinterfacename-alias-name-tokens--null)
- [configureCache(cacheConfig = {})](usage.md#configurecachecacheconfig--)
- [sendMessage(interfaceName, message, options = {}, interfaceOptions = {})](usage.md#sendmessageinterfacename-message-options---interfaceoptions--)
- [streamMessage(interfaceName, message, options = {})](usage.md#streammessageinterfacename-message-options--)
- [Supported Interface Names](usage.md#supported-interface-names)

### LLMInterfaceSendMessage

- [LLMInterfaceSendMessage(interfaceName, apiKey, message, options = {}, interfaceOptions = {})](usage.md#llminterfacesendmessageinterfacename-apikey-message-options---interfaceoptions--)

### LLMInterfaceStreamMessage

- [LLMInterfaceStreamMessage(interfaceName, apiKey, message, options = {})](usage.md#llminterfacestreammessageinterfacename-apikey-message-options--)

### Message Object

- [Structure of a Message Object](usage.md#structure-of-a-message-object)

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

## Models

The LLMInterface supports multiple model aliases for different providers. See [Models](models.md) for a list of model aliases and their descriptions.

For more detailed information, please refer to the respective sections in the documentation.

## Jailbreaking

If you'd like to attempt to [jailbreak](jailbreaking.md#jailbreaking) your AI model you try a version of the message obeject found [here](jailbreaking.md#jailbreaking).

_Thanks to Shuttle AI for the original concept!_

## Glossary

A [glossary](glossary.md) of terms is available [here](glossary.md).

## Examples

Check out [Examples](examples.md) for practical demonstrations of how to use the LLMInterface npm module in various scenarios.
