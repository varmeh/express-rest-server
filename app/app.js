const express = require('express')
const mongoose = require('mongoose')

const configureMiddlewares = require('./middleware')
const integrateRoutes = require('./route.integrator')

const app = express()

configureMiddlewares(app)
integrateRoutes(app)

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
