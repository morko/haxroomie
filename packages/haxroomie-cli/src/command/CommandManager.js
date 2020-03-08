const { InvalidCommandError } = require('../errors');
const colors = require('colors/safe');
const commandPrompt = require('../command-prompt');
const AdminCommands = require('./handlers/AdminCommands');
const CoreCommands = require('./handlers/CoreCommands');
const KickBanCommands = require('./handlers/KickBanCommands');
const PluginCommands = require('./handlers/PluginCommands');

/**
 * Class to manage CommandHandler instances.
 * Delegates command a right handler and handles displaying help.
 */
class CommandManager {
  constructor({
    roomContext,
    cmdPrefix = 'onCommand_',
    maxCommandNameLength = 12,
    helpCommandName = 'help',
    helpCommandCategory = 'Basic commands',
  } = {}) {
    this.roomContext = roomContext;
    this.cmdPrefix = cmdPrefix;
    this.maxCommandNameLength = maxCommandNameLength;
    this.helpCommandName = helpCommandName;
    this.helpCommandCategory = helpCommandCategory;
  }

  async init() {
    const handlers = [
      new AdminCommands({ roomContext: this.roomContext }),
      new CoreCommands({ roomContext: this.roomContext }),
      new KickBanCommands({ roomContext: this.roomContext }),
      new PluginCommands({ roomContext: this.roomContext }),
      //new RoleCommands({ roomContext: this.roomContext }),
    ];
    this.handlers = await this.validateHandlers(handlers);
  }

  async addHandlers(handlers) {
    this.handlers = await this.validateHandlers(handlers);
  }

  /**
   * Validates command name lengths and checks for colliding commands in
   * the handlers.
   *
   * Throws error if the handlers do not pass validation.
   *
   * @param {Array<CommandHandler>} handlers - CommandHandlers to validate.
   * @returns {Array<CommandHandler>} - The handlers that was passed
   *    to the function.
   *
   */
  async validateHandlers(handlers) {
    const cmdNames = new Set();
    for (let handler of handlers) {
      let commands = await handler.getCommands();
      for (let cmdName of commands) {
        if (cmdName.length > this.maxCommandNameLength) {
          throw new Error(
            `The maximum length for command name is ` +
              `${this.maxCommandNameLength}. Command ` +
              `${cmdName} is longer than that.`
          );
        }
        if (cmdNames.has(cmdName)) {
          throw new Error(
            `Commands with same name are not allowed: ${cmdName}`
          );
        }
        cmdNames.add(cmdName);
      }
    }
    return handlers;
  }

  /**
   * Finds the CommandHandler responsive to handle execution of the given line.
   *
   * @throws {InvalidCommandError}
   * @throws {InvalidCommandArgsError}
   *
   * @param {string} line - Line of text that contains command and arguments.
   * @returns {boolean} - Was the command executed?
   */
  async execute(line) {
    let commandExecuted = false;

    if (line.startsWith('help')) {
      this.displayHelp();
      return true;
    }

    for (let handler of this.handlers) {
      try {
        await handler.execute(line);
        commandExecuted = true;
      } catch (err) {
        if (err instanceof InvalidCommandError) {
          continue;
        }
        throw err;
      }
    }
    if (!commandExecuted) {
      throw new InvalidCommandError(`Invalid command.`);
    }
    return true;
  }

  /**
   * Adds spaces after the command name so the name aligns nicely with others.
   *
   * @param {string} cmdName - Command name to add spaces to.
   * @param {number} [indentation] - Max width of the column in spaces.
   */
  indentCommandName(cmdName, indentation = this.maxCommandNameLength) {
    let cmd = cmdName;
    for (let i = 0; i < indentation - cmdName.length; i++) cmd += ' ';
    return cmd;
  }

  /**
   * Gathers all the commands from all available handlers and prints them into
   * the console.
   */
  async displayHelp() {
    const categories = new Map();

    const helpCmdPrettyName = colors.cyan(
      this.indentCommandName(this.helpCommandName)
    );
    const helpCmdHelp = helpCmdPrettyName + 'Displays this help.';
    categories.set(this.helpCommandCategory, [helpCmdHelp]);

    for (let handler of this.handlers) {
      const commands = await handler.getCommands();

      for (let [cmdName, command] of commands.entries()) {
        if (command.disabled) continue;
        let category = command.category || 'Uncategorized';
        let description = command.description;
        let help = colors.cyan(this.indentCommandName(cmdName)) + description;

        if (categories.has(category)) {
          categories.get(category).push(help);
        } else {
          categories.set(category, [help]);
        }
      }
    }

    for (let category of categories.keys()) {
      commandPrompt.print('');
      commandPrompt.print(colors.green.bold(category + ':'));
      const helps = categories.get(category);
      commandPrompt.print(helps.join(`\n`));
    }
  }
}

module.exports = CommandManager;
