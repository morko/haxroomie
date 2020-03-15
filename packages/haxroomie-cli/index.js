#! /usr/bin/env node
const path = require(`path`);
const fs = require('fs');
const os = require('os');
const lockFile = require(`lockfile`);

const HRConsoleApp = require(`./src/HRConsoleApp`);
const { logger } = require('haxroomie-core');

const configDir = path.join(os.homedir(), '.haxroomie');
const configSkeleton = path.join(
  __dirname,
  'examples',
  'configs',
  '1-private-room.js'
);
const lockFilePath = path.join(os.tmpdir(), 'haxroomie.lock');

const argv = require(`yargs`)
  .usage(`Usage: $0 [options]`)

  .alias(`v`, `version`)
  .boolean(`window`)
  .describe(`version`, `Print out the current version.`)

  .alias(`r`, `port`)
  .describe(`port`, `Communication port for the headless Chrome browser.`)

  .alias(`c`, `config`)
  .describe(`config`, `Path to haxroomie config file.`)
  .default(`config`, path.join(configDir, 'config.js'))

  .alias(`d`, `user-data-dir`)
  .describe(
    `user-data-dir`,
    `Path to where browser should store the data like LocalStorage.`
  )
  .default(`user-data-dir`, path.join(configDir, 'user-data-dir'))

  .alias(`e`, `executable-path`)
  .describe(`executable-path`, `Path to chrome browser executable.`)

  .alias(`t`, `timeout`)
  .describe(
    `timeout`,
    `How long to wait before failing to start room. ` +
      `Try adjusting this if your room starting times out often.`
  )
  .default(`timeout`, 40)

  .boolean(`no-sandbox`)
  .describe(`no-sandbox`, `Runs headless Chrome without sandboxing.`)

  .alias(`w`, `window`)
  .boolean(`window`)
  .describe(`window`, `Tries to spawn a browser window for debugging.`).argv;

if (argv.version) {
  console.log(require('./package.json').version);
  process.exit(0);
}

// yargs saves --no-sandbox as argv.sandbox = false
argv.noSandbox = argv.sandbox === false || process.env.HR_NO_SANDBOX;
argv.executablePath = argv.executablePath || process.env.HR_EXECUTABLE_PATH;
argv.headless = !argv.window || process.env.HR_WINDOW;
argv.port = argv.port || process.env.HR_PORT;

(async function bootstrap() {
  try {
    lockFile.lockSync(lockFilePath);
  } catch (err) {
    logger.error(
      `Could not acquire lock:\n` +
        `Running multiple Haxroomie instances is not supported.\n` +
        `If you are sure you are not running multiple instances ` +
        `you can delete the file in\n${lockFilePath}`
    );
    process.exit(1);
  }

  try {
    initConfigDir();
    let app = new HRConsoleApp(argv);
    await app.start();
    process.on('exit', () => {
      app.stop();
      lockFile.unlockSync(lockFilePath);
    });
  } catch (err) {
    logger.error(err.stack);
    process.exit(1);
  }
})();

/**
 * Creates the config directory and necessary files if missing.
 */
function initConfigDir() {
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { mode: '0770', recursive: true });
  }
  if (argv.config === path.join(configDir, 'config.js')) {
    if (!fs.existsSync(argv.config)) {
      fs.copyFileSync(configSkeleton, argv.config);
    }
  }
}
