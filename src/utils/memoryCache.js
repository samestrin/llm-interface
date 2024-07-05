/**
 * @file test/utils/memoryCache.js
 * @description Utility class MemoryCache
 */

class MemoryCache {
  constructor() {
    if (!MemoryCache.instance) {
      this.cache = Object.create(null); // Create an object with no prototype for faster lookups
      MemoryCache.instance = this;
    }

    return MemoryCache.instance;
  }

  get(key) {
    return this.cache[key] || null;
  }

  set(key, value) {
    this.cache[key] = value;
  }

  delete(key) {
    delete this.cache[key];
  }

  clear() {
    this.cache = Object.create(null); // Clear the cache by creating a new empty object
  }
}

const instance = new MemoryCache();
Object.freeze(instance);

module.exports = instance;
