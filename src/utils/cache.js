/**
 * @file src/utils/cache.js
 * @description Wrapper for flat-cache; only loads flat-cache when used, stored in a singleton.
 */

const path = require('path');
const crypto = require('crypto');

// Singleton to store the cache instance
let cacheInstance = null;

/**
 * Converts a key to an MD5 hash.
 *
 * @param {string} key - The key to convert.
 * @returns {string} The MD5 hash of the key.
 */
function getCacheFilePath(key) {
  return crypto.createHash('md5').update(key).digest('hex');
}

/**
 * Loads the cache dynamically and stores it in the singleton if not already loaded.
 *
 * @returns {object} The flat-cache instance.
 */
function getCacheInstance() {
  if (!cacheInstance) {
    const flatCache = require('flat-cache');
    const cacheId = 'LLMInterface-cache';
    const cacheDir = path.resolve(__dirname, '../..', 'cache');
    cacheInstance = flatCache.load(cacheId, cacheDir);
  }
  return cacheInstance;
}

/**
 * Retrieves data from the cache.
 *
 * @param {string} key - The cache key.
 * @returns {any} The cached data or null if not found.
 */
function getFromCache(key) {
  const cache = getCacheInstance();
  const hashedKey = getCacheFilePath(key);
  return cache.getKey(hashedKey) || null;
}

/**
 * Saves data to the cache.
 *
 * @param {string} key - The cache key.
 * @param {any} data - The data to cache.
 */
function saveToCache(key, data) {
  const cache = getCacheInstance();
  const hashedKey = getCacheFilePath(key);
  cache.setKey(hashedKey, data);
  cache.save(true); // Save to disk
}

module.exports = {
  getFromCache,
  saveToCache,
};
