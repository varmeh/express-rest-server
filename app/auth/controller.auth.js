const bcrypt = require('bcryptjs')

const { User } = require('../models')

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
