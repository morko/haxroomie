const EventEmitter = require('events');

class RoomEventHandler extends EventEmitter {
  constructor({ room }) {
    if (!room) {
      throw new TypeError(`Missing required argument: room`);
    }
    super();
    this.room = room;

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

  playerInfoString(player) {
    if (!player) return 'host';
    const playerInfo = `${player.name} (id:${player.id})`;
    return playerInfo;
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
    const playerInfo = this.playerInfoString(player);
    this.emit(`print`, `${playerInfo}> ${message}`, `CHAT`);
  }

  onPlayerJoin(player) {
    const playerInfo = this.playerInfoString(player);
    this.emit(`print`, `${playerInfo}`, `PLAYER JOINED`);
  }

  onPlayerLeave(player) {
    const playerInfo = this.playerInfoString(player);
    this.emit(`print`, `${playerInfo}`, `PLAYER LEFT`);
  }

  onGamePause(player) {
    const playerInfo = this.playerInfoString(player);
    this.emit(`print`, `by ${playerInfo}`, `GAME PAUSED`);
  }

  onGameUnpause(player) {
    const playerInfo = this.playerInfoString(player);
    this.emit(`print`, `by ${playerInfo}`, `GAME UNPAUSED`);
  }

  onGameStop(player) {
    const playerInfo = this.playerInfoString(player);
    this.emit(`print`, `by ${playerInfo}`, `GAME STOPPED`);
  }

  onGameStart(player) {
    const playerInfo = this.playerInfoString(player);
    this.emit(`print`, `by ${playerInfo}`, `GAME STARTED`);
  }

  onPlayerKicked(kickedPlayer, reason, ban, byPlayer) {
    const kickedPlayerInfo = this.playerInfoString(kickedPlayer);
    const byPlayerInfo = this.playerInfoString(byPlayer);

    if (ban) {
      this.emit(
        `print`,
        `${kickedPlayerInfo} banned by ${byPlayerInfo} reason: ${reason}`,
        `PLAYER BANNED`
      );
    } else {
      this.emit(
        `print`,
        `${kickedPlayerInfo} kicked by ${byPlayerInfo} reason: ${reason}`,
        `PLAYER KICKED`
      );
    }
  }

  onPlayerAdminChange(changedPlayer, byPlayer) {
    let type = 'UNADMIN';
    if (changedPlayer.admin) {
      type = 'ADMIN';
    }

    const changedPlayerInfo = this.playerInfoString(changedPlayer);
    const byPlayerInfo = this.playerInfoString(byPlayer);

    this.emit(`print`, `${changedPlayerInfo} by ${byPlayerInfo}`, type);
  }
}

module.exports = RoomEventHandler;
