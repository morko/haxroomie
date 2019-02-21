const EventEmitter = require('events');

/**
 * @fires EventHandler#open-room-start
 * @fires EventHandler#open-room-stop
 * @fires EventHandler#open-room-error
 * @fires EventHandler#browser-error
 * @fires EventHandler#player-chat
 * @fires EventHandler#player-join
 * @fires EventHandler#player-leave
 * @fires EventHandler#player-kicked
 * @fires EventHandler#player-banned
 * @fires EventHandler#admin-changed
 */
module.exports = class EventHandler extends EventEmitter{

	handle(message) {
		switch (message.type) {
			case "OPEN_ROOM_START":
				this.handleOpenRoomStartEvent(message);
				break;
			case "OPEN_ROOM_STOP":
				this.handleOpenRoomStopEvent(message);
				break;
			case "BROWSER_ERROR":
				this.handleBrowserErrorEvent(message);
				break;
			case "ROOM_EVENT":
				this.handleRoomEvent(message);
				break;
			default:
				return;
		}

	}

	handleOpenRoomStartEvent(message) {
		if (message.error) {
			this.emit('open-room-error', message.payload.message);
			//process.exit(1);
		}
		this.emit('open-room-start');
	}

	handleOpenRoomStopEvent(message) {
		if (message.error) {
			this.emit('open-room-error', message.payload.message);
			//process.exit(1);
		}
		let roomInfo = message.payload.roomInfo;
		this.emit('open-room-stop', roomInfo.roomLink);
	}
	
	handleRoomEvent(message) {
		let handlerName = message.payload.handlerName;
		let args = message.payload.args || [];

		if (typeof this[handlerName] === 'function') {
			this[handlerName](...args);
		}
	}

	handleBrowserErrorEvent(message) {
		this.emit('browser-error', message.payload.message);
	}

	onPlayerChat(player, message) {
		this.emit('player-chat', `${player.name}#${player.id}> ${message}`);
	}
	onPlayerJoin(player) {
		this.emit('player-join', `${player.name}#${player.id}`);
	}
	onPlayerLeave(player) {
		this.emit('player-leave', `${player.name}#${player.id}`);
	}
	onPlayerKicked(kickedPlayer, reason, ban, byPlayer) {
		if (ban) {
			this.emit('player-banned',
				`${kickedPlayer.name}#${kickedPlayer.id} ` +
					`was banned by ${byPlayer.name}#${byPlayer.id} | reason: ${reason}`
			);
		} else {
			this.emit('player-kicked',
				`${kickedPlayer.name}#${kickedPlayer.id} ` +
					`was kicked by ${byPlayer.name}#${byPlayer.id} | reason: ${reason}`
			);		
		}
	}

	onPlayerAdminChange(changedPlayer, byPlayer) {
		this.emit('admin-changed',
			`${changedPlayer.name}#${changedPlayer.id} ` +
				`by ${byPlayer.name}#${byPlayer.id} | admin: ${changedPlayer.admin}`

		)
	}
}

