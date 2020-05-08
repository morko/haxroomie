const path = require(`path`);

function parseCommandLineArgs(configDirectory) {
  const argv = require(`yargs`)
    .usage(`Usage: $0 [options]`)

    .alias(`v`, `version`)
    .boolean(`window`)
    .describe(`version`, `Print out the current version.`)

    .alias(`r`, `port`)
    .describe(`port`, `Communication port for the headless Chrome browser.`)

    .alias(`c`, `config`)
    .describe(`config`, `Path to haxroomie config file.`)
    .default(`config`, path.join(configDirectory, 'config.js'))

    .alias(`d`, `user-data-dir`)
    .describe(
      `user-data-dir`,
      `Path to where browser should store the data like LocalStorage.`
    )
    .default(`user-data-dir`, path.join(configDirectory, 'user-data-dir'))

    .alias(`e`, `executable-path`)
    .describe(`executable-path`, `Path to chrome browser executable.`)

    .alias(`t`, `timeout`)
    .describe(
      `timeout`,
      `How long to wait before failing to start room. ` +
        `Try adjusting this if your room starting times out often.`
    )
    .default(`timeout`, 40)

    .alias('l', 'loglevel')
    .describe(
      'loglevel',
      'Set the loglevel for the stdout. This affects which log messages ' +
        'will be printed. For e.g. if loglevel is set to info then messages ' +
        'logged with console.log, console.warn and console.error will be ' +
        'printed. Possible options are "error", "warn" and "info".'
    )
    .default('loglevel', 'warn')

    .boolean(`no-sandbox`)
    .describe(`no-sandbox`, `Runs headless Chrome without sandboxing.`)

    .alias(`w`, `window`)
    .boolean(`window`)
    .describe(`window`, `Tries to spawn a browser window for debugging.`).argv;

  return argv;
}

module.exports = parseCommandLineArgs;
