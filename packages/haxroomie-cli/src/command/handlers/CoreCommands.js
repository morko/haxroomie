const CommandHandler = require('../CommandHandler');
const commandPrompt = require('../../command-prompt');
const { spawnSync, execSync } = require('child_process');
const commandExists = require('command-exists');

class CoreCommands extends CommandHandler {
  constructor({ roomContext }) {
    super();

    this.room = roomContext.room;
    this.haxroomie = roomContext.haxroomie;
    this.createRoom = roomContext.createRoom;
  }

  onCommand_init() {
    return {
      description: `Tries to reinitialize if room goes to an unusable state.`,
      args: ['id'],
      category: 'Advanced commands',
      run: async (id) => {
        await this.haxroomie.removeRoom(id);
        await this.createRoom(id);
      },
    };
  }

  onCommand_eval() {
    return {
      description:
        `Evaluates JavaScript in the browser and ` +
        `returns value of first expression. The roomObject is accessible ` +
        `as "room". e.g. eval room.getPlayerList().`,
      args: ['line'],
      category: 'Advanced commands',
      run: async (line) => {
        try {
          let result = await this.room.eval(
            new Function(`const room = HHM.manager.room; return ` + line)
          );
          result = JSON.stringify(result, null, 2);
          commandPrompt.print(result);
        } catch (err) {
          commandPrompt.error(err);
        }
        return true;
      },
    };
  }
  async onCommand_min() {
    let disabled = true;
    try {
      await commandExists('tmux');
      const haxroomieSessionExists = execSync('tmux ls')
        .toString()
        .split('\n')
        .some((line) => line.startsWith('haxroomie'));

      if (haxroomieSessionExists) {
        disabled = false;
      }
    } catch (err) {
      // tmux command did not exist
    }

    return {
      description: 'Minimize haxroomie but keep rooms running.',
      category: 'Haxroomie control',
      disabled,
      run: async () => {
        commandPrompt.print('Minimizing the window');
        spawnSync('tmux', ['detach-client', '-s', 'haxroomie']);
      },
    };
  }

  onCommand_q() {
    return {
      description: 'Closes all rooms and exits the program.',
      category: 'Haxroomie control',
      run: async () => {
        await this.haxroomie.closeBrowser();
        process.exit(0);
      },
    };
  }
}
module.exports = CoreCommands;
