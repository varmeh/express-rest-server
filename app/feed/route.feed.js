const express = require('express')
const { body } = require('express-validator')

const { getPosts, createPost } = require('./controller.feed')
const router = express.Router()

router.get('/posts', getPosts)

const userPostValidators = [
	body('title')
		.trim()
		.isString()
		.isLength({ min: 5 }),
	body('content')
		.trim()
		.isLength({ min: 5 })
]
router.post('/post', userPostValidators, createPost)

module.exports = router
