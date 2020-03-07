const CommandHandler = require('../CommandHandler');
const commandPrompt = require('../../command-prompt');
const colors = require('colors/safe');

class RoleCommands extends CommandHandler {
  constructor({ roomContext }) {
    super();
    this.room = roomContext.room;
  }

  async onCommand_role() {
    let isDisabled;
    if (!this.room.running) {
      isDisabled = true;
    } else {
      isDisabled = await this.room.plugins.hasPlugin('sav/roles');
      isDisabled = !isDisabled;
    }
    return {
      description: 'Prints information and players in given role.',
      disabled: isDisabled,
      args: ['role'],
      category: 'Room control',
      run: async role => {
        const roleInfo = await this.room.roles.getRole(role, {
          offlinePlayers: true,
        });

        if (roleInfo.players.length > 0) {
          commandPrompt.print(
            `Players in the role ${colors.green(roleInfo.roleName)}:`
          );
          let players = [];
          for (let p of roleInfo.players) {
            let playerString = `nickname: ${colors.cyan(p.name)}`;
            playerString += `\n  id: ${p.id}`;
            playerString += `\n  auth: ${p.auth}`;
            players.push(playerString);
          }
          commandPrompt.print(players.join(`\n`));
        }

        commandPrompt.print(
          `Role: ${colors.cyan(roleInfo.roleName)} ` +
            `Password: ${colors.cyan(roleInfo.password)} ` +
            `Players: ${colors.cyan(roleInfo.players.length)}`,
          `ROLE INFO`
        );
      },
    };
  }

  async onCommand_addrole() {
    let isDisabled;
    if (!this.room.running) {
      isDisabled = true;
    } else {
      isDisabled = await this.room.plugins.hasPlugin('sav/roles');
      isDisabled = !isDisabled;
    }
    return {
      description: 'Adds given role to a player with given id.',
      disabled: isDisabled,
      args: ['id', 'role'],
      category: 'Room control',
      run: async (id, role) => {
        await this.room.roles.setPlayerRole(id, role, true, true);
      },
    };
  }

  async onCommand_delrole() {
    let isDisabled;
    if (!this.room.running) {
      isDisabled = true;
    } else {
      isDisabled = await this.room.plugins.hasPlugin('sav/roles');
      isDisabled = !isDisabled;
    }

    return {
      description: 'Removes given role from a player with given id.',
      disabled: isDisabled,
      args: ['id|auth', 'role'],
      category: 'Room control',
      run: async (id, role) => {
        await this.room.roles.setPlayerRole(id, role, false, true);
      },
    };
  }
}

module.exports = RoleCommands;
