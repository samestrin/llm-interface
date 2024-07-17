/**
 * CacheManager class for managing different caching strategies.
 * @class CacheManager
 * @param {object} options - Configuration options for the cache manager.
 * @param {string} options.cacheType - Type of cache to use (e.g., 'flat-cache', 'cache-manager', 'simple-cache').
 * @param {object} options.cacheOptions - Additional options for the cache.
 * @param {string} [options.cacheDir] - Directory for storing cache files.
 */

const { CacheError } = require('./errors.js');
const fs = require('fs');
const log = require('loglevel');

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
   * @param {boolean} shouldHash - Should the key be hashed.
   * @returns {string} - The hashed file path.
   */
  getCacheFilePath(key, shouldHash = false) {
    if (!shouldHash) {
      return key;
    } else {
      if (!this.crypto) this.crypto = require('crypto');
      return this.crypto.createHash('md5').update(key).digest('hex');
    }
  }

  /**
   * Loads the appropriate cache instance based on the cache type.
   * @returns {Promise<object>} - The cache instance.
   * @throws {CacheError} - Throws an error if the cache type is unsupported.
   */
  async loadCacheInstance() {
    // Load libraries conditionally
    if (!this.path) this.path = require('path');

    // Set cacheDir
    let cacheDir;
    if (this.cacheDir) {
      cacheDir = this.cacheDir;
    } else {
      cacheDir = this.path.resolve(__dirname, '../..', 'cache');
    }

    if (!this.cacheInstance || this.cacheInstance === null) {
      if (this.cacheType === 'flat-cache') {
        const flatCache = require('flat-cache');
        const cacheId = 'LLMInterface-cache';
        this.cacheInstance = flatCache.load(cacheId, cacheDir);
      } else if (this.cacheType === 'cache-manager') {
        const cacheManager = require('cache-manager');

        this.cacheInstance = await cacheManager.caching(this.cacheOptions);
      } else if (this.cacheType === 'simple-cache') {
        const SimpleCache = require('./simpleCache.js');
        this.cacheInstance = new SimpleCache({
          cacheDir,
          ...this.cacheOptions,
        });
      } else if (this.cacheType === 'memory-cache') {
        const MemoryCache = require('./memoryCache.js'); // Import the MemoryCache singleton
        this.cacheInstance = MemoryCache;
      } else {
        throw new CacheError('Unsupported cache type');
      }
    }
  }

  /**
   * Retrieves data from the cache.
   * @param {string} key - The cache key.
   * @returns {Promise<any>} - The cached data or null if not found or expired.
   */
  async getFromCache(key) {
    const hashedKey = this.getCacheFilePath(key);
    try {
      if (this.cacheType === 'flat-cache') {
        const cachedData = this.cacheInstance.getKey(hashedKey);
        if (cachedData && cachedData.ttl && Date.now() > cachedData.ttl) {
          this.cacheInstance.removeKey(hashedKey);
          this.cacheInstance.save(true);
          return null;
        }
        return cachedData ? cachedData.data : null;
      } else if (this.cacheType === 'cache-manager') {
        if (
          typeof this.cacheInstance?.store?.get !== 'function' &&
          typeof this.cacheInstance?.get !== 'function'
        ) {
          await this.loadCacheInstance();
        }

        if (typeof this.cacheInstance?.store?.get === 'function') {
          return await this.cacheInstance.store.get(hashedKey);
        } else if (typeof this.cacheInstance?.get === 'function') {
          return await this.cacheInstance.get(hashedKey);
        } else {
          throw new CacheError('Cache manage not available');
        }
      } else if (this.cacheType === 'simple-cache') {
        return await this.cacheInstance.getFromCache(hashedKey);
      } else if (this.cacheType === 'memory-cache') {
        return this.cacheInstance.get(hashedKey);
      }
    } catch (error) {
      console.error(error);
      return null;
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
    const hashedKey = this.getCacheFilePath(key);
    try {
      if (this.cacheType === 'flat-cache') {
        const cacheData = { data };
        if (ttl) {
          cacheData.ttl = Date.now() + ttl * 1000; // Convert TTL to milliseconds
        }
        this.cacheInstance.setKey(hashedKey, cacheData);
        this.cacheInstance.save(true);
      } else if (this.cacheType === 'cache-manager') {
        if (
          typeof this.cacheInstance?.store?.get !== 'function' &&
          typeof this.cacheInstance?.get !== 'function'
        ) {
          await this.loadCacheInstance();
        }

        if (typeof this.cacheInstance?.store?.set === 'function') {
          await this.cacheInstance.store.set(hashedKey, data, { ttl });
        } else if (typeof this.cacheInstance?.set === 'function') {
          await this.cacheInstance.store.set(hashedKey, data, { ttl });
        } else {
          throw new CacheError('Cache manager not available');
        }
      } else if (this.cacheType === 'simple-cache') {
        await this.cacheInstance.saveToCache(hashedKey, data, ttl);
      } else if (this.cacheType === 'memory-cache') {
        this.cacheInstance.set(hashedKey, data);
      }
    } catch (error) {
      log.error(error);
    }
  }

  /**
   * Flushes the entire cache or a specific cache key.
   * @param {string} [key] - The cache key to flush. If not provided, flushes the entire cache.
   */
  async flushCache(key = false) {
    if (key) {
      const hashedKey = this.getCacheFilePath(key);
      try {
        if (this.cacheType === 'flat-cache') {
          this.cacheInstance.removeKey(hashedKey);
          this.cacheInstance.save(true);
        } else if (this.cacheType === 'cache-manager') {
          await this.cacheInstance.del(hashedKey);
        } else if (this.cacheType === 'simple-cache') {
          await this.cacheInstance.deleteFromCache(hashedKey);
        } else if (this.cacheType === 'memory-cache') {
          return this.cacheInstance.delete(hashedKey);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        if (this.cacheType === 'flat-cache') {
          try {
            fs.unlinkSync(this.cacheInstance['_pathToFile']);
          } catch (err) {
            log.error('Error deleting file:', err);
          }
        } else if (this.cacheType === 'cache-manager') {
          await this.cacheInstance.reset();
        } else if (this.cacheType === 'simple-cache') {
          await this.cacheInstance.clearCache();
        } else if (this.cacheType === 'memory-cache') {
          this.cacheInstance.clear();
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
}
module.exports = { CacheManager };
