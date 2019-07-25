const chalk = require('chalk');
exports.log = (message, ...props) => console.log(`${chalk.blue('[AULA]')} - ${message}`, ...props);
exports.error = (message, ...props) => console.error(`${chalk.blue('[AULA]')} - ${chalk.red(message)}`, ...props);
