#! /usr/bin/env node
const fs = require(`fs`);
const { createHaxroomie } = require(`../../`);
const RoomClient = require(`./RoomClient`);
const logger = require(`../logger`);

const CLIENT_ID = `cli`;
const SESSION_ID = `cliSession`;

const argv = require(`yargs`)
	.usage(
		`Usage: $0 <token> [options]\n` +
		`Obtain token from https://www.haxball.com/headlesstoken)`
	)
	
	.alias(`r`, `port`)
	.describe(`port`, `Communication port for the headless chrome browser.`)

	.alias(`n`, `room-name`)
	.describe(`n`, `Room name.`)

	.alias(`y`, `player-name`)
	.describe(`player-name`, `Host player name.`)

	.alias(`m`, `max-players`)
	.describe(`max-players`, `Maximum amount of players.`)

	.alias(`p`, `password`)
	.describe(`password`, `Room password.`)

	.alias(`u`, `public`)
	.boolean(`public`)
	.describe(`public`, `Makes the room public.`)
	.default(`public`, false)

	.alias(`a`, `admin-password`)
	.describe(`admin-password`, `Password for getting admin priviledges with `
		+ `!auth admin <password>.`)

	.alias(`h`, `host-password`)
	.describe(`host-password`, `Password for getting host priviledges with `
		+ `!auth host <password>.`)

	.alias(`o`, `options`)
	.describe(`options`, `Comma separated list of custom variables that are `
		+ `usable from within the Haxball Headless Manager config through the `
		+ `haxroomie object. `
		+ `E.g. -o test="hey you",anotherTest="hohoo"`)
	
	.alias(`s`, `room-script`)
	.describe(`room-script`, `Regular haxball headless script or HHM plugin file to `
		+ `load when starting the room. Note that this will disable the `
		+ `default plugins that haxroomie loads. `
		+ `E.g. -s ./my-script.js. `
		+ `Can be relative to current working directory or an absolute path.`)
		
	.alias(`i`, `plugin-config`)
	.describe(`plugin-config`, `Config object for the HHM plugins. Used to tell `
		+ `HHM which plugins to load from the available repositories and provide `
		+ `plugin configurations. Can be relative to current working directory `
		+ `or an absolute path.`)
	
	.alias(`g`, `geo`)
	.describe(`geo`, `Geolocation override for the room. Columns are separated`
		+ `with "/" character. First column is a country code, second latitude `
		+ `and last longitude. E.g. -g eu/52.5192/13.4061`)
	
	.alias(`c`, `config`)
	.describe(`config`, `Path to HHM manager config.
		Can be relative to current working directory or an absolute path.`)

	.alias(`e`, `repositories`)
	.describe(`repositories`, `Comma separated list of additional HHM plugin `
	  + `repository URLs to load. GitHub repositories must be in format `
		+ `https://github.com/[user]/[repository] or more elaborate `
		+ `https://github.com/[user]/[repository]/tree/[branch]/[directory]. `
		+ `To load plugins from these repositories you must provide a plugin `
		+ `config that at least tells HHM which plugins to load from repos. `
		+ `E.g. add this property to the config object: "pluginName": {}`)
	
	.alias(`d`, `user-data-dir`)
	.describe(`user-data-dir`, `Path to where browser should store `
		+ `the data like localStorage. Defaults to [project root `
		+ `directory]/user-data-dir.`)
	
	.boolean(`no-sandbox`)
	.describe(`no-sandbox`, `Makes chrome run without sandbox (useful only if `
		+ `running with sandbox wont work in your machine)`)

	.alias(`w`, `window`)
	.boolean(`window`)
	.describe(`window`, `Tries to spawn a browser window for debugging.`)

	.argv;

const hrConfig = {
	noSandbox: argv.noSandbox || process.env.HR_NO_SANDBOX,
	headless: !argv.window || process.env.HR_WINDOW,
	port: argv.port || process.env.HR_PORT
};
	
(async function bootstrap() {
	try {
		let haxroomie = await createHaxroomie(hrConfig);
		let session = await haxroomie.getSession(SESSION_ID);
		let client = new RoomClient(CLIENT_ID, session);
		
		config = parseArguments(client);
		
		if (!config.token) {
			console.error(`You need to provide a token to start the room!\n` +
			`Get it from https://www.haxball.com/headlesstoken. ` +
			`Use --help argument for more information`);
			process.exit(1);
		}

		client.openRoom(config);	
	} catch (err) {
		logger.error(err.stack);
		process.exit(1);
	}

})();

function loadHHMConfig(file, client) {
	let hhmConfig = loadFile(file, client);
	if (!hhmConfig) return null;
	client.commandPrompt.print(
		`Loaded hhm config from ${file}`,
		`LOAD_CONFIG`
	);

	return hhmConfig;
}

function loadRoomScript(file, client) {
	let script = loadFile(file, client);
	if (!script) return null;
	client.commandPrompt.print(
		`Loaded room script from ${file}`,
		`LOAD_ROOM_SCRIPT`
	);

	return script;
}

function loadPluginConfig(file, client) {
	let pluginConfig = loadFile(file,client);
	if (!pluginConfig) return null;
	try {
		pluginConfig = JSON.parse(pluginConfig.content);	
	} catch (err) {
		return null;
	}
	client.commandPrompt.print(
		`Loaded plugin config from ${file}`,
		`LOAD_PLUGIN_CONFIG`
	);
	return pluginConfig;
}

function loadFile(file, client) {
	if (!fs.existsSync(file)) {
		client.commandPrompt.print(
			`Could not load the file ${file}`,
			`ERROR`
		);
		return null;
	}
	let content = fs.readFileSync(file, { encoding: `utf-8`});

	return {name: file, content: content};
}

function parseOptions(options) {
	return options.split(`,`)
	.map(e => e.split(`=`))
	.forEach(e => {
		if (e.length != 2) throw new Error(`Invalid option format: ${options}`);
		config[e[0]] = e[1];
	});
}

function parseGeolocation(geo) {
	let parts = geo.split(`/`);
	if (parts.length !== 3) {
		throw new Error(`Not enough columns given for geolocation. Should be 3.`);
	}
	return {
		code: parts[0],
		lat: parts[1],
		lon: parts[2]
	};
}

function parseRepositories(repos) {
	return repos.split(`,`);
}

function parseArguments(client) {
	
	let config = {
		roomName: argv.roomName || process.env.HR_ROOM_NAME,
		playerName: argv.playerName || process.env.HR_PLAYER_NAME,
		maxPlayers: argv.maxPlayers || process.env.HR_MAX_PLAYERS,
		password: argv.password || process.env.HR_PASSWORD,
		public: argv.public || process.env.HR_PUBLIC ? true : false,
		geo: argv.geo ? parseGeolocation(argv.geo) : undefined || process.env.HR_GEO,
		token: argv._[0] || process.env.TOKEN,
		adminPassword: argv.adminPassword || process.env.HR_ADMIN_PASSWORD,
		hostPassword: argv.hostPassword || process.env.HR_HOST_PASSWORD,
		hhmConfig: argv.config ? loadHHMConfig(argv.config, client) : undefined || process.env.HR_HHM_CONFIG,
		options: argv.options ? parseOptions(argv.options) : undefined || process.env.HR_OPTIONS,
		roomScript: argv.roomScript ? loadRoomScript(argv.roomScript, client) : undefined || process.env.HR_ROOM_SCRIPT,
		pluginConfig: argv.pluginConfig ? loadPluginConfig(argv.pluginConfig, client) : undefined || process.env.HR_PLUGIN_CONFIG,
		repositories: argv.repositories ? parseRepositories(argv.repositories) : undefined || process.env.HR_REPOSITORIES,
		userDataDir: argv.userDataDir || process.env.HR_USER_DATA_DIR
	};

	return config;
}
