const chalk = require('chalk');
const { pluralizeWithNumber } = require('#utils/pluralize.js');

module.exports = async (client) => {
	console.log(chalk.green(`Alive as ${client.user.username}\nOn ${pluralizeWithNumber('guild', client.guilds.cache.size)}\nAnnoying ${pluralizeWithNumber('hooman', client.users.cache.size)}`));
};
