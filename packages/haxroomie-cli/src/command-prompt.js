const readline = require('readline');
const colors = require('colors/safe');
const { logger } = require('haxroomie-core');

const messageContext = {
  haxroomie: 0,
  browser: 1,
  plugin: 2,
  nativeRoomEvent: 3,
};

const COLORS = {
  BOOTSTRAP: colors.green,
  'ADDING ROOM': colors.green,
  'ROOM ADDED': colors.green.bold,
  'CLOSING ROOM': colors.yellow,
  'ROOM CLOSED': colors.yellow.bold,
  'STARTING ROOM': colors.green,
  'ROOM STARTED': colors.green.bold,
  'INVALID TOKEN': colors.red.bold,
  CHAT: colors.white.bold,
  'PLAYER JOINED': colors.green,
  'PLAYER LEFT': colors.cyan,
  'PLAYER KICKED': colors.yellow.bold,
  'GAME PAUSED': colors.cyan,
  'GAME UNPAUSED': colors.cyan,
  'GAME STOPPED': colors.cyan,
  'GAME STARTED': colors.cyan,
  'PLAYER BANNED': colors.red,
  ADMIN: colors.yellow,
  UNADMIN: colors.yellow,
  PLAYERS: colors.green,
  'ROLE INFO': colors.green,
  'PAGE CLOSED': colors.red,
  ERROR: colors.red.bold,
  'INVALID COMMAND': colors.red,
  'INVALID ARGUMENTS': colors.red,
  'PLUGINS LOADED': colors.green,
  'BROWSER LOG INFO': colors.green.bold,
  'BROWSER LOG ERROR': colors.red.bold,
  'BROWSER LOG WARN': colors.yellow.bold,
  'PLUGIN LOADED': colors.green,
  'PLUGIN REMOVED': colors.cyan,
  'PLUGIN ENABLED': colors.green,
  'PLUGIN DISABLED': colors.cyan,
  'LOADING CONFIG': colors.yellow,
  'RELOAD CONFIG': colors.yellow,
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let cmd = null;

rl.on(`line`, line => onNewLine(line));
rl.on(`close`, () => {
  if (!cmd) {
    process.exit(0);
  } else {
    cmd.execute(`q`);
  }
});
rl.on('SIGCONT', () => {
  rl.resume();
});

/**
 * Sets the prompt string
 * @param {string} prompt - The prompt string.
 */
function setPrompt(prompt) {
  rl.setPrompt(prompt);
}

/**
 * Sets the command manager.
 * @param {CommandManager} commands - Object that handles parsing user input
 *    and exection of commands.
 */
function setCommandManager(commandManager) {
  cmd = commandManager;
}

/**
 * Asks user a question.
 * @param {string} question - Question to ask.
 */
async function question(question) {
  let answer = await new Promise(resolve => {
    rl.question(question, answer => {
      resolve(answer);
    });
  });
  createPrompt();
  return answer;
}

/**
 * Prints message to console.
 * @param {string} msg - The message.
 * @param {object} options - Additional options.
 * @param {RoomController} options.room - Room that the message came from.
 * @param {number} options.context - Context of the message.
 * @param {string} options.type - Short description of the message type.
 * @param {function} options.colorFn - Color function from `colors/safe` npm package.
 */
function print(msg, options) {
  const styledMessage = styleMessage(msg, options);
  printRaw(styledMessage);
}

/**
 * Prints given message to console without styling it.
 * @param {string} msg - The message.
 */
function printRaw(msg) {
  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  console.log(msg);
  createPrompt();
}

/**
 * Prints error to console. If `err` is type of `Error` an error stack
 * will be printed.
 * @param {Error|string} msg - The message.
 * @param {object} options - Additional options.
 * @param {RoomController} options.room - Room that the message came from.
 * @param {number} [options.context=messageContext.haxroomie] - Context of the message.
 * @param {string} [options.type='error'] - Short description of the message type.
 * @param {function} [options.colorFn=colors.red.bold] - Color function from `colors/safe` npm package.
 */
function error(msg, options) {
  const defaultOptions = {
    context: messageContext.haxroomie,
    type: 'error',
    colorFn: colors.red.bold,
  };

  const newOptions = { ...defaultOptions, ...options };

  if (msg && msg.stack) {
    print(msg, newOptions);
    print(msg.stack, newOptions);
  } else {
    print(msg, newOptions);
  }
}

/**
 * Prints warning message to console.
 * @param {Error|string} msg - The message.
 * @param {object} options - Additional options.
 * @param {RoomController} options.room - Room that the message came from.
 * @param {number} [options.context=messageContext.haxroomie] - Context of the message.
 * @param {string} [options.type='warning'] - Short description of the message type.
 * @param {function} [options.colorFn=colors.yellow.bold] - Color function from `colors/safe` npm package.
 */
function warn(msg, options) {
  const defaultOptions = {
    context: messageContext.haxroomie,
    type: 'warning',
    colorFn: colors.yellow.bold,
  };

  const newOptions = { ...defaultOptions, ...options };

  print(msg, newOptions);
}

/**
 * Formats the message based on its type.
 * @param {string} msg - The message.
 * @param {object} options - Additional options.
 * @param {RoomController} options.room - Room that the message came from.
 * @param {number} options.context - Context of the message.
 * @param {string} options.type - Short description of the message type.
 * @param {function} options.colorFn - Color function from `colors/safe` npm package.
 */
function styleMessage(
  msg,
  { context = messageContext.haxroomie, room, type, colorFn }
) {
  let prefix = '';

  switch (context) {
    case messageContext.browser:
      prefix += '🌍 ';
      break;
    case messageContext.haxroomie:
      prefix += '🏡 ';
      break;
    case messageContext.plugin:
      prefix += '🔌 ';
      break;
    case messageContext.nativeRoomEvent:
      prefix += '⚽ ';
      break;
    default:
      prefix += '🏡 ';
      break;
  }

  if (room) {
    prefix += `<${room.id}> `;
  }

  if (type) {
    prefix += `[${type}] `;
  }

  let coloredMessage = msg;

  if (colorFn) {
    coloredMessage = colorFn(msg);
  }

  const styledMessage = prefix + coloredMessage;

  return styledMessage;
}

/**
 * Inserts a new input prompt.
 */
function createPrompt() {
  rl.prompt(true);
}

/**
 * Receives the lines from process.stdout and executes commands.
 * @param {string} input
 */
async function onNewLine(line) {
  try {
    if (cmd) {
      await cmd.execute(line);
    } else {
      error('Console is not yet ready.');
    }
  } catch (err) {
    switch (err.name) {
      case 'InvalidCommandError':
        error(`Command not found: '${line}' (type "help" for commands).`);
        break;

      case 'InvalidCommandArgsError':
        error(err.message, {
          type: 'invalid command arguments',
        });
        break;

      default:
        error(err);
    }

    logger.debug(err.stack);
  }
  createPrompt();
}

module.exports = {
  setCommandManager,
  setPrompt,
  print,
  error,
  warn,
  question,
  messageContext,
};
