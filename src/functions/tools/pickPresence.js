const { ActivityType } = require('discord.js')

module.exports = (client) => {
    client.pickPresence = async () => {
        client.user
            .setPresence({
                activities: [
                    {
                        name: `Forum post channel`,
                        type: ActivityType.Watching
                    }
                ]
            })
    }
}
