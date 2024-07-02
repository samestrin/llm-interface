/**
 * @file src/utils/cacheManager.js
 * @description Cache management class that supports different caching strategies and TTL.
 */

/**
 * CacheManager class for managing different caching strategies.
 */
class CacheManager {
  /**
   * Creates an instance of CacheManager.
   * @param {object} options - Configuration options for the cache manager.
   * @param {string} options.cacheType - Type of cache to use (e.g., 'flat-cache', 'cache-manager', 'simple-cache').
   * @param {object} options.cacheOptions - Additional options for the cache.
   * @param {string} [options.cacheDir] - Directory for storing cache files.
   */
  constructor(options) {
    this.cacheType = options.cacheType || 'simple-cache';
    this.cacheOptions = options.cacheOptions || {};
    this.cacheInstance = null;
    this.cacheDir = options.cacheDir || null;
  }

  /**
   * Generates a hashed file path for the cache key.
   * @param {string} key - The cache key.
   * @returns {string} - The hashed file path.
   */
  getCacheFilePath(key) {
    return this.crypto.createHash('md5').update(key).digest('hex');
  }

  /**
   * Loads the appropriate cache instance based on the cache type.
   * @returns {object} - The cache instance.
   * @throws {Error} - Throws an error if the cache type is unsupported.
   */
  loadCacheInstance() {
    // load libraries
    if (!this.path) this.path = require('path');
    if (!this.crypto) this.crypto = require('crypto');

    // Set cacheDir
    let cacheDir;
    if (this.cacheDir) {
      cacheDir = this.cacheDir;
    } else {
      cacheDir = this.path.resolve(__dirname, '../..', 'cache');
    }

    if (!this.cacheInstance) {
      if (this.cacheType === 'flat-cache') {
        const flatCache = require('flat-cache');
        const cacheId = 'LLMInterface-cache';
        this.cacheInstance = flatCache.load(cacheId, cacheDir);
      } else if (this.cacheType === 'cache-manager') {
        const cacheManager = require('cache-manager');
        this.cacheInstance = cacheManager.caching(this.cacheOptions);
      } else if (this.cacheType === 'simple-cache') {
        const SimpleCache = require('./simpleCache');
        this.cacheInstance = new SimpleCache({
          cacheDir,
          ...this.cacheOptions,
        });
      } else {
        throw new Error('Unsupported cache type');
      }
    }
    return this.cacheInstance;
  }

  /**
   * Retrieves data from the cache.
   * @param {string} key - The cache key.
   * @returns {Promise<any>} - The cached data or null if not found or expired.
   */
  async getFromCache(key) {
    const cache = this.loadCacheInstance();
    const hashedKey = this.getCacheFilePath(key);
    if (this.cacheType === 'flat-cache') {
      const cachedData = cache.getKey(hashedKey);
      if (cachedData && cachedData.ttl && Date.now() > cachedData.ttl) {
        cache.removeKey(hashedKey);
        cache.save(true);
        return null;
      }
      return cachedData ? cachedData.data : null;
    } else if (this.cacheType === 'cache-manager') {
      return await cache.get(hashedKey);
    } else if (this.cacheType === 'simple-cache') {
      return await cache.getFromCache(hashedKey);
    }
  }

  /**
   * Saves data to the cache with an optional TTL.
   * @param {string} key - The cache key.
   * @param {any} data - The data to cache.
   * @param {number} [ttl] - Time-to-live in seconds.
   * @returns {Promise<void>}
   */
  async saveToCache(key, data, ttl) {
    const cache = this.loadCacheInstance();
    const hashedKey = this.getCacheFilePath(key);
    if (this.cacheType === 'flat-cache') {
      const cacheData = { data };
      if (ttl) {
        cacheData.ttl = Date.now() + ttl * 1000; // Convert TTL to milliseconds
      }
      cache.setKey(hashedKey, cacheData);
      cache.save(true);
    } else if (this.cacheType === 'cache-manager') {
      await cache.set(hashedKey, data, { ttl });
    } else if (this.cacheType === 'simple-cache') {
      await cache.saveToCache(hashedKey, data, ttl);
    }
  }
}

module.exports = { CacheManager };
