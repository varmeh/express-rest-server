const fs = require('fs')
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const multer = require('multer')

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
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

	// Specify Methods which are accessible from cross-origin requests
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')

	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

	next()
}

/* Multer configuration */
const imageStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join('public', 'images'))
	},
	filename: (req, file, cb) => {
		cb(null, new Date().toISOString() + '-' + file.originalname)
	}
})

const imageFilter = (req, file, cb) => {
	cb(
		null,
		file.mimetype == 'image/png' ||
			file.mimetype == 'image/jpg' ||
			file.mimetype == 'image/jpeg'
	)
}

module.exports = app => {
	// Configure logging first
	logger(app)

	app.use(bodyParser.json())
	app.use(corsHandling)

	app.use(
		multer({ storage: imageStorage, fileFilter: imageFilter }).single('image')
	)

	/* Static data handling - relative path will be travesed in public folder to search data */
	app.use(express.static('public'))
}
