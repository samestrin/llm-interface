// jest-serializer.js

const safeStringify = (obj, space = 2) => {
  const cache = new Set();
  const jsonString = JSON.stringify(
    obj,
    (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (cache.has(value)) {
          return "[Circular]";
        }
        cache.add(value);
      }
      return value;
    },
    space
  );
  cache.clear();
  return jsonString;
};

module.exports = {
  test(value) {
    return typeof value === "object" && value !== null;
  },
  print(value) {
    return safeStringify(value, 2);
  },
};
