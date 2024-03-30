const { ActivityType } = require('discord.js')

module.exports = (client) => {
    client.pickPresence = async () => {
        client.user.setActivity({
            name: "@NorlingGaming",
            type: ActivityType.Streaming,
            url:'https://www.youtube.com/watch?v=leqq381AcEM&t=1122s',
        });
    }
}
