/* CORS Handling */
module.exports = (req, res, next) => {
	// Specify Clients from which Cross Origin Requests are accepted
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')

	// Specify Methods which are accessible from cross-origin requests
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')

	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

	next()
}
