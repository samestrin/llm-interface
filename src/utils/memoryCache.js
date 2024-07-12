/**
 * @file src/utils/memoryCache.js
 * @class MemoryCache
 * @description Singleton class for an in-memory cache.
 */

/**
 * MemoryCache class using a singleton for an in-memory cache.
 */
class MemoryCache {
  /**
   * Creates an instance of MemoryCache.
   */

  constructor() {
    if (!MemoryCache.instance) {
      this.cache = Object.create(null); // Create an object with no prototype for faster lookups
      MemoryCache.instance = this;
    }

    return MemoryCache.instance;
  }

  /**
   * Retrieves a value from the cache.
   * @param {string} key - The key of the item to retrieve.
   * @returns {any} - The cached value or null if not found.
   */
  get(key) {
    return this.cache[key] || null;
  }

  /**
   * Stores a value in the cache.
   * @param {string} key - The key to store the value under.
   * @param {any} value - The value to store.
   */
  set(key, value) {
    this.cache[key] = value;
  }

  /**
   * Deletes a value from the cache.
   * @param {string} key - The key of the item to delete.
   */
  delete(key) {
    delete this.cache[key];
  }

  /**
   * Clears all values from the cache.
   */
  clear() {
    this.cache = Object.create(null); // Clear the cache by creating a new empty object
  }
}

const instance = new MemoryCache();
Object.freeze(instance);

module.exports = instance;
