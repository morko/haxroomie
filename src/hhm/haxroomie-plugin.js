/**
 * This is a haxball headless manager plugin for haxroomie to be able to send
 * the room events from browser to the haxroomie.
 * 
 * The "main process" exposes a function to the browser context called
 * hrSend that the browser context can use to send actions to haxroomie.
 * 
 * hrRegisterHandlers is called from haxroomie and it registers handlers
 * for the actions that haxroomie sends.
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

/**
 * List of default room event handlers that the plugin will send to the main process.
*/
defaultEventHandlers = [
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

/**
 * Sets handlers listed in eventHandlers to the trapped HaxBall roomObject.
 *
 * The handlers wrap the event in haxroomie action Object without the sender
 * id. RoomController sets the sender when it receives the action.
 */
window.hrRegisterHandlers = function hrRegisterHandlers(eventHandlers) {
  eventHandlers = eventHandlers || defaultEventHandlers;

  for (let handlerName of eventHandlers) {
    room[handlerName] = function(...args) {
      window.hrSend({
        type: 'ROOM_EVENT',
        payload: { handlerName: handlerName, args: args }
      });
    };
  }

  // send all HHM events to the main context
  const eventTypes = Object.keys(window.HHM.events).map(e => window.HHM.events[e]);
  for (let eventType of eventTypes) {
    window.HHM.manager.registerEventHandler((args) => {
      window.hrSend({
        type: 'HHM_EVENT',
        payload: { eventType: eventType, args: args }
      });
    }, [eventType]);
  }
}

/**
 * This function can be used to call functions of the haxball headless host
 * room object from the main context.
 */
window.hrCallRoom = function hrCallRoom(fn, ...args) {
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

window.hrGetPluginById = function hrGetPluginById(id) {
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

window.hrGetPlugin = function hrGetPlugin(name) {
  const plugin = room.getPlugin(name);
  if (!plugin) return null;
  let pluginData = {
    id: plugin._id,
    isEnabled: plugin.isEnabled(),
    pluginSpec: plugin.pluginSpec
  }
  return pluginData;
}

window.hrGetPlugins = function hrGetPlugins() {
  let plugins = HHM.manager.getLoadedPluginIds()
    .map(id => window.hrGetPluginById(id))
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

window.hrEnablePlugin = function hrEnablePlugin(name) {
  const plugin = room.getPlugin(name);
  if (!plugin) return false;
  return HHM.manager.enablePluginById(plugin._id);
}

window.hrDisablePlugin = function hrDisablePlugin(name) {
  const plugin = room.getPlugin(name);
  if (!plugin) return false;
  return HHM.manager.disablePluginById(plugin._id);
}