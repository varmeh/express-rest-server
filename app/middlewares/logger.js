const fs = require('fs')
const path = require('path')
const morgan = require('morgan')

/* File Logging Configuration */
const accessLogStream = fs.createWriteStream(
	path.join(__dirname, '..', 'server.log'),
	{
		flags: 'a'
	}
)

exports.terminalLogger = morgan('common')
exports.fileLogger = morgan('combined', { stream: accessLogStream })
