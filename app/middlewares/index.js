const express = require('express')
const bodyParser = require('body-parser')

const { terminalLogger, fileLogger } = require('./logger')
const corsHandler = require('./corsHandler')
const { imageLoader, removePublicFromImageUrl } = require('./upload')
const jwtValidator = require('./jwtValidator')

module.exports = app => {
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
