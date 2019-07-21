const express = require('express')
const { body } = require('express-validator')

const { User } = require('../models')
const { validationErrorHandler } = require('../error.manager')
const { signup } = require('./controller.auth')

const router = express.Router()

const signupValidator = [
	body('email')
		.trim()
		.isEmail()
		.withMessage('Please enter a valid email.')
		.custom((value, { req }) => {
			// check if email already exist
			return User.findOne({ email: value }).then(userDoc => {
				if (userDoc) {
					return Promise.reject('Email already exists!')
				}
			})
		})
		.normalizeEmail(),
	body('password')
		.trim()
		.isLength({ min: 6 }),
	body('name')
		.trim()
		.not()
		.isEmpty()
]
router.post('/signup', signupValidator, validationErrorHandler, signup)

module.exports = router
