const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const db = require("../../database/database");
const queries = require("../../database/queries");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Return member profile with statistics')
        .addUserOption((option) => option
                .setName("user")
                .setDescription("User you want to see the profile of.")
                .setRequired(false)
        ),
    async execute(interaction, client) {
        const user = interaction.options.getUser("user") ?? interaction.user;

        const member = await interaction.guild.members.fetch(user);

        const date = new Date(member.joinedTimestamp);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const joinedAtTimestamp = date.toLocaleDateString('en-US', options);

        db(function (error, connection) {
            if (error) {
                console.error(error, 'error');
            } else {
                const results = queries.getTotalUserPost(connection, user.id);
                results.then(async results => {
                    let totalValue = 0;

                    if (results.length > 0) {
                        totalValue = results[0].total;
                    }

                    const embed = new EmbedBuilder()
                        .setTitle('NorlingBot - Profile checker')
                        .setDescription(`Statistics about <@${user.id}>.`)
                        .addFields(
                            {
                                name: 'Posts:',
                                value: `${totalValue}`,
                                inline: true
                            },
                            {
                                name: 'Joined since:',
                                value: `${joinedAtTimestamp}`,
                                inline: true
                            }
                        )
                        .setColor(0x18e1ee)
                        .setTimestamp(Date.now())
                        .setThumbnail(user.displayAvatarURL())
                        .setFooter({
                            iconURL: client.user.displayAvatarURL(),
                            text: client.user.username
                        })

                    await interaction.reply({
                        embeds: [embed],
                        ephemeral: false
                    });
                });
            }
        });
    }
}