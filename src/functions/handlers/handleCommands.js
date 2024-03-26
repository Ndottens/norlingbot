const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9')
const fs = require('fs');
const chalk = require('chalk')

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync('./src/commands');
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`)
                .filter((file) => file.endsWith('.js'));

            const { commands, commandArray } = client;

            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                await commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(chalk.cyan(`Command: ${command.data.name} has been passed through the handler`));
            }
        }

        const clientId = process.env.CLIENT_ID;
        const guildId = process.env.GUILD_ID;

        const rest = new REST({ version: '9'}).setToken(process.env.DISCORD_BOT_TOKEN);

        try {
            console.log(chalk.gray('Started refreshing application (/) commands.'));

            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId), { 
                    body: client.commandArray,
                }
            );

            console.log(chalk.gray('Successfully reloaded application (/) commands.'));
        } catch (error) {
            console.log(error)
        }
    }
}