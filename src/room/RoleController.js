/**
 * Class for controlling the sav/roles plugin of HHM.
 * 
 * Requires the `sav/roles` plugin to be loaded and enabled.
 */
class RoleController {
  constructor(opt) {
    this.page = opt.page;
    this.plugins = opt.plugins;
  }

  /**
   * Returns the roles of player with given id or auth.
   * 
   * Returns null if roles cannot be found and empty array if player does
   * not have any roles.
   * 
   * @param {number|string} playerId - Player id or auth.
   * @returns {Array.<string>} - Roles of player.
   */
  async getPlayerRoles(playerId) {
    let rolesPlugin = await this.plugins.getPlugin('sav/roles');
    if (!rolesPlugin || !rolesPlugin.isEnabled) {
      throw new Error('sav/roles plugin needs to be loaded and enabled!');
    }
    return this.page.evaluate((playerId) => {

      if (typeof playerId === 'number') {
        const rolesPlugin = HHM.manager.getPlugin('sav/roles');
        let roles = rolesPlugin.getPlayerRoles(playerId);
        return roles;

      } else if (typeof playerId === 'string') {
        const playersPlugin = HHM.manager.getPlugin('sav/players');
        let roles = playersPlugin.getUserData(playerId, 'sav/roles').roles;
        return roles;
      }

    }, playerId);
  }

  /**
   * Gets the players in given role.
   * 
   * @param {string} roleName - Name of the role.
   * @param {object} opt - Options.
   * @param {boolean} opt.offlinePlayers - Include offline players in the
   *    result.
   */
  async getRole(roleName, opt) {
    let rolesPlugin = await this.plugins.getPlugin('sav/roles');
    if (!rolesPlugin || !rolesPlugin.isEnabled) {
      throw new Error('sav/roles plugin needs to be loaded and enabled!');
    }
    return this.page.evaluate((roleName, opt) => {
      const rolesPlugin = HHM.manager.getPlugin('sav/roles');
      let role = rolesPlugin.getRole(roleName, opt);
      return role;
    }, roleName, opt);
  }

  /**
   * Can be used to add and remover roles from players.
   * 
   * @param {number|string} playerId - Id or auth of player.
   * @param {string} role - Role to add/remove.
   * @param {boolean} state - `true` to add a role and `false` to remove.
   * @param {boolean} persistent - Whether to save the change to database or 
   *    not.
   */
  async setPlayerRole(playerId, role, state = true, persistent = false) {
    let rolesPlugin = await this.plugins.getPlugin('sav/roles');
    if (!rolesPlugin || !rolesPlugin.isEnabled) {
      throw new Error('sav/roles plugin needs to be loaded and enabled!');
    }

    return this.page.evaluate((playerId, role, state, persistent) => {
      const rolesPlugin = HHM.manager.getPlugin('sav/roles');

      if (typeof playerId === 'number') {
        return rolesPlugin.setPlayerRole(playerId, role, state, persistent);

      } else if (typeof playerId === 'string') {
        // TODO
      }
    }, playerId, role, state, persistent); 
  }
}

module.exports = RoleController;