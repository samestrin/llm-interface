/**
 * Base class for custom errors.
 * @class
 * @param {string} name - The name of the error.
 * @param {string} message - The error message.
 * @param {string} [originalMessage] - The original error message.
 * @param {string} [stack] - The error stack trace.
 */

/**
 * Custom error class extending Error.
 */
class CustomError extends Error {
  /**
   * Creates an instance of CustomError.
   */
  constructor(name, message, originalMessage, stack) {
    super(message || 'An error occurred');
    this.name = name;
    if (originalMessage) {
      this.originalMessage = originalMessage;
    }
    if (stack) {
      this.stack = stack;
    }
  }
}

/**
 * Custom error class for cache-related errors.
 * @class
 * @extends CustomError
 * @param {string} [message] - The error message.
 * @param {string} [originalMessage] - The original error message.
 * @param {string} [stack] - The error stack trace.
 */
class CacheError extends CustomError {
  constructor(message, originalMessage, stack) {
    super(
      'CacheError',
      message || 'A cache error occurred',
      originalMessage,
      stack,
    );
  }
}

/**
 * Custom error class for provider-related errors.
 * @class
 * @extends CustomError
 * @param {string} [message] - The error message.
 * @param {string} [originalMessage] - The original error message.
 * @param {string} [stack] - The error stack trace.
 */
class ProviderError extends CustomError {
  constructor(message, originalMessage, stack) {
    super(
      'ProviderError',
      message || 'A provider error occurred',
      originalMessage,
      stack,
    );
  }
}

/**
 * Custom error class for request-related errors.
 * @class
 * @extends CustomError
 * @param {string} [message] - The error message.
 * @param {string} [originalMessage] - The original error message.
 * @param {string} [stack] - The error stack trace.
 */
class RequestError extends CustomError {
  constructor(message, originalMessage, stack) {
    super(
      'RequestError',
      message || 'A request error occurred',
      originalMessage,
      stack,
    );
  }
}

/**
 * Custom error class for initialization-related errors.
 * @class
 * @extends CustomError
 * @param {string} [message] - The error message.
 * @param {string} [originalMessage] - The original error message.
 * @param {string} [stack] - The error stack trace.
 */
class InitError extends CustomError {
  constructor(message, originalMessage, stack) {
    super(
      'InitError',
      message || 'An initialization error occurred',
      originalMessage,
      stack,
    );
  }
}

/**
 * Custom error class for send message errors.
 * @class
 * @extends CustomError
 * @param {string} [message] - The error message.
 * @param {string} [originalMessage] - The original error message.
 * @param {string} [stack] - The error stack trace.
 */
class SendMessageError extends CustomError {
  constructor(message, originalMessage, stack) {
    super(
      'SendMessageError',
      message || 'A send message error occurred',
      originalMessage,
      stack,
    );
  }
}

/**
 * Custom error class for embeddings-related errors.
 * @class
 * @extends CustomError
 * @param {string} [message] - The error message.
 * @param {string} [originalMessage] - The original error message.
 * @param {string} [stack] - The error stack trace.
 */
class EmbeddingsError extends CustomError {
  constructor(message, originalMessage, stack) {
    super(
      'EmbeddingsError',
      message || 'An embeddings error occurred',
      originalMessage,
      stack,
    );
  }
}

/**
 * Custom error class for stream-related errors.
 * @class
 * @extends CustomError
 * @param {string} [message] - The error message.
 * @param {string} [originalMessage] - The original error message.
 * @param {string} [stack] - The error stack trace.
 */
class StreamError extends CustomError {
  constructor(message, originalMessage, stack) {
    super(
      'StreamError',
      message || 'A stream error occurred',
      originalMessage,
      stack,
    );
  }
}

/**
 * Custom error class for prediction-related errors.
 * @class
 * @extends CustomError
 * @param {string} [message] - The error message.
 * @param {string} [originalMessage] - The original error message.
 * @param {string} [stack] - The error stack trace.
 */
class GetPredictionError extends CustomError {
  constructor(message, originalMessage, stack) {
    super(
      'GetPredictionError',
      message || 'A prediction error occurred',
      originalMessage,
      stack,
    );
  }
}

/**
 * Custom error class for cache-related errors.
 * @class
 * @extends CustomError
 * @param {string} [message] - The error message.
 * @param {string} [originalMessage] - The original error message.
 * @param {string} [stack] - The error stack trace.
 */
class LLMInterfaceError extends CustomError {
  constructor(message, originalMessage, stack) {
    super(
      'LLMInterfaceError',
      message || 'An LLM interface error occurred',
      originalMessage,
      stack,
    );
  }
}

module.exports = {
  CacheError,
  RequestError,
  InitError,
  SendMessageError,
  StreamError,
  EmbeddingsError,
  GetPredictionError,
  LLMInterfaceError,
  ProviderError,
};
