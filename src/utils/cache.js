/**
 * @file src/utils/cache.js
 * @description Cache related functions.
 */

const { CacheManager } = require('./cacheManager.js');
const { CacheError } = require('./errors.js');
const log = require('loglevel');

/**
 * The main cacheInstance object
 */
const cacheInstance = {};

/**
 * Flushes the entire cache.
 *
 * @throws {CacheError} If 'this' is not defined or if the cache manager instance is not set up.
 * @returns {Promise<void>} Resolves when the cache has been successfully flushed.
 */
async function flushCache() {
  if (!this) {
    throw new CacheError(`'this' is not defined`);
  } else if (!this.cacheManagerInstance) {
    throw new CacheError(
      `Cache not setup. Run LLMInterface.configureCache() first.`,
    );
  } else {
    await this.cacheManagerInstance.flushCache();
  }
}

/**
 * Configures and returns a cache instance based on the provided configuration.
 *
 * @param {Object} [cacheConfig={}] - The configuration object for the cache.
 * @param {string} [cacheConfig.cache] - The type of cache to use (default is 'simple-cache').
 * @param {Object} [cacheConfig.config] - Additional options for configuring the cache.
 * @param {string} [cacheConfig.path] - The path for the cache directory.
 * @returns {CacheManager} - The configured cache instance.
 */
function configureCache(cacheConfig = {}) {
  const cacheType = cacheConfig.cache || 'simple-cache';
  if (cacheInstance[cacheType]) {
    return cacheInstance[cacheType];
  }
  // Instantiate CacheManager with appropriate configuration
  if (cacheConfig.cache) {
    cacheInstance[cacheType] = new CacheManager({
      cacheType,
      cacheOptions: cacheConfig.config,
    });
  } else if (cacheConfig.path) {
    cacheInstance[cacheType] = new CacheManager({
      cacheType,
      cacheDir: cacheConfig.path,
    });
  } else {
    cacheInstance[cacheType] = new CacheManager({
      cacheType,
    });
  }

  cacheInstance[cacheType].loadCacheInstance();
  if (this) this.cacheManagerInstance = cacheInstance[cacheType];

  return cacheInstance[cacheType];
}

module.exports = {
  flushCache,
  configureCache,
};
