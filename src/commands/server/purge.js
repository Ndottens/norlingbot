const { SlashCommandBuilder } = require('@discordjs/builders');
const chalk = require('chalk')
const { PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Purge an amount of message!')
    .addIntegerOption((option) => {
        return option
        .setName('amount')
        .setDescription('Amount of message to delete.')
        .setRequired(true)
    }),
    async execute(interaction, client) {
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({ content: "You don't have the right permissions to perform this action!", ephemeral: true});

        let amount = interaction.options.getInteger('amount');

        if(parseInt(amount) > 99) {
            return interaction.reply({ content: "I can only delete 99 messages at once!", ephemeral: true });
        } else {	
            try {
                let { size } = await interaction.channel.bulkDelete(amount);

                await interaction.reply({ content: `Deleted ${size} messages.`, ephemeral: true });
            } catch(error) {
                console.log(chalk.red(`[Error delete message] - ${error.message}`));
                interaction.reply({ content: 'I cannot delete messages that are older then 14 days.', ephemeral: true });
            }

        }
    }
}