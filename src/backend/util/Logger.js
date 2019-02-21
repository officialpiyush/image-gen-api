const chalk = require('chalk');

class Logger {
    constructor(options = {}) {
        this.options = options;
        this.chalk = chalk;
    }
    log(type, message) {
        switch(type) {
            case "error": console.log(this.chalk.red(message));
            break;
            case "connection_error": console.log(this.chalk.bgRed(message));
            break;
        }

        return true;
    }
    consuc() {
        return console.log(this.chalk.green("[ CONNECTION ]") + " " + this.chalk.cyan("Connected Successfully!"))
    }
}

module.exports = Logger;