class RequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RequestError';
  }
}

class InitError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InitError';
  }
}

class StreamError extends Error {
  constructor(message) {
    super(message);
    this.name = 'StreamError';
  }
}

class GetPredictionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'GetPredictionError';
  }
}

module.exports = { RequestError, InitError, StreamError, GetPredictionError };
