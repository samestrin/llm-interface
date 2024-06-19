/**
 * @file test/utils/jestSerializer.js
 * @description Utility functions for Jest serialization.
 */

/**
 * Safely stringifies an object, handling circular references.
 *
 * @param {any} obj - The object to stringify.
 * @param {number} [space=2] - The number of spaces to indent.
 * @returns {string} The stringified object.
 */
function safeStringify(obj, space = 2) {
  const cache = new Set();
  const jsonString = JSON.stringify(
    obj,
    (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.has(value)) {
          return '[Circular]';
        }
        cache.add(value);
      }
      return value;
    },
    space,
  );
  cache.clear();
  return jsonString;
}

module.exports = {
  safeStringify,
};
