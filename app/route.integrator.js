const feedRoutes = require('./feed/route.feed')

module.exports = app => {
	app.use(feedRoutes)
}
