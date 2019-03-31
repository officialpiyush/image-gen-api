const chalk = require('chalk');

/**
 * @author Piyush Bhangale <bhangalepiyush@gmail.com>
 */

 /**
  * Creates The New Class Logger
  * @class
  */
class Logger {

    /**
     * [ WIP ] Options For Logger
     * @constructor
     * @param {object} options - The Options For Logger.
     */
    constructor(options = {}) {
        this.options = options;
        this.chalk = chalk;
    } 
    // eslint disable-next-line
    /** 
     * Logs Messages
     * @param {string} type - The Type Of Message To be Logged
     * @param {string} message - The Message To be Logged
     * @returns {boolean} - What Does This Function Return
     */
    log(type, message) {
        switch(type) {
            case "error": console.log(this.chalk.red(message));
            break;
            case "connection_error": console.log(this.chalk.bgRed(message));
            break;
        }

        return true;
    }
    // eslint-disable-next-line
    /**
     * The Logging Message Controller after the API has Sucessfully connected to the internet. 
     */
    consuc() {
        return console.log(this.chalk.green("[ CONNECTION ]") + " " + this.chalk.cyan("Connected Successfully!"))
    }
}

module.exports = Logger;