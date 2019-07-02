/**
 * Creates mock room configs for Haxroomie. Requires environment variables
 * `HR_TEST_TOKEN1...HR_TEST_TOKENn` to be set. If they are not, set then 
 * `undefined` is returned.
 * 
 * @param {number} n - Amount of mock configs to create.
 * @returns {?Array.<roomConfig>} - Created config or `undefined` if n < 1 or if
 *    required amount of tokens is not provided.
 */
function createConfigs(n = 1) {
  if (n < 1) return;
  let configs = [];
  for (let i = 1; i <= n; i++) {
    let token = process.env[`HR_TEST_TOKEN${i}`];
    if (!token) return;
    let roomConfig = {
      token: token,
      roomName: `test${i}`,
      disableDefaultPlugins: true,
      pluginConfig: {
        'sav/commands': {
          commandPrefix: '#'
        }
      }
    }
    configs[i - 1] = roomConfig;
  }
  return configs;
}

module.exports = createConfigs;