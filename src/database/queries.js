const chalk = require("chalk");

function insertPost(connection, message, user, threadId, mapName) {
    const post = {
        user_id: user.id,
        map_id: threadId,
        message_id: message.id
    };

    connection.query('INSERT INTO posts SET ?', post, async function (error, results, fields) {
        if (error) console.error(error);
    });

    connection.release();

    console.log(chalk.green(`[Database status] - inserted post from: ${mapName}`))
}

function topPosts(connection, resolve, message) {
    connection.query('SELECT user_id,COUNT(*) as total FROM posts GROUP BY user_id ORDER BY total DESC  LIMIT 10;', 'posts', async function (error, results, fields) {
        if (error) console.error(error);
        resolve(results)
        await message.react('🏆');
    });

    connection.release();
}

function topMaps(connection, resolve, message) {
    connection.query('SELECT map_id,COUNT(*) as total FROM posts GROUP BY map_id ORDER BY total DESC  LIMIT 10;', 'posts', async function (error, results, fields) {
        if (error) console.error(error);
        resolve(results)
        await message.react('🏆');
    });

    connection.release();
}

module.exports.insertPost = insertPost;
module.exports.topPosts = topPosts;
module.exports.topMaps = topMaps;
