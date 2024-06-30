const path = require('path');
const crypto = require('crypto');
const SimpleCache = require('./SimpleCache'); // Assuming SimpleCache is in the same directory

class CacheManager {
  constructor(options) {
    this.cacheType = options.cacheType || 'simple-cache';
    this.cacheOptions = options.cacheOptions || {};
    this.cacheInstance = null;
  }

  getCacheFilePath(key) {
    return crypto.createHash('md5').update(key).digest('hex');
  }

  loadCacheInstance() {
    if (!this.cacheInstance) {
      if (this.cacheType === 'flat-cache') {
        const flatCache = require('flat-cache');
        const cacheId = 'LLMInterface-cache';
        const cacheDir = path.resolve(__dirname, '../..', 'cache');
        this.cacheInstance = flatCache.load(cacheId, cacheDir);
      } else if (this.cacheType === 'cache-manager') {
        const cacheManager = require('cache-manager');
        this.cacheInstance = cacheManager.caching(this.cacheOptions);
      } else if (this.cacheType === 'simple-cache') {
        this.cacheInstance = new SimpleCache(this.cacheOptions);
      } else {
        throw new Error('Unsupported cache type');
      }
    }
    return this.cacheInstance;
  }

  async getFromCache(key) {
    const cache = this.loadCacheInstance();
    const hashedKey = this.getCacheFilePath(key);
    if (this.cacheType === 'flat-cache') {
      return cache.getKey(hashedKey) || null;
    } else if (this.cacheType === 'cache-manager') {
      return await cache.get(hashedKey);
    } else if (this.cacheType === 'simple-cache') {
      return await cache.getFromCache(hashedKey);
    }
  }

  async saveToCache(key, data) {
    const cache = this.loadCacheInstance();
    const hashedKey = this.getCacheFilePath(key);
    if (this.cacheType === 'flat-cache') {
      cache.setKey(hashedKey, data);
      cache.save(true);
    } else if (this.cacheType === 'cache-manager') {
      await cache.set(hashedKey, data);
    } else if (this.cacheType === 'simple-cache') {
      await cache.saveToCache(hashedKey, data, this.cacheOptions.ttl);
    }
  }
}

module.exports = CacheManager;
