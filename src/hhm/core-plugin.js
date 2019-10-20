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

Object.assign(
  window.hroomie,
  (function() {
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
      'onStadiumChange',
    ];

    var defaultHHMEvents = [
      HHM.events.PLUGIN_DISABLED,
      HHM.events.PLUGIN_ENABLED,
      HHM.events.PLUGIN_LOADED,
      HHM.events.PLUGIN_REMOVED,
    ];

    var ignoredPlugins = new Set([
      '_user/postInit',
      'hr/core',
      'hhm/core',
      'hhm/persistence',
    ]);

    registerEventHandlers();

    return {
      registerEventHandlers,
      ignoredPlugins,
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
          if (args[0].plugin) {
            const pluginData = hroomie.serializePlugin(args[0].plugin);
            if (!pluginData || ignoredPlugins.has(pluginData.name)) return;
            window.haxroomieOnHHMEvent({ eventType, pluginData });
          }
        };
      }
    }
  })()
);
