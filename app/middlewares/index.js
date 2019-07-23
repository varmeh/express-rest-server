const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const { terminalLogger, fileLogger } = require('./logger')
const corsHandler = require('./corsHandler')
const { imageLoader, removePublicFromImageUrl } = require('./upload')

const jwtValidator = require('./jwtValidator')

exports.configureMiddlewares = app => {
	// Secure your express api with helmet
	app.use(helmet())

	// Configure logging first
	app.use(terminalLogger)
	app.use(fileLogger)

	app.use(bodyParser.json())
	app.use(corsHandler)

	// Run JWT validation on all except auth routes
	app.get('/feed/posts', jwtValidator)

	app.use('/feed/post', imageLoader, removePublicFromImageUrl)

	/* Static data handling - relative path will be travesed in public folder to search data */
	app.use(express.static('public'))
}

/* 	Jwt Validation
	app.use(jwtValidator) not possible as it works for all http methods including OPTIONS 
	(send by browser authomatically for CORS validation - to check allowed url, methods & headers).
	So, add specifically to required methods
*/
exports.jwtValidator = jwtValidator
