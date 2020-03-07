const CommandHandler = require('../CommandHandler');
const commandPrompt = require('../../command-prompt');
const { doesRoomHavePlayer } = require('../utils');

class AdminCommands extends CommandHandler {
  constructor({ roomContext }) {
    super();
    this.room = roomContext.room;
  }

  onCommand_admin() {
    return {
      description: 'Gives admin to a player with given id.',
      disabled: !this.room.running,
      args: ['id'],
      category: 'Room control',
      run: async id => {
        let intId = parseInt(id);
        if (isNaN(intId)) {
          commandPrompt.print('Player ID has to be a number!', 'ERROR');
          return;
        }
        let hasPlayer = await doesRoomHavePlayer(this.room, intId);
        if (!hasPlayer) {
          commandPrompt.print(`no player with id: ${intId}`, `ERROR`);
          return;
        }
        await this.room.callRoom('setPlayerAdmin', intId, true);
      },
    };
  }

  onCommand_unadmin() {
    return {
      description: 'Removes admin from a player with given id.',
      disabled: !this.room.running,
      args: ['id'],
      category: 'Room control',
      run: async id => {
        let intId = parseInt(id);
        if (isNaN(intId)) {
          commandPrompt.print('Player ID has to be a number!', 'ERROR');
          return;
        }
        let hasPlayer = await doesRoomHavePlayer(this.room, intId);
        if (!hasPlayer) {
          commandPrompt.print(`no player with id: ${intId}`, `ERROR`);
          return;
        }
        await this.room.callRoom('setPlayerAdmin', intId, false);
      },
    };
  }
}

module.exports = AdminCommands;
