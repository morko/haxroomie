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
  }

  /**
   * Returns loaded plugins.
   *
   * @returns {Promise<Array.<PluginData>>} - Array of plugins.
   */
  async getPlugins() {
    let result = await this.page.evaluate(() => {
      let plugins = HHM.manager
        .getLoadedPluginIds()
        .map(id => hroomie.serializePlugin(id))
        .filter(pluginData => {
          const name = pluginData.pluginSpec.name;
          // ignore these plugins
          if (!hroomie.ignoredPlugins) return true;
          return !hroomie.ignoredPlugins.has(name);
        });
      return plugins;
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
    return this.page.evaluate(name => {
      const plugin = HHM.manager.getPlugin(name);
      return hroomie.serializePlugin(plugin);
    }, name);
  }

  /**
   * Enables a HHM plugin with the given name.
   *
   * @param {string} name - Name of the plugin
   * @returns {Promise.<boolean>} - `true` if plugin was enabled, `false` otherwise.
   */
  async enablePlugin(name) {
    return this.page.evaluate(name => {
      return HHM.manager.enablePlugin(name);
    }, name);
  }

  /**
   * Disables a HHM plugin with the given name.
   *
   * If the name is an Array then
   * it disables all the plugins in the given order.
   *
   * @param {(string|Array.<string>)} name - Name or array of names of the plugin(s).
   * @param {boolean} [recursive=false] - If true all the plugins that depend on
   *    the plugin will get disabled also.
   * @returns {Promise.<boolean>} - Was the plugin disabled or not?
   */
  async disablePlugin(name, recursive = false) {
    return this.page.evaluate(
      async (name, recursive) => {
        const { manager } = HHM;

        if (Array.isArray(name)) {
          for (let i = 0; i < name.length; i++) {
            const success = manager.disablePlugin(name[i], recursive);
            if (!success) {
              for (let j = 0; j <= i; j++) {
                manager.enablePlugin(name[i - j]);
              }
              return false;
            }
          }
          return true;
        }
        return HHM.manager.disablePlugin(name, recursive);
      },
      name,
      recursive
    );
  }

  /**
   * Gets a list of plugins that depend on the given plugin.
   *
   * @param {string} name - Name or id of the plugin.
   * @param {boolean} [recursive=true] - Finds indirect dependencies also.
   * @param {boolean} [includeDisabled=false] - Include disabled plugins
   * @returns {Promise<Array.<PluginData>>} - Array of plugins.
   */
  async getPluginsThatDependOn(
    name,
    recursive = true,
    includeDisabled = false
  ) {
    return this.page.evaluate(
      (name, recursive, includeDisabled) => {
        return HHM.manager
          .getDependentPlugins(name, recursive, includeDisabled)
          .map(id => hroomie.serializePlugin(id));
      },
      name,
      recursive,
      includeDisabled
    );
  }

  /**
   * Checks if the room has a plugin with given name loaded.
   * @param {string} name - Name of the plugin.
   * @returns {Promise.<boolean>} - `true` if it had the plugin, `false` if not.
   */
  async hasPlugin(name) {
    return this.page.evaluate(async name => {
      return HHM.manager.hasPlugin(name);
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
   * @param {string|PluginDef} plugin - Plugins name if loading from
   *    repositories or plugin definition if loading it from an object.
   * @param {object} [pluginConfig] - Configuration options for the plugin.
   * @returns {Promise.<number>} - Plugin ID if the plugin and all of its dependencies
   *    have been loaded, -1 otherwise.
   */
  async addPlugin(plugin, pluginConfig) {
    if (!plugin) {
      throw new TypeError('Missing required argument: plugin');
    }

    if (typeof plugin === 'string') {
      return this.page.evaluate(
        async (name, pluginConfig) => {
          let id = HHM.manager.addPlugin({ pluginName: name });
          if (id >= 0 && pluginConfig) {
            HHM.manager.setPluginConfig(id, pluginConfig);
          }
          return id;
        },
        plugin,
        pluginConfig
      );
    }

    if (!plugin.content) {
      throw new TypeError('PluginDef is missing required property: content');
    }

    return this.page.evaluate(async plugin => {
      let id = HHM.manager.addPlugin({
        pluginCode: plugin.content,
        pluginName: plugin.name,
      });
      if (id >= 0 && pluginConfig) {
        HHM.manager.setPluginConfig(id, pluginConfig);
      }
      return id;
    }, plugin);
  }

  /**
   * Removes a plugin.
   *
   * @param {string} pluginName - Plugins name.
   * @param {boolean} [safe=true] - Remove plugin safely (see HHM
   *    PluginManager#removePlugin).
   * @returns {Promise.<boolean>} - Whether the removal was successful.
   */
  async removePlugin(pluginName, safe = true) {
    if (!pluginName) {
      throw new TypeError('Missing required argument: pluginName');
    }

    return this.page.evaluate(
      async (pluginName, safe) => {
        let id = HHM.manager.getPluginId(pluginName);
        return HHM.manager.removePlugin(id, safe);
      },
      pluginName,
      safe
    );
  }

  /**
   * Sets the rooms plugin config.
   *
   * Tries to load plugins that are not loaded from the available
   * repositories and removes the loaded plugins that are not in the given
   * config.
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

    // Set the config for one plugin if plugins name is given.
    if (typeof pluginName === 'string') {
      await this.page.evaluate(
        async (pluginName, pluginConfig) => {
          let pluginId = HHM.manager.getPluginId(pluginName);

          if (pluginId < 0) {
            pluginId = await HHM.manager.addPlugin({ pluginName });
            if (pluginId < 0) {
              throw new Error(
                `Cannot load plugin "${pluginName}" from available repositories.`
              );
            }
          }
          HHM.manager.setPluginConfig(pluginId, pluginConfig);
        },
        pluginName,
        pluginConfig
      );
      return;
    }

    // Change the configs for all the plugins if no plugin name is given.
    for (let [name, config] of Object.entries(pluginConfig)) {
      await this.page.evaluate(
        async (name, config) => {
          const { manager } = HHM;

          let pluginId = manager.getPluginId(name);

          if (pluginId < 0) {
            pluginId = await manager.addPlugin({ pluginName: name });
            if (pluginId < 0) {
              return;
            }
          }
          manager.setPluginConfig(pluginId, config);
        },
        name,
        config
      );
    }

    await this.prunePlugins({ pluginConfig });
  }

  /**
   * Removes the plugins that are not in the given `pluginConfig`.
   *
   * Goes over the loaded plugins that are not in the pluginConfig and
   * checks if they are a direct or indirect dependency of one of the plugins
   * listed in the pluginConfig and remove them if not.
   * @private
   */
  async prunePlugins({ pluginConfig }) {
    const loadedPlugins = await this.getPlugins();

    for (let plugin of loadedPlugins) {
      if (Object.prototype.hasOwnProperty.call(pluginConfig, plugin.name)) {
        continue;
      }

      let dependentPlugins = await this.getPluginsThatDependOn(
        plugin.name,
        true,
        true
      );

      let shouldBeRemoved = true;
      for (let dependent of dependentPlugins) {
        if (!dependent) continue;
        if (
          Object.prototype.hasOwnProperty.call(pluginConfig, dependent.name)
        ) {
          shouldBeRemoved = false;
          break;
        }
      }
      if (shouldBeRemoved) {
        await this.disablePlugin(plugin.name, true);
        await this.removePlugin(plugin.name, false);
      }
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
      let config = await this.page.evaluate(pluginName => {
        let plugin = HHM.manager.getPlugin(pluginName);
        if (!plugin) {
          throw new TypeError(`Invalid plugin "${pluginName}".`);
        }

        return plugin.getConfig();
      }, pluginName);
      return config;
    }

    let config = await this.page.evaluate(() => {
      let plugins = HHM.manager.getLoadedPluginIds().map(id => {
        return HHM.manager.getPlugin(id);
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
