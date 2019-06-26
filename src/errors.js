/**
 * @module errors
 */

/**
 * Error for when the HaxBall headless page is unreachable.
 */
class ConnectionError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error for when trying to open a room, but the token is invalid or
 * has been expired.
 */
class InvalidTokenError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error for when the Haxball Headless Manager takes too much time to start.
 */
class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error thrown by RoomController methods when RoomController can not control 
 * the room anymore, due to some fatal error happening in the browser.
 */
class UnusableError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error thrown by RoomController methods when trying to call methods that
 * require the room to be running, but it is not.
 */
class NotRunningError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error thrown by RoomController when calling RoomController#openRoom while
 * it has been called previously and not yet finished.
 */
class RoomLockedError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error thrown by CLI class CommandHandler when it can not find the command.
 */
class InvalidCommandError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error thrown by CLI class CommandHandler the arguments if the command
 * arguments are invalid.
 */
class InvalidCommandArgsError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  ConnectionError,
  TimeoutError,
  InvalidTokenError,
  UnusableError,
  NotRunningError,
  RoomLockedError,
  InvalidCommandError,
  InvalidCommandArgsError
};