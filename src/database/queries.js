const chalk = require("chalk");

function insertPost(connection, message, client) {
    const post = {
        user_id: '',
        map_id: ''
    };

    connection.query('INSERT INTO posts SET ?', post, async function (error, results, fields) {
        if (error) console.error(error);
    });

    connection.release();

    console.log(chalk.green(`[Database status] - inserted post from: ${post.user_id}`))
}

module.exports.insertPost = insertPost;
