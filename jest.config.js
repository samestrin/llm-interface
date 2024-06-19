/**
 * @file jest.config.js
 * @description Jest configuration file.
 */

module.exports = {
  testTimeout: 30000, // Set global timeout to 30 seconds
  snapshotSerializers: ['<rootDir>/test/utils/jest-serializer.js'],
};
