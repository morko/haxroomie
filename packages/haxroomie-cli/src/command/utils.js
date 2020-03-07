const colors = require('colors/safe');

/**
 * Tries to fiend the given player ID from the given room.
 *
 * @param {RoomController} room - Room to search from.
 * @param {number} id - Player id.
 * @return {boolean} - Does the room have the given player.
 * @private
 */
async function doesRoomHavePlayer(room, id) {
  let players = await room.callRoom('getPlayerList');
  for (let player of players) {
    if (!player) continue;
    if (player.id == id) return true;
  }
  return false;
}

/**
 * Transforms PluginData object into a printable string.
 *
 * @param {PluginData} pluginData - Plugin data.
 * @private
 */
function pluginDataToString(pluginData) {
  const p = pluginData;
  const isEnabled = p.isEnabled
    ? `${colors.green(`enabled`)}`
    : `${colors.yellow(`disabled`)}`;

  let string =
    `${p.pluginSpec.name} (${isEnabled}):\n` +
    `  id: ${p.id}\n` +
    `  name: ${p.pluginSpec.name}\n` +
    `  author: ${p.pluginSpec.author}\n` +
    `  version: ${p.pluginSpec.version}\n` +
    `  dependencies: ${p.pluginSpec.dependencies}\n` +
    `  order: ${JSON.stringify(p.pluginSpec.order)}\n` +
    `  config: ${JSON.stringify(p.pluginSpec.config)}`;

  return string;
}

module.exports = {
  doesRoomHavePlayer,
  pluginDataToString,
};
