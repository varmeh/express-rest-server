const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')

module.exports = app => {
	// Configure logging first
	logger(app)

	app.post(bodyParser.json())
}

/* Logging Configuration */
function logger(app) {
	// Log on Terminal
	app.use(morgan('common'))

	// Log in file (in append mode)
	var accessLogStream = fs.createWriteStream(
		path.join(__dirname, '..', 'server.log'),
		{
			flags: 'a'
		}
	)
	app.use(morgan('combined', { stream: accessLogStream }))
}
