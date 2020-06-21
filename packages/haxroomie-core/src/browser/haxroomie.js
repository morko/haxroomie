/* global haxroomieSendBrowserAction */
/**
 * This module contains utility/helper functions that should be loaded to the
 * browser context before loading the HHM config.
 */
window.haxroomie = window.haxroomie || {};

Object.assign(
  window.haxroomie,
  (function() {
    return {
      isObject,
      mergeDeep,
      callRoom,
      serializePlugin,
      send,
      download,
      downloadRec,
    };

    /**
     * Source from <https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge>
     * Simple object check.
     * @param item
     * @returns {boolean}
     */
    function isObject(item) {
      return item && typeof item === 'object' && !Array.isArray(item);
    }

    /**
     * Source from <https://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge>
     * Deep merge two objects.
     * @param target
     * @param ...sources
     */
    function mergeDeep(target, ...sources) {
      if (!sources.length) return target;
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
          result: result,
        },
      };
    }

    /**
     * Serializes the plugin. Use this before sending plugin data from browser.
     * @param {number|string|object} plugin - Plugin id, name or the plugin
     * itself to serialize.
     */
    function serializePlugin(plugin) {
      const { manager } = HHM;

      let p = null;
      if (typeof plugin === 'object') {
        p = plugin;
        // prevent getPlugin to create a new plugin
      } else if (plugin !== undefined) {
        p = manager.getPlugin(plugin);
      }

      if (!p) return null;

      const pluginData = {
        id: p._id,
        name: p.pluginSpec ? p.pluginSpec.name : undefined,
        isEnabled: p.isEnabled(),
        pluginSpec: p.pluginSpec,
        pluginSpecOriginal: p._pluginSpecOriginal,
      };

      return pluginData;
    }

    /**
     * Sends an action (data) to the main context.
     *
     * The action object should be in flux standard action format
     * (https://github.com/redux-utilities/flux-standard-action).
     *
     * Recognized types:
     *
     * - LOG
     *   - payload: { msg: String }
     * - HHM_EVENT
     *   - payload: { eventType: String }
     * - ROOM_EVENT
     *   - payload: { handlerName: String, args: Array }
     *   - See BrowserAction type in RoomController for definition of the
     *     payload.
     *
     * @param {BrowserAction} action - Data to be sent to the main context.
     */
    function send(action) {
      haxroomieSendBrowserAction(action);
    }

    /**
     * Downloads a file.
     *
     * @param {object} opt - Options
     * @param {Blob} opt.file - Options
     * @param {string} opt.fileName - Options
     */
    function download({ file, fileName }) {
      var c = window.document.createElement('a');
      c.style.display = 'display: none';
      window.document.body.appendChild(c);
      var d = URL.createObjectURL(file);
      c.href = d;
      c.download = fileName;
      c.click();
      URL.revokeObjectURL(d);
      c.remove();
    }

    /**
     * Downloads HaxBall rec file.
     *
     * @param {Uint8Array} opt.rec - The haxball rec returned by RoomObject.stopRecording().
     * @param {string} opt.fileName
     */
    function downloadRec({ rec, fileName }) {
      download({
        file: new Blob([rec], {
          type: 'octet/stream',
        }),
        fileName,
      });
    }
  })()
);
