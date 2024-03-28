const chalk = require("chalk");

function insertPost(connection, message, user, threadId, mapName) {
    const post = {
        user_id: message.author.id,
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

function checkDuplicateMessage(connection, message) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT message_id FROM posts WHERE message_id = ?;', [message.id], async function (error, results, fields) {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}


module.exports.insertPost = insertPost;
module.exports.topPosts = topPosts;
module.exports.topMaps = topMaps;
module.exports.checkDuplicateMessage = checkDuplicateMessage;
