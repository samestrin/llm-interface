/**
 * @file utils/cache.js
 * @description Wrapper for flat-cache.
 */

const flatCache = require('flat-cache');
const path = require('path');
const crypto = require('crypto');

// Name of the cache file
const cacheId = 'llm-interface-cache';
const cacheDir = path.resolve(__dirname, '..', 'cache');

// Load the cache
const cache = flatCache.load(cacheId, cacheDir);

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
 * Retrieves data from the cache.
 *
 * @param {string} key - The cache key.
 * @returns {any} The cached data or null if not found.
 */
function getFromCache(key) {
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
  const hashedKey = getCacheFilePath(key);
  cache.setKey(hashedKey, data);
  cache.save(true); // Save to disk
}

module.exports = {
  getFromCache,
  saveToCache,
};
