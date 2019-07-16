const express = require('express')
const configureMiddlewares = require('./middleware')

const app = express()
configureMiddlewares(app)

const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log(`Server on http://localhost:${port}`)
})
