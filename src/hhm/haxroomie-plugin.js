/**
 * This is a haxball headless manager plugin for haxroomie to be able to send
 * the room events from browser to the haxroomie, call functions in the
 * roomObject and act as an adaptor between haxroomie and HHM.
 * 
 * Haxroomie exposes a function as window.sendToHaxroomie that the browser 
 * scripts can use to send actions to haxroomie.
 * 
 * window.hroomie.registerHandlers is called from haxroomie to register the
 * handlers for roomObject and HHM events.
 */
let room = HBInit();

room.pluginSpec = {
  name: `salamini/haxroomie`,
  author: `salamini`,
  version: `1.0.0`,
  config: {},
  dependencies: [],
  order: {},
  incompatible_with: [],
};


window.hroomie = (function(){

  /**
   * List of default roomObject event handlers that the plugin will send 
   * to the main process.
  */
  var defaultEventHandlers = [
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
  
  return {
    registerHandlers,
    callRoom,
    getPluginById,
    getPlugin,
    getPlugins,
    enablePlugin,
    disablePlugin
  };
    
  /**
   * Registers handlers for the HaxBall roomObject and for the HHM manager
   * that send the events to the main context of haxroomie.
   *
   * @param {Array.<string>} eventHandlers - handler names to listen for
   */  
  function registerHandlers(eventHandlers) {
    eventHandlers = eventHandlers || defaultEventHandlers;

    // send all roomObject events to the main context
    for (let handlerName of eventHandlers) {
      room[handlerName] = function(...args) {
        window.sendToHaxroomie({
          type: 'ROOM_EVENT',
          payload: { handlerName: handlerName, args: args }
        });
      };
    }
  
    // send all HHM events to the main context
    const eventTypes = Object.keys(window.HHM.events).map(e => window.HHM.events[e]);
    for (let eventType of eventTypes) {
      window.HHM.manager.registerEventHandler((args) => {
        window.sendToHaxroomie({
          type: 'HHM_EVENT',
          payload: { eventType: eventType, args: args }
        });
      }, [eventType]);
    }
  }

  /**
   * This function can be used to call functions of the haxball headless host
   * roomObject from the main context.
   * 
   * @param {string} fn - function name to be called
   * @param {...any} args - arguments for the function
   * 
   * @returns {Action} - haxroomie action object without the sender id
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
      return (
        name !== '_user/postInit' 
        && name !== 'salamini/haxroomie'
      );
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
   * Disables a plugin with given name.
   * 
   * @param {string} - name of the plugin
   * @returns {boolean} - false if plugin could not be disabled because some
   *    other plugins depend on it
   */
  function disablePlugin(name) {
    const plugin = room.getPlugin(name);
    return HHM.manager.disablePluginById(plugin._id);
  }
})();