#! /usr/bin/env node
const fs = require(`fs`);
const Haxroomie = require(`../Haxroomie`);
const RoomClient = require(`./RoomClient`);
const logger = require('../logger');

const CLIENT_ID = `cli`;
const SESSION_ID = `cliSession`;

const argv = require(`yargs`)
	.usage(
		`Usage: $0 <token> [options]\n` +
		`Obtain token from https://www.haxball.com/headlesstoken)`
	)

	.alias(`n`, `room-name`)
	.describe(`n`, `room name`)

	.alias(`h`, `player-name`)
	.describe(`player-name`, `host player name`)

	.alias(`m`, `max-players`)
	.describe(`max-players`, `maximum amount of players`)

	.alias(`p`, `password`)
	.describe(`password`, `room password`)

	.alias(`u`, `public`)
	.boolean('public')
	.describe(`public`, `make the room public`)
	.default('public', false)

	.alias(`a`, `admin-password`)
	.describe(`admin-password`, `password for getting admin with
		!auth admin <password>`)

	.alias(`o`, `options`)
	.describe(`options`, `comma separated list of custom variables that are
		usable from within the headless host manager config through the haxroomie
		object.
		e.g. --options test="hey you",anotherTest="hohoo"`)
	
	.alias(`l`, `plugins`)
	.describe(`plugins`, `comma separated list of HHM plugin files to 
		load when starting the room.
		e.g. --plugins my-plugin.js,another-plugin.js`)
	
	.alias(`c`, `config`)
	.describe(`config`, `custom headless host manager config 
		(relative to current working directory or absolute path)`)

	.alias(`s`, `no-sandbox`)
	.boolean(`no-sandbox`)
	.describe(`no-sancbox`, `makes chrome run without sandbox (useful only if
		running with sandbox wont work in your machine)`)

	.alias(`w`, `window`)
	.boolean(`window`)
	.describe(`window`, `spawn a browser window for debugging`)

	.argv;

const token = argv._[0] || process.env.TOKEN;
const noSandbox = argv.noSandbox || process.env.NO_SANDBOX;

if (!token) {
	console.error(`You need to provide a token to start the room!\n` +
	`Get it from https://www.haxball.com/headlesstoken. ` +
	`See haxroomie --help for more information`);
	process.exit(1);
}
	
(async function bootstrap() {
	try {
		let haxroomie = new Haxroomie({
			headless: !argv.window, 
			noSandbox: noSandbox
		});
		let session = await haxroomie.getSession(SESSION_ID);
		let client = new RoomClient(CLIENT_ID, session);
		
		config = parseArguments(client);
		client.openRoom(config);	
	} catch (err) {
		logger.error(err.stack);
		process.exit(1);
	}

})();

function loadHHMConfig(file, client) {
	if (!fs.existsSync(file)) {
		client.commandPrompt.send(
			`ERROR`, 
			`Could not load hhm config ${file}`
		);
		return null;
	}
	let hhmConfig = fs.readFileSync(file, { encoding: 'utf-8'});
	client.commandPrompt.send(
		`LOAD_CONFIG`, 
		`Loaded hhm config from ${file}`
	);

	return hhmConfig;
}

function parseArguments(client) {
	
	let config = {
		roomName: argv.roomName,
		playerName: argv.playerName,
		maxPlayers: argv.maxPlayers,
		password: argv.password,
		public: argv.public,
		token: token,
		adminPassword: argv.adminPassword,
		hhmConfig: argv.config ? loadHHMConfig(argv.config, client) : undefined
	};

	if (argv.options) {
		argv.options.split(`,`)
		.map(e => e.split(`=`))
		.forEach(e => {
			if (e.length != 2) throw new Error(`Invalid option format: ${options}`);
			config[e[0]] = e[1];
		});
	}

	if (argv.plugins) {
		config.plugins = argv.plugins.split(`,`)
		.map(e => { return fs.readFileSync(e, { encoding: 'utf-8'})});
	}
	return config;
}
