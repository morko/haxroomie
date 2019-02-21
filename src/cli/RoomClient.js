const EventHandler = require('./EventHandler');
const CommandPrompt = require('./CommandPrompt');
const commands = require('./commands');


module.exports = class RoomClient {
	constructor(id, session) {
		this.id = id;
		this.session = session;
		
		this.actionFactory = require('haxroomie-action-factory')(this.id);
		this.eventHandler = this.createEventHandler(this.session);
		this.commands = commands(this.session);
		this.commandPrompt = this.createPrompt(this.commands, this.eventHandler);

		this.eventHandler.on(`open-room-error`, () => process.exit(1));
	}

	async openRoom(roomConfig) {
		try {
			await this.session.openRoom(roomConfig);
		} catch (err) {
			this.commandPrompt.send('OPEN_ROOM_ERROR', err.stack);
			process.exit(1);
		}
	}

	createEventHandler(session) {
		let handler = new EventHandler();
		session.subscribe(this.id, (message) => handler.handle(message));
		return handler;
	}

	createPrompt(commands, eventHandler) {
		return new CommandPrompt({
			commands: commands,
			eventHandler: eventHandler
		});
	}
}