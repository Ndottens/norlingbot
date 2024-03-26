const { EmbedBuilder } = require('discord.js');
const db = require('../../../database/database');
const chalk = require('chalk');
const queries = require('../../../database/queries');
const leaderboard = require('../../../helpers/posts/leaderboard');

module.exports = {
    data: {
        name: 'top_map_posts'
    },
    async execute(interaction, client) {
        const message = await interaction.deferReply({
            fetchReply: true
        });

        const results = await new Promise((resolve) => {
            db(function (error, connection) {
                if (error) console.error(error);
                console.log(chalk.green(`[Database status] - Connection on ThreadID ${connection.threadId} query`))

                queries.topMaps(connection, resolve, message)
            });
        })

        let contentMessage = '-';
        let resultsMessage = [];

        if (results.length > 0) {
            results.forEach((result, index) => {
                console.log(result.map_id)
                resultsMessage.push(`${leaderboard[index]} <#${result.map_id}> - total: ${result.total} \n`)
            });

            contentMessage = resultsMessage.join(' ');
        }

        const embed = new EmbedBuilder()
            .setTitle('Top Posts In Map 🗺️')
            .setDescription(contentMessage)
            .setColor(0x18e1ee)
            .setTimestamp(Date.now())
            .setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: client.user.username
            })

        await interaction.editReply({
            embeds: [embed]
        })
    }
}