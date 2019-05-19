/**
 * This is a Haxball Headless Manager plugin that keeps track of banned
 * players.
 * 
 * Provides `window.hroomie.bannedPlayers`, `window.hroomie.ban`
 * and `window.hroomie.unban` functions.
 * 
 * If `sav/commands` and `sav/roles` plugins are available, then this plugin
 * also provides commands `ban`, `unban` and `banlist` to be used with
 * `admin` and `host` roles.
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

window.hroomie = window.hroomie || {};
Object.assign(window.hroomie, (function() {

  let bannedPlayerMap = new Map();

  room.onPlayerKicked = function(kickedPlayer, reason, ban, byPlayer) {
    if (ban) {
      bannedPlayerMap.set(kickedPlayer.id, kickedPlayer);
    }
  }

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

  let commands = room.getPlugin(`sav/commands`);
  let roles = room.getPlugin(`sav/roles`);

  if (commands && roles) {

    room.onCommand1_kick = (byPlayer, [pName]) => {
      if (!roles.ensurePlayerRole(byPlayer.id, `admin`, `hr/kickban`, `!kick`)) {
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
      if (!roles.ensurePlayerRole(byPlayer.id, `admin`, `hr/kickban`, `!ban`)) {
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
      if (!roles.ensurePlayerRole(byPlayer.id, `admin`, `hr/kickban`, `!unban`)) {
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
      if (!roles.ensurePlayerRole(byPlayer.id, `admin`, `hr/kickban`, `!banlist`)) {
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

  }

  return {
    kick,
    ban,
    unban,
    bannedPlayers
  };

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
   * @returns {boolean} - Was the ban of player with given id removed.
   */
  function unban(id) {
    id = parseInt(id);
    room.clearBan(id);
    return bannedPlayerMap.delete(id);
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


})());