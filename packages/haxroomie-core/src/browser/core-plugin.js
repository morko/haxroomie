/* global haxroomie */
/**
 * This is a Haxball Headless Manager plugin for Haxroomie that handles sending
 * the room events from browser to Haxroomie.
 *
 * Haxroomie exposes functions window.haxroomieOnRoomEvent
 * and window.haxroomieOnHHMEvent that can be used to send event data to
 * the Haxroomie from the browser context.
 */
let room = HBInit();

room.pluginSpec = {
  name: `hr/core`,
  author: `salamini`,
  version: `1.1.0`,
  config: {},
  dependencies: [],
  order: {},
  incompatible_with: [],
};

Object.assign(
  window.haxroomie,
  (function () {
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
        room[handlerName] = function (...args) {
          haxroomie.send({
            type: 'ROOM_EVENT',
            payload: { handlerName, args },
          });
        };
      }

      room.onPlayerJoin = (player) => {
        room.sendAnnouncement(
          'This room is running on Haxroomie. Haxroomie stands for peace ' +
            'and solidarity against tyranny.',
          player.id,
          0x0057b7,
          'bold'
        );
        room.sendAnnouncement(
          '“I know not with what weapons World War III will be fought, but ' +
            'World War IV will be fought with sticks and stones.” ' +
            '- Albert Einstein',
          player.id,
          0xffdd00,
          'bold'
        );
      };

      // send HHM events to the main context
      for (let eventType of defaultHHMEvents) {
        room[`onHhm_${eventType}`] = function (...args) {
          if (args[0].plugin) {
            const pluginData = haxroomie.serializePlugin(args[0].plugin);
            if (!pluginData || ignoredPlugins.has(pluginData.name)) return;
            haxroomie.send({
              type: 'HHM_EVENT',
              payload: { eventType, pluginData },
            });
          }
        };
      }
    }
  })()
);
