const ActionHandler = require('./ActionHandler');
const CommandPrompt = require('./CommandPrompt');
const commands = require('./commands');


module.exports = class RoomClient {
	constructor(id, session) {
		this.id = id;
		this.session = session;
		
		this.actionFactory = require('haxroomie-action-factory')(this.id);
		this.actionHandler = this.createActionHandler(this.session);
		this.commands = commands(this.session);
		this.commandPrompt = this.createPrompt(this.commands, this.actionHandler);

		this.actionHandler.on(`open-room-error`, () => process.exit(1));
	}

	openRoom(roomConfig) {
		this.session.sendToRoom(this.actionFactory.create(
			'OPEN_ROOM', 
			{ roomConfig: roomConfig 	}
		));	
	}

	createActionHandler(session) {
		let handler = new ActionHandler();
		session.subscribe(this.id, (action) => handler.handle(action));
		return handler;
	}

	createPrompt(commands, actionHandler) {
		return new CommandPrompt({
			commands: commands,
			actionHandler: actionHandler
		});
	}
}