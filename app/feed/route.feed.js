const express = require('express')
const { body } = require('express-validator')

const {
	getFeedPosts,
	createPost,
	getPost,
	updatePost
} = require('./controller.feed')
const router = express.Router()

router.get('/posts', getFeedPosts)

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

router.get('/post/:postId', getPost)

router.put('/post/:postId', userPostValidators, updatePost)

module.exports = router
