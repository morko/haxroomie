const { createLogger, format, transports } = require('winston');
const { stringify } = require('./utils');

let customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
  },
  colors: {
    error: 'red',
    warn: 'bold yellow',
    info: 'green',
    verbose: 'cyan',
    debug: 'grey',
  },
};

const alignedWithColorsAndTime = format.combine(
  format.colorize({ colors: customLevels.colors }),
  format.timestamp(),
  format.align(),
  format.printf((info) => {
    const { timestamp, level, message, ...args } = info;
    return `[${timestamp}] [${level}] ${message.trim()} ${
      Object.keys(args).length ? stringify(args) : ''
    }`;
  })
);

const logger = createLogger({
  levels: customLevels.levels,
  format: alignedWithColorsAndTime,
});

let transportOptions;
let environment = process.env.NODE_ENV || '';
switch (environment) {
  case 'development':
    transportOptions = { level: 'debug' };
    break;
  case 'test':
    transportOptions = { silent: true };
    break;
  default:
    transportOptions = { level: 'info' };
    break;
}
logger.add(new transports.Console(transportOptions));

module.exports = logger;
