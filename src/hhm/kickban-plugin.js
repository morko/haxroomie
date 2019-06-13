/**
 * This is a Haxball Headless Manager plugin that keeps track of banned
 * players.
 * 
 * Exports `bannedPlayers`, `ban`, `unban` and `kick` functions.
 * 
 * If `sav/commands` and `sav/roles` plugins are available, then this plugin
 * also provides commands `kick`, `ban`, `unban` and `banlist` to be used with
 * `admin` role.
 */
let room = HBInit();

room.pluginSpec = {
  name: `hr/kickban`,
  author: `salamini`,
  version: `1.0.0`,
  config: {},
  dependencies: [],
  order: {},
  incompatible_with: [],
};

let bannedPlayerMap = new Map();
let pendingUnbans = new Set();

// Roles that can use the in room commands.
let allowedRoles = ['admin', 'host'];

/**
 *  Keep track of banned players. 
 */
room.onPlayerKicked = function(kickedPlayer, reason, ban, byPlayer) {
  if (ban) {
    // Make sure there is no unban pending for the player.
    if (!pendingUnbans.has(kickedPlayer.id)) {
      bannedPlayerMap.set(kickedPlayer.id, kickedPlayer);
    } else {
      pendingUnbans.delete(kickedPlayer.id);
    }
  } 
}

/**
 * Extend the native room.clearBan function so that the player will
 * get removed from the banned players.
 */
room.extend('clearBan', ({ previousFunction }, playerId) => {
  previousFunction(playerId);
  // If the player ban was cleared in the onPlayerKicked handler of other
  // plugin then the player is probably not yet added to the bannedPlayerMap
  // and Map.delete will return false. To be able to delete the ban from
  // the list we add it to pendingUnbans that will be checked in this
  // plugins onPlayerKicked 
  if (!bannedPlayerMap.delete(playerId)) {
    pendingUnbans.add(playerId);
  }
});

/**
 * Gets the player object with given player name.
 * @param {string} pName - Player name prefixed with @ or without.
 * @returns {object|undefined} - Player object or undefined if no such player.
 */
function getPlayerWithName(pName) {
  pName = pName.startsWith('@') ? pName.slice(1) : pName;
  let player = room.getPlayerList().filter((p) => p.name === pName)[0];
  return player;
}

room.onCommand1_kick = (byPlayer, [pName]) => {
  let roles = room.getPlugin(`sav/roles`);
  if (!roles) return;
  if (!roles.ensurePlayerRoles(byPlayer.id, allowedRoles, room)) {
    return;
  }
  let player = getPlayerWithName(pName);
  if (!player) {
    room.sendChat(`No player with name ${pName}.`, byPlayer.id);
    return;
  }
  if (!kick(player.id)) {
    room.sendChat(`Could not kick player ${pName}.`, byPlayer.id);
    return;
  }
}

room.onCommand1_ban = (byPlayer, [pName]) => {
  let roles = room.getPlugin(`sav/roles`);
  if (!roles) return;
  if (!roles.ensurePlayerRoles(byPlayer.id, allowedRoles, room)) {
    return;
  }
  let player = getPlayerWithName(pName);
  if (!player) {
    room.sendChat(`No player with name ${pName}.`, byPlayer.id);
    return;
  }
  if (!ban(player.id)) {
    room.sendChat(`Could not ban player ${pName}.`, byPlayer.id);
    return;
  }
}

room.onCommand1_unban = (byPlayer, [playerId]) => {
  let roles = room.getPlugin(`sav/roles`);
  if (!roles) return;
  if (!roles.ensurePlayerRoles(byPlayer.id, allowedRoles, room)) {
    return;
  }
  if (!unban(playerId)) {
    room.sendChat(
      `Could not remove ban of player with id ${playerId}. `
      + `Make sure that the id matches one in the banlist.`
    );
  }
}

room.onCommand0_banlist = (byPlayer) => {
  let roles = room.getPlugin(`sav/roles`);
  if (!roles) return;
  if (!roles.ensurePlayerRoles(byPlayer.id, allowedRoles, room)) {
    return;
  }
  let bPlayers = bannedPlayers();
  if (bPlayers.length === 0) {
    room.sendChat('No banned players.', byPlayer.id);
    return;
  }
  let bpList = bPlayers.map((p) =>`id:${p.id} - ${p.name}`)
  room.sendChat(bpList.join('\n'), byPlayer.id);
}

let help = room.getPlugin(`sav/help`);
if (help) {
  help.registerHelp(`kick`, ` PLAYER_NAME`);
  help.registerHelp(`ban`, ` PLAYER_NAME`);
  help.registerHelp(`unban`, ` PLAYER_ID`);
}

/**
 * Kicks a player with given id.
 * 
 * @param {string|number} id - Id of the player.
 * @returns {boolean} - Was there a player with given id.
 */
function kick(id) {
  id = parseInt(id);
  let player = room.getPlayer(id);
  if (!player) return false;
  room.kickPlayer(id, 'Bye!', false);
  return true;
}

/**
 * Bans a player with given id.
 * 
 * @param {string|number} id - Id of the player.
 * @returns {boolean} - Was there a player with given id.
 */
function ban(id) {
  id = parseInt(id);
  let player = room.getPlayer(id);
  if (!player) return false;
  room.kickPlayer(id, 'Bye!', true);
  return true;
}

/**
 * Removes a ban of player with given id.
 * 
 * @param {string|number} id - Id of the player.
 * @returns {boolean} - Was there a banned player with given id.
 */
function unban(id) {
  id = parseInt(id);
  let hadPlayer = bannedPlayerMap.has(id);
  room.clearBan(id);
  return hadPlayer;
}

/**
 * Returns an array of banned players.
 * @returns {Array.<object>} - An array of banned Player objects.
 */
function bannedPlayers() {
  let list = [];
  for (let p of bannedPlayerMap.values()) {
    list.push(p);
  }
  return list;
}

room.onRoomLink = function onRoomLink() {
  room.kick = kick;
  room.ban = ban;
  room.unban = unban;
  room.bannedPlayers = bannedPlayers;
}
