/**
 * Error thrown by CLI class CommandHandler when it can not find the command.
 */
class InvalidCommandError extends Error {
  constructor(message) {
    message = message || 'Invalid command!';
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
    message = message || 'Invalid command arguments!';
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = {
  InvalidCommandError,
  InvalidCommandArgsError,
};
