const EventEmitter = require('events');

/**
 * @fires MessageHandler#open-room-start
 * @fires MessageHandler#open-room-stop
 * @fires MessageHandler#open-room-error
 * @fires MessageHandler#browser-error
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
	constructor(opt) {
		if (!opt) throw new Error('Missing argument: opt');
		if (!opt.messageTypes) {
			throw new Error('Missing argument: opt.messageTypes');
		}
		super();

		this.messageTypes = opt.messageTypes;
	}
	handle(message) {
		switch (message.type) {
			case this.messageTypes.OPEN_ROOM_START:
				this.handleOpenRoomStartEvent(message);
				break;
			case this.messageTypes.OPEN_ROOM_STOP:
				this.handleOpenRoomStopEvent(message);
				break;
			case this.messageTypes.PAGE_ERROR:
				this.handlePageErrorEvent(message);
				break;
			case this.messageTypes.ROOM_EVENT:
				this.handleRoomEvent(message);
				break;
			case this.messageTypes.SESSION_ERROR:
				this.handleSessionErrorEvent(message);
				break;
			case this.messageTypes.SESSION_CLOSED:
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

