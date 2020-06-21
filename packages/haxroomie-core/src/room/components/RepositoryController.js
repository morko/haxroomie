/**
 * Repository definition.
 *
 * @typedef {Object} Repository
 * @property {string} type - Repository type. Can be one of `github`, `url`
 *    or `local`.
 * @property {string} [repository] - When type is `github` this is a
 *    **mandatory** field. If your GitHub repository is at
 *    `https://github.com/user/repository` then this value should be
 *    `user/repository`.
 * @property {string} [path] - When type is `github` this is an **optional**
 *    field. The path under the repository where the plugins are. Default is
 *    `src`.
 * @property {string} [version] - When type is `github` this is an **optional**
 *    field. This is the branch, tag or commit of the repository you want to
 *    use.
 * @property {string} [url] - When type is `url` this is a **mandatory**
 *    field. The URL to your repository. Take care that your host has CORS
 *    enabled.
 * @property {object} [plugins] - When type is `local` this is a
 *    **mandatory** field. This property contains the code for plugins in
 *    a `local` repository.
 *
 *    e.g.
 * ```js
 * {
 *   type: 'local',
 *   plugins: {
 *     'pluginName1': 'JavaScript code',
 *     'pluginName2': 'JavaScript code'
 *   }
 * }
 * ```
 * @property {string} [path] - When type is `local` this is an
 *    **optional** field. This property contains the path from where the
 *    local repository has been loaded.
 */

/**
 * Repository data.
 *
 * @typedef {Object} RepositoryData
 *
 * @property {string} name - Name of the repository.
 * @property {string} [description] - Description of repository.
 * @property {string} [author] - Author of the repository.
 * @property {Array.<string>} [plugins] - Plugins that the repository contains.
 * @property {object} [config] - Configuration object for this repository.
 *    Can for example define the path of where to load the plugins.
 */

/**
 * Class for controlling Haxball Headless Manager (HHM) repositories.
 */
class RepositoryController {
  constructor({ page, defaultRepoVersion }) {
    this.page = page;
    this.defaultRepoVersion = defaultRepoVersion;
    this.running = false;
    this._usable = false;
  }

  /**
   * Adds a repository.
   *
   * If append is set to true, the new repository will be added with the
   * lowest priority, i.e. plugins will only be loaded from it they can't
   * be found in any other repository. Otherwise the repository will be
   * added with the highest priority.
   *
   * @param {Repository} repository - The repository to be added.
   * @param {boolean} [append] - Whether to append or prepend the repository
   *    to the Array of repositories.
   * @returns {Promise.<boolean>} - Whether the repository was successfully added.
   *
   */
  async addRepository(repository, append) {
    if (!repository) {
      throw new TypeError('Missing required argument: repository');
    }

    return this.page.evaluate(
      async (repository, append) => {
        const repoFactory = HHM.manager.getPluginRepositoryFactory();
        const pluginLoader = HHM.manager.getPluginLoader();
        const r = await repoFactory.createRepository(repository);
        return pluginLoader.addRepository(r, append);
      },
      repository,
      append
    );
  }

  /**
   * Sets the repositories.
   *
   * Overwrites all repositories with the given array of repositories. Adds
   * saviolas default repository if its not defined in the given array.
   *
   * @param {Array.<Repository>} repository - The repository to be added.
   * @returns {Promise}
   */
  async setRepositories(repositories) {
    return this.page.evaluate(async repositories => {
      const repoFactory = HHM.manager.getPluginRepositoryFactory();
      const pluginLoader = HHM.manager.getPluginLoader();

      pluginLoader.repositories = [];

      let hasDefaultRepo = false;
      for (let repo of repositories) {
        if (
          repo.type === `github` &&
          repo.repository === `saviola777/hhm-plugins`
        ) {
          hasDefaultRepo = true;
          break;
        }
      }

      if (!hasDefaultRepo) {
        // Add default plugin repository.
        const defaultRepo = await repoFactory.createRepository({
          type: 'github',
          repository: 'saviola777/hhm-plugins',
          version: this.defaultRepoVersion,
        });
        pluginLoader.addRepository(defaultRepo);
      }

      for (const repoDefinition of repositories) {
        const repo = await repoFactory.createRepository(repoDefinition);
        pluginLoader.addRepository(repo);
      }
    }, repositories);
  }

  /**
   * Returns whether the given repository already exists.
   * Repositories are considered equal if their configuration is the same.
   * @param {Repository} repository - Repository config.
   * @returns {boolean} - Did the repository exist.
   */
  async hasRepository(repository) {
    if (!repository) {
      return false;
    }
    return this.page.evaluate(async repository => {
      const repoFactory = HHM.manager.getPluginRepositoryFactory();
      const pluginLoader = HHM.manager.getPluginLoader();
      const r = await repoFactory.createRepository(repository);
      return pluginLoader.hasRepository(r);
    }, repository);
  }

  /**
   * Returns available repositories.
   * @returns {Array.<Repository>} - An array of available repositories.
   *
   */
  async getRepositories() {
    return this.page.evaluate(() => {
      return HHM.manager.getPluginLoader().repositories;
    });
  }

  /**
   * Retrieves information about the given repository.
   *
   * The information is loaded from repositorys `repository.json` config file.
   * @param {Repository} repository - The repository that you want to get
   *    information from.
   * @returns {RepositoryData} - The metadata of the repository.
   */
  async getRepositoryInformation(repository) {
    return this.page.evaluate(async rd => {
      let r = await HHM.manager
        .getPluginRepositoryFactory()
        .createRepository(rd);
      return r.repositoryInformation;
    }, repository);
  }
}

module.exports = RepositoryController;
