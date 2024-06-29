/**
 * @file test/utils/streamMessageUtil.js
 * @description Utility functions for Jest log suppression.
 */

const { getModelByAlias } = require('./config.js');
const { getConfig } = require('./configManager.js');
const config = getConfig();

async function streamMessageUtil(
  instance,
  message,
  options = {},
  interfaceOptions = {},
) {
  // Create the message object if a string is provided, otherwise use the provided object
  let messageObject =
    typeof message === 'string'
      ? instance.createMessageObject(message)
      : message;

  // Update the message object if needed
  messageObject = instance.updateMessageObject(messageObject);

  // Extract model and messages from the message object
  const { model, messages } = messageObject;
  const selectedModel = getModelByAlias(instance.interfaceName, model);

  // Set default values for max_tokens and response_format
  const { max_tokens = 150, response_format = '' } = options;

  // Construct the request body with model, messages, max_tokens, and additional options
  const requestBody = {
    model:
      selectedModel ||
      options.model ||
      config[instance.interfaceName].model.default.name,
    messages,
    max_tokens,
    ...options,
  };

  // Include response_format in the request body if specified
  if (response_format) {
    requestBody.response_format = { type: response_format };
  }

  // Construct the request URL
  const url = instance.getRequestUrl(
    selectedModel ||
      options.model ||
      config[instance.interfaceName].model.default.name,
  );

  // Return the Axios POST request with response type set to 'stream'
  return instance.client.post(url, requestBody, { responseType: 'stream' });
}

module.exports = { streamMessageUtil };
