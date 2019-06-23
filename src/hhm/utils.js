/**
 * This module contains utility/helper functions that should be loaded to the
 * browser context before loading the HHM config.
 */
window.hroomie = window.hroomie || {};

Object.assign(window.hroomie, (function(){

  return {
    isObject,
    mergeDeep,
    callRoom,
    getPluginById,
    getPlugin,
    getPlugins,
    enablePlugin,
    disablePlugin,
    getDependentPlugins,
  };

  /**
   * Source from <https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge>
   * Simple object check.
   * @param item
   * @returns {boolean}
   */
  function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
  }

  /**
   * Source from <https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge>
   * Deep merge two objects.
   * @param target
   * @param ...sources
   */
  function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const isObject = window.hroomie.isObject;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} });
          mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, { [key]: source[key] });
        }
      }
    }

    return mergeDeep(target, ...sources);
  }

  /**
   * This function can be used to call functions of the haxball headless host
   * roomObject from the main context.
   * 
   * @param {string} fn - function name to be called
   * @param {...any} args - arguments for the function
   * 
   * @returns {object} - haxroomie message object without the sender id
   */
  function callRoom(fn, ...args) {
    if (typeof HHM.manager.room[fn] !== 'function') {
      return {
        type: 'CALL_ROOM_RESULT',
        payload: `room.${fn} is not a function`,
        error: true,
      };
    }
    
    let result = HHM.manager.room[fn](...args);
    return {
      type: 'CALL_ROOM_RESULT',
      payload: {
        fn: fn,
        result: result
      }
    };
  }

  /**
   * Returns PluginData of HHM plugin with the given id or null if not found.
   * 
   * @param {number} - id of the plugin
   * @returns {PluginData|null} - data of plugin or null
   */
  function getPluginById(id) {
    const plugin = HHM.manager.getPluginById(id);
    if (!plugin) return null;
    let pluginData = {
      id: id,
      name: plugin.pluginSpec ? plugin.pluginSpec.name : undefined,
      isEnabled: plugin.isEnabled(),
      pluginSpec: plugin.pluginSpec
    }
    return pluginData;
  }

  /**
   * Returns PluginData of HHM plugin with the given name or null if not found.
   * 
   * @param {string} - name of the plugin
   * @returns {PluginData|null} - data of plugin or null
   */
  function getPlugin(name) {
    const plugin = HHM.manager.getPluginByName(name);
    if (!plugin) return null;
    let pluginData = {
      id: plugin._id,
      name: plugin.pluginSpec ? plugin.pluginSpec.name : undefined,
      isEnabled: plugin.isEnabled(),
      pluginSpec: plugin.pluginSpec
    }
    return pluginData;
  }

  /**
   * Returns array of PluginData objects containing plugins that have been
   * loaded into HHM.
   * 
   * @returns {Array.<PluginData>} - array of laoded plugins
   */
  function getPlugins() {
    let plugins = HHM.manager.getLoadedPluginIds()
      .map(id => this.getPluginById(id))
      .filter(pluginData => {
        const name = pluginData.pluginSpec.name;
        // ignore these plugins
        if (!window.hroomie.ignoredPlugins) return true;
        return !window.hroomie.ignoredPlugins.has(name);
      });
    return plugins;
  }

  /**
   * Enables a plugin with given name.
   * 
   * @param {string} - name of the plugin
   * @returns {boolean} - `true` if plugin was enabled, `false` otherwise.
   */
  function enablePlugin(name) {
    const plugin = HHM.manager.getPluginByName(name);
    return HHM.manager.enablePluginById(plugin._id);
  }

  /**
   * Disables a HHM plugin with the given id. If the name is an Array then
   * it disables all the plugins in the given order.
   * 
   * @param {string|Array} name - name or array of names of the plugin(s)
   * @returns {boolean} - False if plugin could not be disabled because some
   *    other plugins depend on it. If name is array and some of the plugins
   *    could not be disabled, then it leaves every plugin enabled.
   */
  function disablePlugin(name) {
    if (Array.isArray(name)) {
      for (let i = 0; i < name.length; i++) {
        const plugin = HHM.manager.getPluginByName(name[i]);
        const success = HHM.manager.disablePluginById(plugin._id);
        if (!success) {
          for (let j = 0; j <= i; j++) {
            const plugin = HHM.manager.getPluginByName(name[i - j]);
            HHM.manager.enablePluginById(plugin._id);
          }
          return false;
        }
      }
      return true;
    }
    const plugin = HHM.manager.getPluginByName(name);
    return HHM.manager.disablePluginById(plugin._id);
  }

  /**
   * Gets the plugins that depend on the given plugin.
   * 
   * @returns {Array.<PluginData>} - array of dependent plugins
   */
  function getDependentPlugins(name) {
    const pluginId = HHM.manager.getPluginId(name);
    return HHM.manager.getDependentPluginsById(pluginId)
      .map(id => getPluginById(id));
  }

})());