const { default: chalk } = require('chalk');

/** Class use Logging Service
 * @class Logger
 */
class Logger {
  /**
   * @static Method for Logging Errors with Exit
   * @param {string} message
   * @param {number} code
   */
  static error(message, code) {
    const errCode = code ? code : 0;
    const error = chalk.redBright(`Error: ${errCode} \u2014`, message);
    process.stderr.write(error);
    process.exit(errCode);
  }

  /**
   * @static Method for Logging Info Message
   * @param {string} messag
   */
  static info(message) {
    const infoString = chalk.cyan(message);
    process.stdout.write(infoString);
  }

  /**
   * @static Methor for Logging Success Message
   * @param {string} message
   */
  static success(message) {
    const successString = chalk.greenBright(message);
    process.stdout.write(successString);
  }
}

module.exports = Logger;
