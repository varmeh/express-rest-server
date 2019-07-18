const express = require('express')
const configureMiddlewares = require('./middleware')
const integrateRoutes = require('./route.integrator')

const app = express()

configureMiddlewares(app)
integrateRoutes(app)

const port = process.env.PORT || 4000

app.listen(port, () => {
	console.log(`Server on http://localhost:${port}`)
})
