const CommandHandler = require('../CommandHandler');
const commandPrompt = require('../../command-prompt');
const { doesRoomHavePlayer } = require('../utils');

class KickBanCommands extends CommandHandler {
  constructor({ roomContext }) {
    super();
    this.room = roomContext.room;
  }

  onCommand_kick() {
    return {
      description: 'Kicks a player with given id.',
      disabled: !this.room.running,
      args: ['id'],
      category: 'Room control',
      run: async (id) => {
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
        await this.room.callRoom('kickPlayer', intId, 'Bye!', false);
      },
    };
  }

  onCommand_ban() {
    return {
      description: 'Bans a player with given id.',
      disabled: !this.room.running,
      args: ['id'],
      category: 'Room control',
      run: async (id) => {
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
        await this.room.callRoom('kickPlayer', intId, 'Bye!', true);
      },
    };
  }

  onCommand_unban() {
    return {
      description: 'Removes a ban of player with given id.',
      disabled: !this.room.running,
      args: ['id'],
      category: 'Room control',
      run: async (id) => {
        let intId = parseInt(id);
        if (isNaN(intId)) {
          commandPrompt.print('Player ID has to be a number!', 'ERROR');
          return;
        }
        await this.room.callRoom('clearBan', intId);
      },
    };
  }

  async onCommand_banlist() {
    let isDisabled;
    if (!this.room.running) {
      isDisabled = true;
    } else {
      isDisabled = await this.room.plugins.hasPlugin('hr/kickban');
      isDisabled = !isDisabled;
    }

    return {
      description: 'Prints banned players.',
      disabled: isDisabled,
      category: 'Room control',
      run: async () => {
        let bannedPlayers = await this.room.eval(() => {
          return HHM.manager.getPlugin('hr/kickban').bannedPlayers();
        });
        if (bannedPlayers.length === 0) {
          commandPrompt.print('No banned players.');
          return;
        }
        bannedPlayers = bannedPlayers.map((p) => `id:${p.id} - ${p.name}`);
        commandPrompt.print(bannedPlayers.join('\n'));
      },
    };
  }

  onCommand_clearbans() {
    return {
      description: 'Clears all the bans.',
      disabled: !this.room.running,
      category: 'Room control',
      run: async () => {
        await this.room.callRoom('clearBans');
      },
    };
  }
}
module.exports = KickBanCommands;
