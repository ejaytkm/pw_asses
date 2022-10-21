const appRoot = require('app-root-path')

const logDirectory = `${appRoot}/logs`

// define the custom settings for each transport (file, console)
const options = {
  logDirectory: logDirectory,
  file: {
    level: 'debug',
    filename: logDirectory + '/%DATE%-log.log',
    datePattern: 'YYYY-MM-DD',
    handleExceptions: true,
    json: true,
    maxsize: '20mb', // 5MB
    maxFiles: '30d',
    colorize: true
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
}

module.exports = options
