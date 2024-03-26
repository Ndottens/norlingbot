const chalk = require('chalk');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        client.pickPresence();

        console.log(chalk.cyanBright(`Ready! ${client.user.tag} is logged in and online.`));
    }
}
