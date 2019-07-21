const jwt = require('jsonwebtoken')
const { ErrorResponse } = require('../error.manager')

module.exports = (req, res, next) => {
	const errorMessage = 'Not Authenticated.'

	const authHeader = req.get('Authorization')
	if (!authHeader) {
		throw new ErrorResponse(400, errorMessage, [errorMessage])
	}

	const token = authHeader.split(' ')[1]
	let decodedToken
	try {
		decodedToken = jwt.verify(token, process.env.JWT_SECRET)
	} catch (error) {
		throw new ErrorResponse(500, error.message, [error.message])
	}

	// We have a valid token, but decoding fails in which case decodedToken is undefined
	if (!decodedToken) {
		throw new ErrorResponse(401, errorMessage, [errorMessage])
	}

	req.userId = decodedToken.userId
	next()
}
