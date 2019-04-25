const EventEmitter = require('events');
const { messageTypes } = require('../session');

/**
 * @fires MessageHandler#open-room-start
 * @fires MessageHandler#open-room-stop
 * @fires MessageHandler#open-room-error
 * @fires MessageHandler#page-error
 * @fires MessageHandler#player-chat
 * @fires MessageHandler#player-join
 * @fires MessageHandler#player-leave
 * @fires MessageHandler#player-kicked
 * @fires MessageHandler#player-banned
 * @fires MessageHandler#admin-changed
 * @fires MessageHandler#session-closed
 * @fires MessageHandler#session-error
 */
module.exports = class MessageHandler extends EventEmitter{

	handle(message) {
		switch (message.type) {
			case messageTypes.OPEN_ROOM_START:
				this.handleOpenRoomStartEvent(message);
				break;
			case messageTypes.OPEN_ROOM_STOP:
				this.handleOpenRoomStopEvent(message);
				break;
			case messageTypes.PAGE_ERROR:
				this.handlePageErrorEvent(message);
				break;
			case messageTypes.ROOM_EVENT:
				this.handleRoomEvent(message);
				break;
			case messageTypes.SESSION_ERROR:
				this.handleSessionErrorEvent(message);
				break;
			case messageTypes.SESSION_CLOSED:
				this.handleSessionClosedEvent();
				break;
			default:
				return;
		}

	}

	handleSessionClosedEvent() {
		this.emit('session-closed');
	}

	handleSessionErrorEvent(message) {
		this.emit('session-error', message.payload.stack);
	}

	handleOpenRoomStartEvent(message) {
		if (message.error) {
			this.emit('open-room-error', message.payload.message);
		}
		this.emit('open-room-start');
	}

	handleOpenRoomStopEvent(message) {
		if (message.error) {
			this.emit('open-room-error', message.payload.message);
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

	handlePageErrorEvent(message) {
		this.emit('page-error', message.payload.message);
	}

	onPlayerChat(player, message) {
		this.emit('player-chat', `${player.name}> ${message}`);
	}

	onPlayerJoin(player) {
		this.emit('player-join', `${player.name}`);
	}

	onPlayerLeave(player) {
		this.emit('player-leave', `${player.name}`);
	}

	onPlayerKicked(kickedPlayer, reason, ban, byPlayer) {
		if (ban) {
			this.emit('player-banned',
				`${kickedPlayer.name} `
				+	`was banned by ${byPlayer.name} | reason: ${reason}`
			);
		} else {
			this.emit('player-kicked',
				`${kickedPlayer.name} `
				+	`was kicked by ${byPlayer.name} | reason: ${reason}`
			);		
		}
	}

	onPlayerAdminChange(changedPlayer, byPlayer) {
		this.emit('admin-changed',
			`${changedPlayer.name} `
			+	`by ${byPlayer.name} | admin: ${changedPlayer.admin}`
		);
	}
}

