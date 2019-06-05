/**
 * This is a Haxball Headless Manager plugin for Haxroomie that handles sending
 * the room events from browser to Haxroomie.
 * 
 * Haxroomie exposes two functions as window.haxroomieOnRoomEvent
 * and window.haxroomieOnHHMEvent that can be used to send event data to
 * the Haxroomie from the browser context.
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
    registerEventHandlers,
    ignoredPlugins
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
        let pluginData = window.hroomie.getPlugin(pluginName);

        if (!pluginData) return;
        window.haxroomieOnHHMEvent({ eventType, pluginData });
      };
    }
  }
})());