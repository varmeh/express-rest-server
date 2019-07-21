const feedRoutes = require('./feed/route.feed')
const authRoutes = require('./auth/route.auth')

module.exports = app => {
	app.use('/feed', feedRoutes)
	app.use('/auth', authRoutes)
}
