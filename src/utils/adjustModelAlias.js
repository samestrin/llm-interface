/**
 * Adjusts model alias values
 *
 * @param {string} alias - The model alias to update (e.g., "default", "large", "small").
 * @param {string} name - The new model name to set.
 * @param {number} [tokens=null] - The optional token limit for the new model.
 * @returns {boolean} - Returns true if the update was successful, otherwise false.
 */
function adjustModelAlias(alias, name, tokens = null) {
  if (
    !this.interfaceName ||
    !config[this.interfaceName] ||
    !config[this.interfaceName].model ||
    !config[this.interfaceName].model[alias]
  ) {
    return false;
  }

  const model = { name };
  if (tokens !== null) {
    model.tokens = tokens;
  }

  config[this.interfaceName].model[alias] = model;
  return true;
}

module.exports = { adjustModelAlias };
