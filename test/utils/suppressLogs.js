/**
 * @file test/utils/suppressLogs.js
 * @description Utility functions for Jest log suppression.
 */

const log = require('loglevel');

/**
 * Suppresses logging during the execution of a function.
 *
 * @param {Function} fn - The function to execute with suppressed logging.
 * @returns {Function} A new function that, when executed, will suppress logging.
 */
function suppressLogs(fn) {
  return async () => {
    const originalLevel = log.getLevel();
    log.setLevel(log.levels.SILENT);
    try {
      await fn();
    } finally {
      log.setLevel(originalLevel);
    }
  };
}

module.exports = suppressLogs;
