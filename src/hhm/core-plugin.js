/**
 * Registers some core event state handlers, pre-event handler hooks and
 * extensions to the native room API.
 *
 *  - Game state: room.isGamePaused() and room.isGameStarted() provide access
 *    to room states
 *  - room.getRoomLink() provides access to the room link at all times
 *  - native event state validators: validators for onGameStart, onGameStop,
 *    onGamePause, and onGameUnpause
 *
 * Changelog:
 *
 * 1.2.1:
 *  - if pluginSpec is no object, it is used as the plugin name
 *
 * 1.2.0:
 *  - move non-plugin event handlers of the HHM to this plugin
 *
 * 1.1.0:
 *  - improved book-keeping and event state validation for paused and
 *    started/stopped game states
 *
 * 1.0.0:
 *  - initial version
 *
 */

var room = HBInit();

room.pluginSpec = {
  name: `hhm/core`,
  author: `saviola`,
  version: `1.2.1`,
  dependencies: [
    `hhm/core` // Can't be disabled
  ],
};

//
// Global variables
//

const properties = { paused: false, started: false };

//
// Event handlers
//

function onHhmPluginStateChangeHandler() {
  room.getPluginManager().getRoomManager().handlersDirty = true;
}

/**
 * Synchronizes the plugin name when the pluginSpec or _name is set.
 */
function onHhmPropertySetHandler({ plugin, propertyName, propertyValue }) {
  // Register plugin name after setting the plugin specification
  if (propertyName === `pluginSpec`) {

    // If pluginSpec is no object, use the value as plugin name
    // TODO document behavior
    if (typeof propertyValue !== `object`) {
      plugin.pluginSpec = { name: propertyValue };
      return true;
    }

    if (propertyValue.hasOwnProperty(`name`)
        && propertyValue.name !== plugin._name) {

      plugin._name = propertyValue.name;

    } else if (plugin._name !== plugin._id) {
      propertyValue.name = plugin._name;
    }

    plugin.setConfig();

    return true;
  }

  if (propertyName === `_name`) {
    if (plugin.pluginSpec === undefined) {
      plugin.pluginSpec = {};
    }

    plugin.pluginSpec.name = propertyValue;
    room.getPluginManager().pluginIds.set(propertyValue, plugin._id);

    return true;
  }
}

function onRoomLinkHandler(roomLink) {

  room.extend(`pauseGame`, ({ previousFunction: pauseGame }, pause) => {
    pauseGame(pause);

    if (room.isGameStarted()) {
      properties.paused = pause;
    }
  });

  room.extend(`isGamePaused`, () => {
    return properties.paused === true;
  });

  room.extend(`isGameStarted`, () => {
    return room.getScores() !== null;
  });

  room.extend(`startGame`, ({ previousFunction: startGame }) => {
    // Set paused state to false on game start
    if (!room.isGameStarted()) {
      properties.paused = false;
    }

    startGame();

    properties.started = true;
  });

  room.extend(`stopGame`, ({ previousFunction: stopGame }) => {
    // Set paused state to false on game stop
    properties.paused = false;

    stopGame();

    properties.started = false;
  });

  room.extend(`getRoomLink`, () => {
    return roomLink;
  });

  room
  // Pre-event handler hooks
      .addPreEventHandlerHook(`onGameStart`, () => {
        return properties.started === true;
      })
      .addPreEventHandlerHook(`onGameStop`, () => {
        return properties.started === false;
      })
      .addPreEventHandlerHook(`onGamePause`, () => {
        return properties.paused === true;
      })
      .addPreEventHandlerHook(`onGameUnpause`, () => {
        return properties.paused === false;
      })
      // Prevent native onRoomLink events from propagating
      .addPreEventHook(`onRoomLink`, () => {
        return false;
      })
      // Pre and post event handler hooks
      .addPreEventHook(`onGamePause`, () => {
        properties.paused = true;
      })
      .addPreEventHook(`onGameUnpause`, () => {
        properties.paused = false;
      })
      .addPreEventHook(`onGameStart`, () => {
        properties.started = true;
      })
      .addPreEventHook(`onGameStop`, () => {
        properties.started = false;
      });

  onHhmPluginStateChangeHandler();
}

//
// Exports
//

room.onRoomLink = onRoomLinkHandler;
room.onHhm_pluginLoaded = room.onHhm_pluginDisabled = room.onHhm_pluginEnabled
    = onHhmPluginStateChangeHandler;
room.onHhm_propertySet = onHhmPropertySetHandler;
