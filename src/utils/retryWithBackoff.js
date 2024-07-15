const { SendMessageError, EmbeddingsError } = require('./errors.js');
const { delay } = require('./utils.js');

/**
 * Retries the provided function with exponential backoff and handles specific HTTP errors.
 * @param {Function} fn - The function to retry.
 * @param {object} options - Retry options.
 * @param {number} options.retryAttempts - Number of retry attempts.
 * @param {number} options.retryMultiplier - Multiplier for the retry delay.
 * @param {string} errorType - The type of error to throw ('SendMessageError' or 'EmbeddingsError').
 * @returns {Promise<any>} - The result of the function call.
 * @throws {SendMessageError|EmbeddingsError} - Throws an error if all retry attempts fail.
 */
async function retryWithBackoff(fn, options, errorType) {
  let { retryAttempts = 3, retryMultiplier = 0.3 } = options;
  let currentRetry = 0;

  while (retryAttempts > 0) {
    try {
      return await fn();
    } catch (error) {
      const statusCode = error.response?.status;
      switch (statusCode) {
        case 400:
        case 401:
        case 403:
        case 404:
          if (errorType === 'SendMessageError') {
            throw new SendMessageError(
              `HTTP ${statusCode}: ${error.response?.statusText || 'Error'}`,
              error.response?.data,
              error.stack,
            );
          } else if (errorType === 'EmbeddingsError') {
            throw new EmbeddingsError(
              `HTTP ${statusCode}: ${error.response?.statusText || 'Error'}`,
              error.response?.data,
              error.stack,
            );
          }
          break;

        case 429:
        case 503:
          // Retry after the specified time in the Retry-After header if present
          const retryAfter = error.response?.headers['retry-after'];
          if (retryAfter) {
            await delay(retryAfter * 1000);
          } else {
            const delayTime = (currentRetry + 1) * retryMultiplier * 1000 + 500;
            await delay(delayTime);
          }
          break;

        case 500:
        case 502:
        case 504:
          // Retry with exponential backoff
          const delayTime = (currentRetry + 1) * retryMultiplier * 1000 + 500;
          await delay(delayTime);
          break;

        default:
          if (errorType === 'SendMessageError') {
            throw new SendMessageError(
              `HTTP ${statusCode || 'Unknown'}: ${error.message}`,
              error.response?.data,
              error.stack,
            );
          } else if (errorType === 'EmbeddingsError') {
            throw new EmbeddingsError(
              `HTTP ${statusCode || 'Unknown'}: ${error.message}`,
              error.response?.data,
              error.stack,
            );
          }
          break;
      }
      currentRetry++;
      retryAttempts--;
    }
  }

  if (errorType === 'SendMessageError') {
    throw new SendMessageError('All retry attempts failed');
  } else if (errorType === 'EmbeddingsError') {
    throw new EmbeddingsError('All retry attempts failed');
  }
}

module.exports = { retryWithBackoff };
