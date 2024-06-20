/**
 * @file jest.config.js
 * @description Jest configuration file.
 */

module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testTimeout: 30000, // Set global timeout to 30 seconds
  snapshotSerializers: ['<rootDir>/src/utils/jestSerializer.js'],
};
