const mysql = require('mysql');
const chalk = require('chalk')

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.on('connection', function (connection) {
    console.log(chalk.cyan('[Database status] - Connected on ThreadID:', connection.threadId));
  });

connection.on('enqueue', function () {
    console.log(chalk.red('[Database status] - Waiting for available connection slot'));
  });

connection.on('release', function (connection) {
    console.log(chalk.yellow('[Database status] - Connection on ThreadID:', connection.threadId, 'released'));
  });

const getConnection = function (callback) {
    connection.getConnection(function (err, connection) {
        callback(err, connection);
    });
};


module.exports = getConnection;
