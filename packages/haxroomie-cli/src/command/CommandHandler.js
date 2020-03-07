const parse = require('yargs-parser');
const { InvalidCommandError, InvalidCommandArgsError } = require('../errors');

class CommandHandler {
  constructor({ cmdPrefix = 'onCommand_' } = {}) {
    this.cmdPrefix = cmdPrefix;
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

  /**
   * Returns all commands defined in this handler.
   */
  async getCommands() {
    const commands = new Map();
    for (let prop of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
      if (!prop.startsWith(this.cmdPrefix)) {
        continue;
      }
      let commandDefinition = await this[prop]();
      commands.set(prop.slice(this.cmdPrefix.length), commandDefinition);
    }
    return commands;
  }

  /**
   * Returns the command definition object returned by the matching method.
   * The command definition method might return a promise.
   *
   * @param {string} name - Name of the command to get.
   * @returs {Promise<object>|object|null} - The matching command definition or
   *    null if one was not found.
   */
  async getCommand(name) {
    if (
      !this[this.cmdPrefix + name] ||
      typeof this[this.cmdPrefix + name] !== 'function'
    ) {
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
   * @throws {InvalidCommandArgsError}
   */
  async parseLine(line) {
    let tokens = parse(line, {
      configuration: {
        'boolean-negation': false,
        'dot-notation': false,
        'camel-case-expansion': false,
        'short-option-groups': false,
        'duplicate-arguments-array': false,
        'flatten-duplicate-arrays': false,
      },
    })['_'];

    let cmdName = tokens[0];
    let args = tokens.slice(1);

    let command = await this.getCommand(cmdName);

    if (!command) {
      throw new InvalidCommandError(`Invalid command.`);
    }

    // Send command the raw input if command accepts only 1 argument.
    if (command.args && command.args.length === 1 && args.length !== 0) {
      args = [line.slice(cmdName.length + 1)];
    }

    this.validateArguments(command, args);

    return {
      command,
      args,
    };
  }

  /**
   * Tries to parse the given line into command and arguments and execute it.
   * @throws {InvalidCommandError}
   * @throws {InvalidCommandArgsError}
   * @param {string} line - Line of text that contains command and arguments.
   * @returns {any} - Whatever the commands `run` function returns.
   */
  async execute(line) {
    let cmd = await this.parseLine(line);
    if (cmd.disabled) return false;
    return cmd.command.run(...cmd.args);
  }
}
module.exports = CommandHandler;
