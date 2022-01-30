const CommandHandler = require('../CommandHandler');
const commandPrompt = require('../../command-prompt');
const { pluginDataToString } = require('../utils');
const colors = require('colors/safe');

class PluginCommands extends CommandHandler {
  constructor({ roomContext }) {
    super();
    this.room = roomContext.room;
  }

  onCommand_plugins() {
    return {
      description: 'Prints available plugins.',
      disabled: !this.room.running,
      category: 'Plugin control',
      run: async () => {
        let plugins = await this.room.plugins.getPlugins();
        let pluginList = [];
        for (let p of plugins) {
          const isEnabled = p.isEnabled
            ? `${colors.green(`enabled`)}`
            : `${colors.yellow(`disabled`)}`;
          pluginList.push(`${p.pluginSpec.name} (${isEnabled})`);
        }
        commandPrompt.print(pluginList.join(`\n`));
      },
    };
  }

  onCommand_plugin() {
    return {
      description: 'Prints detailed information about given plugin name.',
      disabled: !this.room.running,
      args: ['name'],
      category: 'Plugin control',
      run: async (name) => {
        let plugin = await this.room.plugins.getPlugin(name);
        commandPrompt.print(pluginDataToString(plugin));
      },
    };
  }

  onCommand_enable() {
    return {
      description: 'Enables the plugin with given name.',
      disabled: !this.room.running,
      args: ['name'],
      category: 'Plugin control',
      run: async (name) => {
        let pluginData = await this.room.plugins.getPlugin(name);
        if (!pluginData) {
          commandPrompt.print(`Invalid plugin name: ${name}`, `ERROR`);
          return;
        }
        await this.room.plugins.enablePlugin(name);
      },
    };
  }

  onCommand_disable() {
    return {
      description: 'Disables the plugin with given name.',
      disabled: !this.room.running,
      args: ['name'],
      category: 'Plugin control',
      run: async (name) => {
        let pluginData = await this.room.plugins.getPlugin(name);
        if (!pluginData) {
          commandPrompt.print(`Invalid plugin name: ${name}`, `ERROR`);
          return;
        }
        let disabledPlugins = await this.room.plugins.disablePlugin(name, true);
        pluginData = await this.room.plugins.getPlugin(name);

        if (disabledPlugins.length < 1) {
          commandPrompt.print(`Could not disable ${name}`, `ERROR`);
        }
      },
    };
  }

  onCommand_dependsof() {
    return {
      description: 'Prints the plugins that depend of given plugin.',
      disabled: !this.room.running,
      args: ['name'],
      category: 'Plugin control',
      run: async (name) => {
        let plugins = await this.room.plugins.getPluginsThatDependOn(name);
        if (!plugins || plugins.length < 1) {
          commandPrompt.print(
            `Plugin ${name} has no plugins that depend on it.`
          );
          return;
        }
        let result = [`Plugins that depend on ${name}:`];
        for (let p of plugins) {
          result.push(`${p.pluginSpec.name}`);
        }
        commandPrompt.print(result.join(`\n`));
      },
    };
  }
}

module.exports = PluginCommands;
