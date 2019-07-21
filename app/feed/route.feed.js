const express = require('express')
const { body } = require('express-validator')

const { validationErrorHandler } = require('../error.manager')

const {
	getFeedPosts,
	createPost,
	getPost,
	updatePost,
	deletePost
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
router.post('/post', userPostValidators, validationErrorHandler, createPost)

router.get('/post/:postId', getPost)

router.put(
	'/post/:postId',
	userPostValidators,
	validationErrorHandler,
	updatePost
)

router.delete('/post/:postId', deletePost)

module.exports = router
