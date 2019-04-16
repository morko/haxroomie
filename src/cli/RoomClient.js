const MessageHandler = require(`./MessageHandler`);
const CommandPrompt = require(`./CommandPrompt`);
const commands = require(`./commands`);

module.exports = class RoomClient {
	constructor(id, session) {
		this.id = id;
		this.session = session;
		
		this.messageHandler = this.createMessageHandler(this.session);
		this.commands = commands(this.session);
		this.commandPrompt = this.createPrompt(this.commands, this.messageHandler);

		this.messageHandler.on(`open-room-error`, () => {
			process.exit(1);
		});
		this.messageHandler.on(`session-closed`, () => {
			process.exit(0);
		});
		this.messageHandler.on(`session-error`, () => {
			process.exit(1);
		});
	}

	async openRoom(roomConfig) {
		try {
			await this.session.openRoom(roomConfig);
		} catch (err) {
			this.commandPrompt.print(err.stack, `OPEN_ROOM_ERROR`);
			process.exit(1);
		}
	}

	createMessageHandler(session) {
		let handler = new MessageHandler({
			messageTypes: session.messageTypes
		});
		session.subscribe(this.id, (message) => handler.handle(message));
		return handler;
	}

	createPrompt(commands, messageHandler) {
		return new CommandPrompt({
			commands: commands,
			messageHandler: messageHandler
		});
	}
}