const EventEmitter = require('events');

/**
 * @fires ActionHandler#open-room-start
 * @fires ActionHandler#open-room-stop
 * @fires ActionHandler#open-room-error
 * @fires ActionHandler#browser-error
 * @fires ActionHandler#player-chat
 * @fires ActionHandler#player-join
 * @fires ActionHandler#player-leave
 * @fires ActionHandler#player-kicked
 * @fires ActionHandler#player-banned
 * @fires ActionHandler#admin-changed
 */
module.exports = class ActionHandler extends EventEmitter{

	handle(action) {
		switch (action.type) {
			case "OPEN_ROOM_START":
				this.handleOpenRoomStartEvent(action);
				break;
			case "OPEN_ROOM_STOP":
				this.handleOpenRoomStopEvent(action);
				break;
			case "BROWSER_ERROR":
				this.handleBrowserErrorEvent(action);
				break;
			case "ROOM_EVENT":
				this.handleRoomEvent(action);
				break;
			default:
				return;
		}

	}

	handleOpenRoomStartEvent(action) {
		if (action.error) {
			this.emit('open-room-error', action.payload.message);
			//process.exit(1);
		}
		this.emit('open-room-start');
	}

	handleOpenRoomStopEvent(action) {
		if (action.error) {
			this.emit('open-room-error', action.payload.message);
			//process.exit(1);
		}
		let roomInfo = action.payload.roomInfo;
		this.emit('open-room-stop', roomInfo.roomlink);
	}
	
	handleRoomEvent(action) {
		let handlerName = action.payload.handlerName;
		let args = action.payload.args || [];

		if (typeof this[handlerName] === 'function') {
			this[handlerName](...args);
		}
	}

	handleBrowserErrorEvent(action) {
		this.emit('browser-error', action.payload.message);
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

