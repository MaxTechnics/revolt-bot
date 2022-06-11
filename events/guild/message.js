module.exports = async (client, message) => {
	const { prefix } = client.config;

	// Bots shall not trigger me
	if (message.author.bot) return;

	// List up all commands
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	// Include aliases
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	// Does the message not start with the prefix or is this not a command?
	if (!message.content.toLowerCase().startsWith(prefix) || !command) return;

	// Is this command enabled?

	// All requirements are met, try running the command
	command.execute(client, message, args);
};
