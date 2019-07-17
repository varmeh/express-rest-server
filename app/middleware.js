const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')

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

/* CORS Handling */
const corsHandling = (req, res, next) => {
	// Specify Clients from which Cross Origin Requests are accepted
	res.setHeader('Access-Control-Allow-Origin', 'localhost:4000, localhost:8080')

	// Specify Methods which are accessible from cross-origin requests
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')

	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

	next()
}

module.exports = app => {
	// Configure logging first
	logger(app)

	app.use(bodyParser.json())
	app.use(corsHandling)
}
