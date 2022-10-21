const appRoot = require('app-root-path')
const winston = require('winston')
const fs = require('fs')
require('winston-daily-rotate-file')
const winstonConfig = require('../config/winston')

const logDirectory = winstonConfig.logDirectory

// create directory if it is not present
if (!fs.existsSync(logDirectory)) {
  // Create the directory if it does not exist
  fs.mkdirSync(logDirectory)
}

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
  transports: [
    new winston.transports.DailyRotateFile(winstonConfig.file),
    new winston.transports.Console(winstonConfig.console)
  ],
  exitOnError: false // do not exit on handled exceptions
})

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message)
  }
}

module.exports = logger
