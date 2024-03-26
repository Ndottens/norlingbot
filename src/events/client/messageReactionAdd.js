const db = require('../../database/database')
const queries = require('../../database/queries');
const threads = require('../../helpers/posts/threads');
const { PermissionsBitField } = require('discord.js');


module.exports = {
    name: 'messageReactionAdd',
    async execute(interaction, user, client) {
        const [mapName, threadId] = Object.entries(threads)
            .find(([name, value]) => value === interaction.message.channelId) || [null, null];

        const guild = interaction.message.guild;
        const member = await guild.members.fetch(user.id);

        if (
            member.permissions.has(PermissionsBitField.Flags.Administrator) &&
            mapName &&
            threadId &&
            interaction.emoji.id === process.env.APPROVE_GUILD_EMOJI
        ) {
            db(function (error, connection) {
                if (error) console.error(error);
                queries.insertPost(connection, interaction.message, user, threadId, mapName)
            });
        }

        await interaction.react('🤖');
    }
}
