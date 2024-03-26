const db = require('../../database/database')
const queries = require('../../database/queries');
const threads = require('../../helpers/posts/threads');
const { PermissionsBitField, ActionRowBuilder, EmbedBuilder} = require('discord.js');


module.exports = {
    name: 'messageReactionAdd',
    async execute(interaction, user, client) {
        const [mapName, threadId] = Object.entries(threads)
            .find(([name, value]) => value === interaction.message.channelId) || [null, null];

        const guild = interaction.message.guild;
        const member = await guild.members.fetch(user.id);

        const channel = guild.channels.cache.get(process.env.ADMIN_LOG_CHANNEL_ID);

        if (
            member.permissions.has(PermissionsBitField.Flags.Administrator) &&
            mapName &&
            threadId &&
            interaction.emoji.id === process.env.APPROVE_GUILD_EMOJI
        ) {
            db(function (error, connection) {
                if (error) {
                    console.error(error, 'error');
                } else {
                    const results = queries.checkDuplicateMessage(connection, interaction.message);
                    results.then(async results => {
                        if (results.length === 0) {
                            db(function (error, connection) {
                                if (error) console.error(error);
                                queries.insertPost(connection, interaction.message, user, threadId, mapName)
                            });


                            const embed = new EmbedBuilder()
                                .setTitle('NorlingBOT')
                                .setDescription(`<@${user.id}> approved new post in: ${interaction.message.url}`)
                                .setColor(0x18e1ee)
                                .setTimestamp(Date.now())
                                .setFooter({
                                    iconURL: client.user.displayAvatarURL(),
                                    text: client.user.username
                                })

                            await channel.send({
                                embeds: [embed],
                                ephemeral: false
                            });
                        }
                    }).catch(error => {
                        console.error(error);
                    }).finally(() => {
                        connection.release();
                    });
                }
            });
        }
    }
}
