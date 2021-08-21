const EventEmitter = require('events');

/**
 * Handles the native events that happen from the Haxball RoomObject.
 */
class NativeRoomEventHandler extends EventEmitter {
  constructor({ haxroomie }) {
    if (!haxroomie) {
      throw new TypeError(`Missing required argument: haxroomie`);
    }
    super();
    this.haxroomie = haxroomie;

    this.onRoomEvent = this.onRoomEvent.bind(this);

    this.addListeners(this.haxroomie);
  }

  addListeners(haxroomie) {
    haxroomie.on('room-event', this.onRoomEvent);
  }

  removeListeners(haxroomie) {
    haxroomie.removeListener('room-event', this.onRoomEvent);
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

module.exports = NativeRoomEventHandler;
