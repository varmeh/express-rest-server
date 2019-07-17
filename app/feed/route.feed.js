const express = require('express')

const { getPosts, createPost } = require('./controller.feed')
const router = express.Router()

router.get('/posts', getPosts)

router.post('/post', createPost)

module.exports = router
