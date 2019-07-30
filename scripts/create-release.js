#!/usr/bin/env node
const util = require('util');
const fs = require('fs');
const path = require('path');
const exec = util.promisify(require('child_process').exec);

const argv = require(`yargs`)
  .usage(`Usage: $0 [options]`)
  
  .alias(`h`, `haxroomie-version`)
  .describe(`haxroomie-version`, `Version of haxroomie to release.`)

  .alias(`m`, `hhm-version`)
  .describe(`hhm-version`, `Version of HHM to use.`)

  .demandOption(
    ['haxroomie-version', 'hhm-version'],
    'Please provide both haxroomie-version and hhm-version arguments to work with this tool!'
  )
  .argv;

const hrVersion = argv.haxroomieVersion;
const hhmVersion = argv.hhmVersion;

async function createRelease() {
  let result;

  console.log(`CREATING NEW RELEASE WITH HAXROOMIE: ${hrVersion} AND HHM: ${hhmVersion}`);

  console.log(`ENSURING THAT GIT WORKING DIRECTORY IS CLEAN`);
  result = await exec(`git status --porcelain`);
  if (result.error) process.exit(1);
  if (result.stdout) {
    console.error(`GIT WORKING DIRECTORY NOT CLEAN`);
    process.exit(1);
  }

  console.log(`BUMPING MASTER BRANCH NPM VERSION`);
  result = await exec(
    `npm --no-git-tag-version version ${hrVersion}-git`
  );
  if (result.error) process.exit(1);

  console.log(`CREATING MASTER BRANCH DOCS`);
  result = await exec(`npm run docs -- -V ${hrVersion}`);
  if (result.error) process.exit(1);

  console.log(`COMMIT MASTER BRANCH BUMP AND DOCS`);
  result = await exec(`git commit -a -m "Version bumped to ${hrVersion}-git."`);
  if (result.error) process.exit(1);

  console.log(`SWITCHING TO RELEASE BRANCH`);
  result = await exec(`git checkout -b "release-${hrVersion}"`);
  if (result.error) process.exit(1);

  console.log(`BUMPING RELEASE BRANCH NPM VERSION`);
  result = await exec(`npm --no-git-tag-version version ${hrVersion}`);
  if (result.error) process.exit(1);

  console.log(`CHANGING THE DOC VERSION TO MATCH THE RELEASE VERSION`);
  result = await exec(`vjsdoc version ${hrVersion} ./docs-config/config.js`);
  if (result.error) process.exit(1);

  console.log(`SETTING THE HHM VERSION IN CONFIG`);
  setHhmVersion(hhmVersion);

  console.log(`COMMITING THE CHANGES IN RELEASE BRANCH`);
  result = await exec(
    `git commit -a -m "New release version: ${hrVersion} with HHM version: ${hhmVersion}"`
  );
  if (result.error) process.exit(1);

  console.log(
    `COMPLETED THE NEW RELEASE! YOU MIGHT WANT TO CREATE A NEW TAG FOR THE ` +
    `RELEASE USING git tag -a ${hrVersion}`
  );
  process.exit(0);
}

function setHhmVersion(hhmVersion) {
  let config = require('../config.json');
  config.hhmVersion = hhmVersion;
  configJson = JSON.stringify(config, null, 2);
  fs.writeFileSync(path.join(__dirname, '..', 'config.json'), configJson);
}
createRelease();

