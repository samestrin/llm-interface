/**
 * @file test/utils/simpleCache.js
 * @description Utility class SimpleCache
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const unlinkAsync = promisify(fs.unlink);
const mkdirAsync = promisify(fs.mkdir);

class SimpleCache {
  constructor(options = {}) {
    this.cacheDir = options.cacheDir || path.resolve(__dirname, 'cache');
    this.defaultTTL = options.defaultTTL || 3600; // Default TTL of 1 fs
    this.cacheSizeLimit = options.cacheSizeLimit || 100; // Default max 100 entries
    this.cache = new Map();
    this.locks = new Set(); // To track locked files
    this.initCacheDir();

    if (options.autoCleanup) {
      this.startCleanupInterval(options.cleanupInterval || 60000); // Cleanup every minute
    }
  }

  async initCacheDir() {
    try {
      if (!fs.existsSync(this.cacheDir)) {
        await mkdirAsync(this.cacheDir, { recursive: true });
      }
    } catch (error) {
      console.error('Error initializing cache directory:', error);
    }
  }

  getCacheFilePath(key) {
    const hashedKey = crypto.createHash('md5').update(key).digest('hex');
    const filenameWithPath = path.join(this.cacheDir, `${hashedKey}.json`);

    return filenameWithPath;
  }

  async getFromCache(key) {
    const cacheFilePath = this.getCacheFilePath(key);

    if (this.locks.has(cacheFilePath)) {
      // Wait until the file is unlocked
      await new Promise((resolve) => setTimeout(resolve, 100));
      return this.getFromCache(key);
    }

    try {
      if (fs.existsSync(cacheFilePath)) {
        const data = JSON.parse(await readFileAsync(cacheFilePath, 'utf-8'));
        if (data.expiry && data.expiry < Date.now()) {
          await unlinkAsync(cacheFilePath);
          this.cache.delete(key);
          return null;
        }
        if (data.isJson) {
          data.value = JSON.parse(data.value);
        }

        this.cache.set(key, data.value);
        return data.value;
      }

      return null;
    } catch (error) {
      console.error('Error reading from cache:', error);
      return null;
    }
  }

  async saveToCache(key, value, ttl = this.defaultTTL) {
    const cacheFilePath = this.getCacheFilePath(key);
    const data = {
      value: this.serialize(value),
      expiry: ttl ? Date.now() + ttl * 1000 : null,
      isJson: typeof value === 'object' && value !== null, // Flag to indicate if the data is JSON
    };

    try {
      // Lock the file
      this.locks.add(cacheFilePath);
      await writeFileAsync(cacheFilePath, JSON.stringify(data), 'utf-8');
      this.cache.set(key, value);

      if (this.cache.size > this.cacheSizeLimit) {
        this.evictOldestEntry();
      }
    } catch (error) {
      console.error('Error saving to cache:', error);
    } finally {
      // Unlock the file
      this.locks.delete(cacheFilePath);
    }
  }

  async deleteFromCache(key) {
    const cacheFilePath = this.getCacheFilePath(key);

    try {
      if (fs.existsSync(cacheFilePath)) {
        await unlinkAsync(cacheFilePath);
        this.cache.delete(key);
      }
    } catch (error) {
      console.error('Error deleting from cache:', error);
    }
  }

  async clearCache() {
    try {
      const files = fs.readdirSync(this.cacheDir);
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(this.cacheDir, file);
          await unlinkAsync(filePath);
        }
      }
      this.cache.clear();
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }

  startCleanupInterval(interval) {
    this.cleanupInterval = setInterval(
      () => this.clearExpiredEntries(),
      interval,
    );
  }

  stopCleanupInterval() {
    clearInterval(this.cleanupInterval);
  }

  async clearExpiredEntries() {
    try {
      const files = fs.readdirSync(this.cacheDir);
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(this.cacheDir, file);
          const data = JSON.parse(await readFileAsync(filePath, 'utf-8'));
          if (data.expiry && data.expiry < Date.now()) {
            await unlinkAsync(filePath);
            this.cache.delete(file.replace('.json', ''));
          }
        }
      }
    } catch (error) {
      console.error('Error clearing expired cache entries:', error);
    }
  }

  async evictOldestEntry() {
    try {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        await this.deleteFromCache(oldestKey);
      }
    } catch (error) {
      console.error('Error evicting oldest cache entry:', error);
    }
  }

  serialize(value) {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return value.toString();
  }

  deserialize(data, isJson) {
    if (isJson) {
      return JSON.parse(data);
    }
    return data;
  }
}

module.exports = SimpleCache;
