// When I started writing this, only God and I understood what I was doing
// Now, only God knows
const { Collection } = require('discord.js');
const { Client } = require('revolt.js');
const fs = require('fs');
const chalk = require('chalk');
const client = new Client();

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync('./modules/', { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);


// Config loading
const launchArgs = process.argv.slice(2);
switch (launchArgs[0]) {
	case 'debug':
		console.log(`${chalk.magenta('[Config]')}: Debug configuration will be loaded.`);
		client.config = require('./configDebug.json');
		break;
	case 'release':
		console.log(`${chalk.magenta('[Config]')}: Release configuration will be loaded.`);
		client.config = require('./configRelease.json');
		break;
	default:
		console.log(`${chalk.magenta('[Config]')}: ${chalk.yellow('No arguments provided, Debug configuration will be loaded.')}`);
		client.config = require('./configDebug.json');
		break;
}


// Log in
client.loginBot(client.config.apiKey);

// if sh!t goes wrong
// if (client.config.devMode) client.on('debug', d => console.log(`${chalk.cyan('[Debug]')}:`, d)); // Debug stuff, only loads when running in debug mode
client.on('rateLimit', r => console.warn(`${chalk.yellow('[Ratelimit]')}:`, r));
client.on('warn', w => console.warn(`${chalk.yellow('[Warn]')}:`, w));
client.on('error', e => console.error(`${chalk.redBright('[Error]')}:`, e.stack));
process.on('uncaughtException', e => console.error(`${chalk.redBright('[Error]')}:`, e.stack));
process.on('unhandledRejection', e => console.error(`${chalk.redBright('[Error]')}:`, e.stack));
process.on('warning', e => console.warn(`${chalk.yellow('[Error]')}:`, e.stack));

// Handlers' modules
['commands', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

// Custom prototypes
require('./handlers/prototypes.js');
