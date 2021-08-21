const { logger } = require('haxroomie-core');
const colors = require('colors/safe');
const commandPrompt = require('./command-prompt');

class RoomEventHandler {
  constructor({ haxroomie, loglevels }) {
    if (!haxroomie) {
      throw new TypeError(`Missing required argument: haxroomie`);
    }

    if (!loglevels) {
      throw new TypeError(`Missing required argument: loglevels`);
    }

    this.haxroomie = haxroomie;
    this.loglevels = loglevels;

    this.onPluginLoaded = this.onPluginLoaded.bind(this);
    this.onPluginRemoved = this.onPluginRemoved.bind(this);
    this.onPluginEnabled = this.onPluginEnabled.bind(this);
    this.onPluginDisabled = this.onPluginDisabled.bind(this);
    this.onOpenRoomStart = this.onOpenRoomStart.bind(this);
    this.onOpenRoomStop = this.onOpenRoomStop.bind(this);
    this.onCloseRoomStart = this.onCloseRoomStart.bind(this);
    this.onCloseRoomStop = this.onCloseRoomStop.bind(this);
    this.onPageClosed = this.onPageClosed.bind(this);
    this.onPageError = this.onPageError.bind(this);
    this.onErrorLogged = this.onErrorLogged.bind(this);
    this.onWarningLogged = this.onWarningLogged.bind(this);
    this.onInfoLogged = this.onInfoLogged.bind(this);

    this.addEventHandlers(this.haxroomie);
  }

  addEventHandlers(haxroomie) {
    haxroomie.on(`plugin-loaded`, this.onPluginLoaded);
    haxroomie.on(`plugin-removed`, this.onPluginRemoved);
    haxroomie.on(`plugin-enabled`, this.onPluginEnabled);
    haxroomie.on(`plugin-disabled`, this.onPluginDisabled);
    haxroomie.on(`open-room-start`, this.onOpenRoomStart);
    haxroomie.on(`open-room-stop`, this.onOpenRoomStop);
    haxroomie.on(`close-room-start`, this.onCloseRoomStart);
    haxroomie.on(`close-room-stop`, this.onCloseRoomStop);
    haxroomie.on(`page-closed`, this.onPageClosed);
    haxroomie.on(`page-crash`, this.onPageError);
    haxroomie.on(`page-error`, this.onPageError);

    // Set listening for the log events only if we are not in development
    // mode, because in development mode they will be printed out anyways.
    if (process.env.NODE_ENV !== 'development') {
      haxroomie.on(`error-logged`, this.onErrorLogged);

      if (this.loglevel >= this.loglevels.warn) {
        haxroomie.on(`warning-logged`, this.onWarningLogged);
      }
      if (this.loglevel >= this.loglevels.info) {
        haxroomie.on(`info-logged`, this.onInfoLogged);
      }
    }
  }

  removeEventHandlers(haxroomie) {
    haxroomie.off(`plugin-loaded`, this.onPluginLoaded);
    haxroomie.off(`plugin-removed`, this.onPluginRemoved);
    haxroomie.off(`plugin-enabled`, this.onPluginEnabled);
    haxroomie.off(`plugin-disabled`, this.onPluginDisabled);
    haxroomie.off(`open-room-start`, this.onOpenRoomStart);
    haxroomie.off(`open-room-stop`, this.onOpenRoomStop);
    haxroomie.off(`close-room-start`, this.onCloseRoomStart);
    haxroomie.off(`close-room-stop`, this.onCloseRoomStop);
    haxroomie.off(`page-closed`, this.onPageClosed);
    haxroomie.off(`page-crash`, this.onPageError);
    haxroomie.off(`page-error`, this.onPageError);
    haxroomie.off(`error-logged`, this.onErrorLogged);
    haxroomie.off(`warning-logged`, this.onWarningLogged);
    haxroomie.off(`info-logged`, this.onInfoLogged);
  }

  onPluginLoaded(room, pluginData) {
    commandPrompt.print(`${pluginData.pluginSpec.name}`, {
      context: commandPrompt.messageContext.plugin,
      type: 'plugin loaded',
      colorFn: colors.green,
      room,
    });
  }

  onPluginRemoved(room, pluginData) {
    commandPrompt.print(`${pluginData.pluginSpec.name}`, {
      context: commandPrompt.messageContext.plugin,
      type: 'plugin removed',
      colorFn: colors.cyan,
      room,
    });
  }

  onPluginEnabled(room, pluginData) {
    commandPrompt.print(`${pluginData.pluginSpec.name}`, {
      context: commandPrompt.messageContext.plugin,
      type: 'plugin enabled',
      colorFn: colors.green,
      room,
    });
  }

  onPluginDisabled(room, pluginData) {
    commandPrompt.print(`${pluginData.pluginSpec.name}`, {
      context: commandPrompt.messageContext.plugin,
      type: 'plugin disabled',
      colorFn: colors.cyan,
      room,
    });
  }

  onPageError(room, err) {
    commandPrompt.error(err, {
      context: commandPrompt.messageContext.browser,
      room,
    });
  }

  onErrorLogged(room, msg) {
    commandPrompt.error(msg, {
      type: 'console.error',
      context: commandPrompt.messageContext.browser,
      room,
    });
  }

  onWarningLogged(room, msg) {
    commandPrompt.print(msg, {
      type: 'console.warn',
      context: commandPrompt.messageContext.browser,
      room,
      colorFn: colors.yellow,
    });
  }

  onInfoLogged(room, msg) {
    commandPrompt.print(msg, {
      type: 'console.log',
      context: commandPrompt.messageContext.browser,
      room,
    });
  }

  onStartupLog(room, msg) {
    commandPrompt.print(msg, {
      type: 'bootstrap',
      context: commandPrompt.messageContext.browser,
      room,
      colorFn: colors.green,
    });
  }

  onOpenRoomStart(room, err) {
    if (err) {
      commandPrompt.error(err, {
        context: commandPrompt.messageContext.browser,
        room,
      });
      return;
    }
    if (
      process.env.NODE_ENV !== 'development' &&
      this.loglevel < this.loglevels.info
    ) {
      room.on('info-logged', this.onStartupLog);
    }

    commandPrompt.print('', {
      type: 'starting room',
      room,
      colorFn: colors.cyan,
    });
  }

  onOpenRoomStop(room, err, roomInfo) {
    room.removeListener('info-logged', this.onStartupLog);
    if (err) {
      switch (err.name) {
        case 'InvalidTokenError':
          commandPrompt.print(err.message, {
            type: 'invalid token',
            room,
            colorFn: colors.red.bold,
          });
          break;
        default:
          commandPrompt.error(`Could not start room: ${err.message}`, { room });
          break;
      }
      logger.debug(`[${room.id}] ${err.stack}`);
      return;
    }

    commandPrompt.print(roomInfo.roomLink, {
      type: 'room started',
      room,
      colorFn: colors.cyan,
    });
  }

  onCloseRoomStart(room, err) {
    if (err) {
      commandPrompt.error(
        'Room was not closed properly and is probably unusable.'
      );
    } else {
      commandPrompt.print('', {
        type: 'closing room',
        room,
        colorFn: colors.cyan,
      });
    }
  }

  onCloseRoomStop(room, err) {
    if (err) {
      commandPrompt.error(
        'Room was not closed properly and is probably unusable.'
      );
    } else {
      commandPrompt.print('', {
        type: 'room closed',
        room,
        colorFn: colors.cyan,
      });
    }
  }

  async onPageClosed(room) {
    await this.haxroomie.removeRoom(room.id);
    commandPrompt.print(
      `The tab controlling ${colors.cyan(room.id)} was closed.`,
      {
        type: 'page closed',
        room,
        colorFn: colors.cyan,
      }
    );
  }
}

module.exports = RoomEventHandler;
