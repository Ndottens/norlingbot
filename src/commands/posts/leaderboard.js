const {SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('posters')
        .setDescription('Return top spot posters of the given button option'),
    async execute(interaction, client) {
        const topUserPosts = new ButtonBuilder()
            .setCustomId('top_user_posts')
            .setLabel('Top User Posts')
            .setEmoji('🎣')
            .setStyle(ButtonStyle.Success);

        const topMapPosts = new ButtonBuilder()
            .setCustomId('top_map_posts')
            .setLabel('Top Map Posts')
            .setEmoji('🗺️')
            .setStyle(ButtonStyle.Primary);

        const embed = new EmbedBuilder()
            .setTitle('NorlingBOT')
            .setDescription(`This bot helps getting tracking posts in <#${process.env.POST_CHANNEL_ID}>`)
            .setColor(0x18e1ee)
            .setTimestamp(Date.now())
            .setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: client.user.username
            })

        await interaction.reply({
            embeds: [embed],
            components: [new ActionRowBuilder().addComponents([
                    topUserPosts,
                    topMapPosts
                ]
            )],
            ephemeral: false
        });
    }
}