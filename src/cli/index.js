#! /usr/bin/env node
const path = require(`path`);
const HRConsoleApp = require(`./HRConsoleApp`);
const logger = require(`../logger`);
const lockFile = require(`lockfile`);

const argv = require(`yargs`)
  .usage(`Usage: $0 [options]`)
  
  .alias(`r`, `port`)
  .describe(`port`, `Communication port for the headless chrome browser.`)

  .alias(`c`, `config`)
  .describe(`config`, `Path to the Haxroomie config file. `
    + `the default path is current working directory.`)
  .default(`config`, path.join(process.cwd(), 'config.js'))

  .alias(`d`, `user-data-dir`)
  .describe(`user-data-dir`, `Path to where browser should store `
    + `the data like localStorage.`)
  .default(`user-data-dir`, path.join(process.cwd(), 'user-data-dir'))
  
  .boolean(`no-sandbox`)
  .describe(`no-sandbox`, `Makes chrome run without sandbox (useful only if `
    + `running with sandbox wont work in your machine)`)

  .alias(`w`, `window`)
  .boolean(`window`)
  .describe(`window`, `Tries to spawn a browser window for debugging.`)

  .argv;

argv.noSandbox = argv.noSandbox || process.env.HR_NO_SANDBOX,
argv.headless = !argv.window || process.env.HR_WINDOW,
argv.port = argv.port || process.env.HR_PORT

const lockFilePath = path.join(__dirname, 'haxroomie.lock');

(async function bootstrap() {

  try {
    lockFile.lockSync(lockFilePath);
  } catch (err) {
    logger.error(
      `Could not acquire lock.\n`
      + `Running multiple Haxroomie instances is not supported.\n\n`
      + `If you are sure you are not running multiple instances `
      + `you can delete the file in\n${lockFilePath}`
    );
    return;
  }

  try {
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
