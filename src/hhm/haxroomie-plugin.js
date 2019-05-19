/**
 * This is a Haxball Headless Manager plugin for haxroomie to be able to send
 * the room events from browser to the haxroomie, call functions in the
 * roomObject and act as an adaptor between haxroomie and HHM.
 * 
 * Haxroomie exposes a function as window.sendToHaxroomie that the browser 
 * scripts can use to send messages to haxroomie.
 */
let room = HBInit();

room.pluginSpec = {
  name: `hr/core`,
  author: `salamini`,
  version: `1.0.0`,
  config: {},
  dependencies: [],
  order: {},
  incompatible_with: [],
};

window.hroomie = window.hroomie || {};

Object.assign(window.hroomie, (function(){

  /**
   * List of default roomObject event handlers that the plugin will send 
   * to the main process.
  */
  var defaultRoomEventHandlers = [
    'onPlayerJoin',
    'onPlayerLeave',
    'onTeamVictory',
    'onPlayerChat',
    'onTeamGoal',
    'onGameStart',
    'onGameStop',
    'onPlayerAdminChange',
    'onPlayerTeamChange',
    'onPlayerKicked',
    'onGamePause',
    'onGameUnpause',
    'onPositionsReset',
    'onStadiumChange'
  ];

  var defaultHHMEvents = [
    window.HHM.events.PLUGIN_DISABLED,
    window.HHM.events.PLUGIN_ENABLED,
    window.HHM.events.PLUGIN_LOADED,
    window.HHM.events.PLUGIN_REMOVED,
  ];

  var ignoredPlugins = new Set([
    '_user/postInit',
    'hr/core',
    'hr/kickban',
    'hhm/core',
    'hhm/persistence'
  ]);

  registerEventHandlers();
  
  return {
    callRoom,
    getPluginById,
    getPlugin,
    getPlugins,
    enablePlugin,
    disablePlugin,
    getDependentPlugins
  };
  
  /**
   * Registers handlers for the HaxBall roomObject and for the HHM manager
   * events. Send all events to the main context of haxroomie.
   *
   * @param {Array.<string>} roomEventHandlers - handler names to attach 
   *    listeners for
   */  
  function registerEventHandlers(roomEventHandlers) {
    roomEventHandlers = roomEventHandlers || defaultRoomEventHandlers;

    // send roomObject events to the main context
    for (let handlerName of roomEventHandlers) {
      room[handlerName] = function(...args) {
        window.haxroomieOnRoomEvent({ handlerName, args });
      };
    }
  
    // send HHM events to the main context
    for (let eventType of defaultHHMEvents) {
      room[`onHhm_${eventType}`] = function(...args) {
        // get the plugin data
        let plugin = args[0].plugin || {};
        let pluginSpec = plugin.pluginSpec || {};
        let pluginName = pluginSpec.name || '';
        if (!pluginName || ignoredPlugins.has(pluginName)) return;
        let pluginData = getPlugin(pluginName);

        if (!pluginData) return;
        window.haxroomieOnHHMEvent({ eventType, pluginData });
      };
    }
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
    if (typeof room[fn] !== 'function') {
      return {
        type: 'CALL_ROOM_RESULT',
        payload: `room.${fn} is not a function`,
        error: true,
      };
    }
    
    let result = room[fn](...args);
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
    let name = HHM.manager.getPluginName(id);
    if (!name) return null;
    const plugin = room.getPlugin(name);
    let pluginData = {
      id: id,
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
    const plugin = room.getPlugin(name);
    if (!plugin) return null;
    let pluginData = {
      id: plugin._id,
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
      return !ignoredPlugins.has(name);
    });
  return plugins;
  }

  /**
   * Enables a plugin with given name.
   * 
   * @param {string} - name of the plugin
   */
  function enablePlugin(name) {
    const plugin = room.getPlugin(name);
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
        const plugin = room.getPlugin(name[i]);
        const success = HHM.manager.disablePluginById(plugin._id);
        if (!success) {
          for (let j = 0; j <= i; j++) {
            const plugin = room.getPlugin(name[i - j]);
            HHM.manager.enablePluginById(plugin._id);
          }
          return false;
        }
      }
      return true;
    }
    const plugin = room.getPlugin(name);
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