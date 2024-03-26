const { readdirSync } = require('fs');
const fs = require("fs");
const chalk = require("chalk");

module.exports = (client) => {
    client.handleComponents = async () => {
        const componentFolder = readdirSync('./src/components');
        for (const folder of componentFolder) {

            const { buttons } = client;

            switch (folder) {
                case "buttons":
                    const componentButtonFolders = fs.readdirSync(`./src/components/${folder}`);

                    for (const buttonFolder of componentButtonFolders) {

                        const buttonFiles = fs.readdirSync(`./src/components/${folder}/${buttonFolder}`)
                            .filter((file) => file.endsWith('.js'));

                        for(const buttonFile of buttonFiles) {
                            const button = require(`../../components/${folder}/${buttonFolder}/${buttonFile}`);
                            buttons.set(button.data.name, button);
                            console.log(chalk.cyan(`Button: ${button.data.name} has been passed through the handler`));
                        }
                    }

                    break;

                default:
                    break;
            }
        }
    }
}