/**
 * Object containing HHM plugin name and content.
 * 
 * @typedef {Object} PluginDef
 * @property {string} [name] - Plugins name. Can be overriden by the plugin
 *    itself if it defines the `pluginSpec.name` property.
 * @property {string} content - UTF-8 encoded content of the plugin.
 */

/**
 * Object containing information about a plugin.
 * 
 * @typedef {Object} PluginData
 * @property {number} id - The plugin id.
 * @property {string|number} name - The plugin name.
 * @property {boolean} isEnabled - Indicates whether the plugin is enabled or disabled.
 * @property {object} [pluginSpec] - HHM pluginSpec property.
 */

/**
 * Class for controlling Haxball Headless Manager (HHM) plugins.
 */
class PluginController {
  constructor(opt) {
    this.page = opt.page;
    this.running = false;
    this._usable = false;
  }

  /**
   * Returns loaded plugins.
   * 
   * @returns {Promise<Array.<PluginData>>} - Array of plugins.
   */
  async getPlugins() {
    let result = await this.page.evaluate(() => {
      return window.hroomie.getPlugins();
    });
    return result;
  }

  /**
   * Returns PluginData of the given plugin name.
   * 
   * @param {string} name - Name of the plugin.
   * @returns {Promise.<?PluginData>} - Data of the plugin or `null` if
   *    plugin was not found.
   */
  async getPlugin(name) {
    return this.page.evaluate((name) => {
      return window.hroomie.getPlugin(name);
    }, name);
  }

  /**
   * Enables a HHM plugin with the given name.
   * 
   * @param {string} name - Name of the plugin
   * @returns {Promise.<boolean>} - `true` if plugin was enabled, `false` otherwise.
   */
  async enablePlugin(name) {
    return this.page.evaluate((name) => {
      return window.hroomie.enablePlugin(name);
    }, name);
  }

  /**
   * Disables a HHM plugin with the given name. 
   * 
   * If the name is an Array then
   * it disables all the plugins in the given order.
   * 
   * @param {(string|Array.<string>)} name - Name or array of names of the plugin(s).
   * @param {boolean} [force=false] - If true all the plugins that depend on
   *    the plugin will get disabled also.
   * @returns {Promise.<boolean>} - Was the plugin disabled or not?
   */
  async disablePlugin(name, force=false) {
    if (!force) {
      return this.page.evaluate(async (name) => {
        return window.hroomie.disablePlugin(name);
      }, name);

    } else {
      let depPlugins = await this.getPluginsThatDependOn(name);
      return this.page.evaluate(async (name, depPlugins) => {
        if (depPlugins && depPlugins.length > 0) {
          await window.hroomie.disablePlugin(depPlugins.map((p) => p.name));
        }
        return window.hroomie.disablePlugin(name);
      }, name, depPlugins);
    }
  }

  /**
   * Gets a list of plugins that depend on the given plugin.
   * 
   * @param {string} name - name of the plugin
   * @returns {Promise<Array.<PluginData>>} - array of plugins
   */
  async getPluginsThatDependOn(name) {

    return this.page.evaluate((name) => {
      return window.hroomie.getDependentPlugins(name);
    }, name);
  }

  /**
   * Checks if the room has a plugin with given name loaded.
   * @param {string} name - Name of the plugin.
   * @returns {Promise.<boolean>} - `true` if it had the plugin, `false` if not.
   */
  async hasPlugin(name) {
    return this.page.evaluate(async (name) => {
      return HHM.manager.hasPluginByName(name);
    }, name);
  }

  /**
   * Adds a new plugin.
   * 
   * If the `plugin` is `string`, then it will be loaded from the available
   * repositories.
   * 
   * If the `plugin` is [PluginDef]{@link PluginDef}, then it will be loaded
   * from contents of `PluginDef`.
   * 
   * @param {string|PluginDef} plugin - Plugins name if loading from repositories
   *    or plugin definition if loading it from a string.
   * @returns {Promise.<number>} - Plugin ID if the plugin and all of its dependencies
   *    have been loaded, -1 otherwise.
   */
  async addPlugin(plugin) {
    if (!plugin) {
      throw new TypeError('Missing required argument: plugin');
    }

    if (typeof plugin === 'string') {
      return this.page.evaluate(async (name) => {
        return HHM.manager.addPluginByName(name);
      }, plugin);
    }

    if (!plugin.content) {
      throw new TypeError('PluginDef is missing required property: content');
    }

    return this.page.evaluate(async (plugin) => {
      return HHM.manager.addPluginByCode(plugin.content, plugin.name);
    }, plugin);
  }

  /**
   * Sets the rooms plugin config.
   * 
   * Tries to load plugins that are not loaded from the available
   * repositories.
   * 
   * **Plugins will not get unloaded using this method.**
   * 
   * If `pluginName` is given then only config for the given plugin
   * is set.
   * @param {object} pluginConfig - Room wide config or plugins config.
   * @param {string} [pluginName] - Name of the plugin if wanting to change
   *    config of only one plugin.
   */
  async setPluginConfig(pluginConfig, pluginName) {
    if (!pluginConfig) {
      throw new TypeError('Missing required argument: pluginConfig');
    }
    if (typeof pluginConfig !== 'object') {
      throw new TypeError('typeof pluginConfig should be object');
    }
    
    if (typeof pluginName === 'string') {
      await this.page.evaluate(async (pluginName, pluginConfig) => {

        let pluginId = HHM.manager.getPluginId(pluginName);
        
        if (pluginId < 0) {
          pluginId = await HHM.manager.addPluginByName(pluginName);
          if (pluginId < 0) {
            throw new Error(
              `Cannot load plugin "${pluginName}" from available repositories.`
            );
          }
        } 
        HHM.manager.setPluginConfig(pluginId, pluginConfig);

      }, pluginName, pluginConfig);
      return;
    }

    // change the whole plugin config for the room
    for (let [name, config] of Object.entries(pluginConfig)) {
      await this.page.evaluate(async (name, config) => {

        const manager = window.HHM.manager;

        let pluginId = manager.getPluginId(name);
        
        if (pluginId < 0) {
          pluginId = await manager.addPluginByName(name);
          if (pluginId < 0) {
            return;
          }
        }
        manager.setPluginConfig(pluginId, config);

      }, name, config);
    }    
  }

  /**
   * Returns the plugin config for all loaded plugins in the room or
   * if `pluginName` is given, then return the config for that plugin.
   * 
   * @param {string} [pluginName] - The name of the plugin.
   * @returns {Promise.<object>} - The config object of plugin(s).
   */
  async getPluginConfig(pluginName) {
    if (typeof pluginName === 'string') {
      let config = await this.page.evaluate((pluginName) => {

        let plugin = HHM.manager.getPluginByName(pluginName);
        if (!plugin) {
          throw new TypeError(`Invalid plugin "${pluginName}".`);
        }

        return plugin.getConfig();
      }, pluginName);
      return config;
    }

    let config = await this.page.evaluate(() => {
      let plugins = HHM.manager.getLoadedPluginIds().map(id => {
        return HHM.manager.getPluginById(id);
      });
      let cfg = {};
      for (let plugin of plugins) {
        cfg[plugin] = plugin.getConfig();
      }
      return cfg;
    });
    return config;
  }

}

module.exports = PluginController;