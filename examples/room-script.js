/**
 * This is an example of a plugin for HHM that can be also used as a single
 * room script.
 * 
 * The plugin just gives admins to first player that join and passes the
 * admin to someone else if the only admin leaves.
 * 
 * Code has been ripped off from the Haxball Headless Wiki.
 */

let room = HBInit();
room.pluginSpec = {
  name: `hr/autoadmin`,
  author: `salamini`,
  version: `1.0.0`
};

// If there are no admins left in the room give admin to one of the remaining players.
function updateAdmins() { 
  // Get all players except the host (id = 0 is always the host)
  var players = room.getPlayerList().filter((player) => player.id != 0 );
  if ( players.length == 0 ) return; // No players left, do nothing.
  if ( players.find((player) => player.admin) != null ) return; // There's an admin left so do nothing.
  room.setPlayerAdmin(players[0].id, true); // Give admin to the first non admin player in the list
}

room.onPlayerJoin = function(player) {
  updateAdmins();
}

room.onPlayerLeave = function(player) {
  updateAdmins();
}