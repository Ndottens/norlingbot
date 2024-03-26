const db = require('../../database/database')
const queries = require('../../database/queries');
const threads = require('../../helpers/maps/threads');


module.exports = {
    name: 'messageReactionAdd',
    async execute(messageReaction, user, client) {
        const [mapName, threadId] = Object.entries(threads)
            .find(([name, value]) => value === messageReaction.message.channelId) || [null, null];

        if (
            mapName &&
            threadId &&
            messageReaction.emoji.id === process.env.APPROVE_GUILD_EMOJI
        ) {
            db(function (error, connection) {
                if (error) console.error(error);
                queries.insertPost(connection, messageReaction.message, client)
            });
        }
    }
}
