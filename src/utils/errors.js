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

class SendMessageError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SendMessageError';
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

class LLMInterfaceError extends Error {
  constructor(message) {
    super(message);
    this.name = 'LLMInterfaceError';
  }
}

module.exports = {
  RequestError,
  InitError,
  SendMessageError,
  StreamError,
  GetPredictionError,
  LLMInterfaceError,
};
