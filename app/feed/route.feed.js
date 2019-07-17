const express = require('express')

const { getPosts } = require('./controller.feed')
const router = express.Router()

router.get('/posts', getPosts)

module.exports = router
