const express = require('express')
const mongoose = require('mongoose')

const { configureMiddlewares } = require('./middlewares')
const integrateRoutes = require('./route.integrator')
const { logError, sendErrorResponse } = require('./error.manager')
const app = express()

configureMiddlewares(app)
integrateRoutes(app)

/* Central Error Handling - Should be done after all the middleware & route configuration */
app.use(logError)
app.use(sendErrorResponse)

const port = process.env.PORT || 4000

const run = async () => {
	try {
		const result = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			poolSize: 10
		})
		console.log(result)
		app.listen(port, () => {
			console.log(`Server on http://localhost:${port}`)
		})
	} catch (error) {
		console.error('Mongoose Connection failed with error', error)
	}
}

run()
