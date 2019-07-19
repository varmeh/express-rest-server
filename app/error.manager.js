/* Log Error Information for the production enginer */
exports.logError = (error, _req, _res, next) => {
	console.error(error.stack)
	next(error)
}

/* Send Error Response to client */
exports.errorResponse = (error, _req, res, _next) => {
	const { statusCode, message, errors } = error
	res.status(statusCode).json({ message, errors })
}

/* Standardized Error */
exports.ErrorResponse = class extends Error {
	constructor(statusCode = 500, message = '', errors = []) {
		super(message)

		// Ensure the name of this error is the same as the class name
		this.name = this.constructor.name

		this.statusCode = statusCode
		this.errors = errors
	}
}
