const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { User } = require('../models')
const { ErrorResponse } = require('../error.manager')

exports.signup = async (req, res, next) => {
	const { email, name, password } = req.body

	try {
		const hashedPassword = await bcrypt.hash(password, 12)
		const user = new User({ email, name, password: hashedPassword })
		const result = await user.save()
		res.status(201).json({ message: 'User created', userId: result._id })
	} catch (error) {
		next(
			new ErrorResponse(error.statusCode || 500, error.message, [error.message])
		)
	}
}

exports.login = async (req, res, next) => {
	const { email, password } = req.body
	const errorMessage = 'Invalid email/password'

	try {
		const user = await User.findOne({ email })
		// If user with email does not exist
		if (!user) {
			return next(new ErrorResponse(401, errorMessage, [errorMessage]))
		}

		// Validate password
		const isEqual = await bcrypt.compare(password, user.password)
		if (!isEqual) {
			// Password mis-match
			return next(new ErrorResponse(401, errorMessage, [errorMessage]))
		}

		// Generate JWT (JSON Web Token)
		const userId = user._id.toString()
		const token = jwt.sign({ email, userId }, process.env.JWT_SECRET, {
			expiresIn: '1h'
		})

		res.status(200).json({ token, userId })
	} catch (error) {
		next(
			new ErrorResponse(error.statusCode || 500, error.message, [error.message])
		)
	}
}
