const { tofuGreen } = require('#colors');
const { version } = require('../../package.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'about',
	helpTitle: 'About',
	category: 'Bot',
	usage: 'about',
	description: 'Display the bot\'s information',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['bot', 'botinfo', 'info'],
	cooldown: 20,
	execute: async function(client, message, args) {
		const { botProfile } = client.config;

		const { heapUsed, heapTotal } = process.memoryUsage();

		// Uptime calculations
		let seconds = Math.floor(process.uptime()); // Math.floor(message.client.uptime / 1000);
		let minutes = Math.floor(seconds / 60);
		let hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);

		seconds %= 60;
		minutes %= 60;
		hours %= 24;

		const aboutEmbed = new MessageEmbed()
			.setColor(tofuGreen)
			.setAuthor('About Tofu Bot', botProfile)
			.addFields(
				{ name: 'Bot version:', value: version, inline: true },
				{ name: 'Uptime:', value: `${days}d ${hours}h ${minutes}m ${seconds}s`, inline: true },
				{ name: 'Memory Usage:', value: `${(heapUsed / 1024 / 1024).toFixed(1)} MB / ${(heapTotal / 1024 / 1024).toFixed(1)}MB (${(heapUsed / heapTotal * 100).toFixed(2)}%)` },
				{ name: 'Dev:', value: 'MaxTechnics' }
			)
			.setFooter('Made with ☕, without swear words');

		message.channel.sendMessage({ embeds: [aboutEmbed] });
	},
};
