const EventEmitter = require('events');

class RoomEventHandler extends EventEmitter {
  constructor(opt) {
    if (!opt) {
      throw new Error(`Missing required argument: opt`);
    }
    if (!opt.room) {
      throw new Error(`Missing required argument: opt.room`);
    }
    super();
    this.room = opt.room;

    this.onPluginLoaded = this.onPluginLoaded.bind(this);
    this.onPluginRemoved = this.onPluginRemoved.bind(this);
    this.onPluginEnabled = this.onPluginEnabled.bind(this);
    this.onPluginDisabled = this.onPluginDisabled.bind(this);
    this.onRoomEvent = this.onRoomEvent.bind(this);

    this.addListeners(this.room);
  }

  addListeners(room) {
    room.on('room-event', this.onRoomEvent);
    room.on(`plugin-loaded`, this.onPluginLoaded);
    room.on(`plugin-removed`, this.onPluginRemoved);
    room.on(`plugin-enabled`, this.onPluginEnabled);
    room.on(`plugin-disabled`, this.onPluginDisabled);
  }

  removeListeners(room) {
    room.removeListener('room-event', this.onRoomEvent);
    room.removeListener(`plugin-loaded`, this.onPluginLoaded);
    room.removeListener(`plugin-removed`, this.onPluginRemoved);
    room.removeListener(`plugin-enabled`, this.onPluginEnabled);
    room.removeListener(`plugin-disabled`, this.onPluginDisabled);
  }

  onRoomEvent(roomEventArgs) {
    let handlerName = roomEventArgs.handlerName;
    let args = roomEventArgs.args || [];
    if (typeof this[handlerName] === 'function') {
      this[handlerName](...args);
    }
  }

  onPluginLoaded(pluginData) {
    this.emit(`print`, `${pluginData.pluginSpec.name}`, `PLUGIN LOADED`);
  }

  onPluginRemoved(pluginData) {
    this.emit(`print`, `${pluginData.pluginSpec.name}`, `PLUGIN REMOVED`);
  }

  onPluginEnabled(pluginData) {
    this.emit(`print`, `${pluginData.pluginSpec.name}`, `PLUGIN ENABLED`);
  }

  onPluginDisabled(pluginData) {
    this.emit(`print`, `${pluginData.pluginSpec.name}`, `PLUGIN DISABLED`);
  }

  onPlayerChat(player, message) {
    this.emit(`print`, `${player.name} (id:${player.id})> ${message}`, `CHAT`);
  }

  onPlayerJoin(player) {
    this.emit(`print`, `${player.name} (id:${player.id})`, `PLAYER JOINED`);
  }

  onPlayerLeave(player) {
    this.emit(`print`, `${player.name} (id:${player.id})`, `PLAYER LEFT`);
  }

  onGamePause(player) {
    if (!player) {
      this.emit(`print`, `by host`, `GAME PAUSED`);
      return;
    }
    this.emit(`print`, `by ${player.name} (id:${player.id})`, `GAME PAUSED`);
  }

  onGameUnpause(player) {
    if (!player) {
      this.emit(`print`, `by host`, `GAME STOPPED`);
      return;
    }
    this.emit(`print`, `by ${player.name} (id:${player.id})`, `GAME UNPAUSED`);
  }

  onGameStop(player) {
    if (!player) {
      this.emit(`print`, ``, `GAME STOPPED`);
      return;
    }
    this.emit(`print`, `by ${player.name} (id:${player.id})`, `GAME STOPPED`);
  }

  onGameStart(player) {
    if (!player) {
      this.emit(`print`, `by host`, `GAME STARTED`);
      return;
    }
    this.emit(`print`, `by ${player.name} (id:${player.id})`, `GAME STARTED`);
  }

  onPlayerKicked(kickedPlayer, reason, ban, byPlayer) {
    if (ban) {
      if (byPlayer) {
        this.emit(
          `print`,
          `${kickedPlayer.name} (id:${kickedPlayer.id}) banned by ` +
            `${byPlayer.name} (id:${byPlayer.id}) reason: ${reason}`,
          `PLAYER BANNED`
        );
      } else {
        this.emit(
          `print`,
          `${kickedPlayer.name} (id:${kickedPlayer.id}) banned ` +
            `reason: ${reason}`,
          `PLAYER BANNED`
        );
      }
    } else {
      if (byPlayer) {
        this.emit(
          `print`,
          `${kickedPlayer.name} (id:${kickedPlayer.id}) kicked by ` +
            `${byPlayer.name} (id:${byPlayer.id}) reason: ${reason}`,
          `PLAYER KICKED`
        );
      } else {
        this.emit(
          `print`,
          `${kickedPlayer.name} (id:${kickedPlayer.id}) kicked ` +
            `| reason: ${reason}`,
          `PLAYER KICKED`
        );
      }
    }
  }

  onPlayerAdminChange(changedPlayer, byPlayer) {
    let type = 'UNADMIN';
    if (changedPlayer.admin) {
      type = 'ADMIN';
    }
    this.emit(
      `print`,
      `${changedPlayer.name} (id:${changedPlayer.id}) ` +
        `by ${byPlayer.name} (id:${byPlayer.id})`,
      type
    );
  }
}

module.exports = RoomEventHandler;
