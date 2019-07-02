const parse = require('yargs-parser');
const { InvalidCommandError, InvalidCommandArgsError } = require('../errors');

class CommandHandler {

  constructor(opt) {
    opt = opt || {};
    this.cmdPrefix = opt.cmdPrefix || 'onCommand_';
  }

  /**
   * Validates the arguments given to a command.
   * 
   * @param {object} command - The command object.
   * @param {Array} args - Arguments for the command.
   * 
   * @throws {InvalidCommandArgsError}
   */
  validateArguments(command, args) {
    if (!command.argumentsOptional && command.args) {
      if (args.length > args.length) {
        throw new InvalidCommandArgsError('Too many arguments!');
      } else if (args.length < command.args.length) {
        throw new InvalidCommandArgsError('Too few arguments!');
      }
    }
  }

  async getCommand(name) {
    if (!this[this.cmdPrefix + name] || typeof this[this.cmdPrefix + name] !== 'function') {
      return null;
    }
    return this[this.cmdPrefix + name]();
  }

  /**
   * Parses the line into a command.
   * 
   * @param {string} line - Line to parse.
   * 
   * @throws {InvalidCommandError}
   */
  async parseLine(line) {
    let tokens = parse(line, {
      configuration: {
        "boolean-negation": false,
        "dot-notation": false,
        "camel-case-expansion": false,
        "short-option-groups": false,
        "duplicate-arguments-array": false,
        "flatten-duplicate-arrays": false,
      }
    })['_'];

    let cmdName = tokens[0];
    let args = tokens.slice(1);

    let command = await this.getCommand(cmdName);
    if (!command) {
      throw new InvalidCommandError(`Invalid command.`);
    }
    // Concatenate the arguments if command accepts only 1 argument.
    // In this case the quotes around arguments are not needed.
    if (command.args && command.args.length === 1 && args.length !== 0) {
      args = [args.join(' ')];
    }

    this.validateArguments(command, args);

    return {
      command,
      args
    };
  }

  async execute(line) {
    let cmd = await this.parseLine(line)
    if (cmd.disabled) return false;
    return cmd.command.run(...cmd.args);
  }
}
module.exports = CommandHandler;