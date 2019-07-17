const express = require('express')
const router = express.Router()

router.get('/posts', (req, res) => {
	res.json({ hello: 'world' })
})

module.exports = router
