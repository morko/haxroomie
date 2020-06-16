#! /usr/bin/env node
const path = require(`path`);
const fs = require('fs');
const os = require('os');
const lockFile = require(`lockfile`);
const parseCommandLineArgs = require('./src/command-line-args');

const HRConsoleApp = require(`./src/HRConsoleApp`);
const { logger } = require('haxroomie-core');

const lockFilePath = path.join(os.tmpdir(), 'haxroomie.lock');
const configDirectory = path.join(os.homedir(), '.haxroomie');
const configSkeleton = path.join(
  __dirname,
  'examples',
  'configs',
  '1-private-room.js'
);

const argv = parseCommandLineArgs(configDirectory);

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
    initFilesAndDirectories();
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
function initFilesAndDirectories() {
  if (!fs.existsSync(configDirectory)) {
    fs.mkdirSync(configDirectory, { mode: '0770', recursive: true });
  }
  if (argv.config === path.join(configDirectory, 'config.js')) {
    if (!fs.existsSync(argv.config)) {
      fs.copyFileSync(configSkeleton, argv.config);
    }
  }
  if (!fs.existsSync(argv.downloadDirectory)) {
    fs.mkdirSync(argv.downloadDirectory, { mode: '0770', recursive: true });
  }
}
