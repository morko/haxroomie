const logger = require('../../logger');
const colors = require('colors');

/** Handles the console logs that happen in the headless browser. */
class RoomErrorHandler {
  /**
   * @param {object} opt - Options.
   * @param {object} opt.page - RoomControllers page object.
   * @param {object} opt.emit - RoomControllers emit function.
   */
  constructor({ page, emit, roomId }) {
    this.page = page;
    this.emit = emit;
    this.roomId = roomId;

    this.handleConsole = this.handleConsole.bind(this);

    this.page.on('console', this.handleConsole);
  }

  /**
   * Parses the message from ConsoleMessage into strings.
   * @param {ConsoleMessage} consoleMessage - Puppeteer ConsoleMessage object.
   * @return {Array<string>} - Parsed messages in array.
   */
  async parseConsoleMessage(consoleMessage) {
    let messages = [];
    let everyMessageWasString = true;
    for (let jsHandle of consoleMessage.args()) {
      if (jsHandle._remoteObject.type === 'object') {
        everyMessageWasString = false;
        if (jsHandle._remoteObject.subtype === 'error') {
          messages.push(jsHandle._remoteObject.description);
        } else {
          let jsonValue = await jsHandle.jsonValue();
          messages.push('Object: \n' + JSON.stringify(jsonValue, null, 2));
        }
      } else if (jsHandle._remoteObject.type === 'string') {
        messages.push(jsHandle._remoteObject.value);
      }
    }
    if (messages.length < 1) return [consoleMessage.text()];
    if (everyMessageWasString) {
      return [messages.join(' ')];
    }
    return messages;
  }

  /**
   * Handle the `console` event from Puppeteer.
   */
  async handleConsole(consoleMessage) {
    if (this.isIgnoredConsoleMessage(consoleMessage)) {
      return;
    }
    let messages = await this.parseConsoleMessage(consoleMessage);
    if (messages.length < 1) return;

    if (consoleMessage.type() === 'error') {
      this.handleConsoleError(messages);
    } else if (consoleMessage.type() === 'warning') {
      this.handleConsoleWarning(messages);
    } else {
      this.handleConsoleLog(messages);
    }
  }
  /**
   * Handle console messages of type `error`.
   * @emits RoomController#error-logged
   */
  async handleConsoleError(messages) {
    for (let msg of messages) {
      this.emit('error-logged', msg);
      logger.debug(
        `[${colors.cyan(this.roomId)}] [${colors.red('ERROR')}] ${msg}`
      );
    }
  }

  /**
   * Handle console messages of type `warning`.
   * @emits RoomController#warning-logged
   */
  async handleConsoleWarning(messages) {
    for (let msg of messages) {
      this.emit('warning-logged', msg);
      logger.debug(
        `[${colors.cyan(this.roomId)}] [${colors.yellow('WARNING')}] ${msg}`
      );
    }
  }

  /**
   * Handle console messages that are not warnings or errors.
   * @emits RoomController#info-logged
   */
  handleConsoleLog(messages) {
    for (let msg of messages) {
      this.emit('info-logged', msg);
      logger.debug(
        `[${colors.cyan(this.roomId)}] [${colors.green('INFO')}] ${msg}`
      );
    }
  }

  isIgnoredConsoleMessage(msg) {
    const text = msg.text();

    // ignore the errors that happen during loading plugins
    if (
      text.startsWith(
        `Failed to load resource: the server responded with a status of 404`
      )
    ) {
      return true;
    }

    // do not display warning that happens during loading HHM
    if (msg.text().startsWith('[WARN HHM]:  No room config was provided')) {
      return true;
    }
    return false;
  }
}

module.exports = RoomErrorHandler;
