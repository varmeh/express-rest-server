const express = require('express')
const { body } = require('express-validator')

const { jwtValidator } = require('../middlewares')
const { validationErrorHandler } = require('../error.manager')

const {
	getFeedPosts,
	createPost,
	getPost,
	updatePost,
	deletePost
} = require('./controller.feed')

const router = express.Router()

router.get('/posts', jwtValidator, getFeedPosts)

const userPostValidators = [
	body('title')
		.trim()
		.isString()
		.isLength({ min: 5 }),
	body('content')
		.trim()
		.isLength({ min: 5 })
]
router.post(
	'/post',
	jwtValidator,
	userPostValidators,
	validationErrorHandler,
	createPost
)

router.get('/post/:postId', jwtValidator, getPost)

router.put(
	'/post/:postId',
	jwtValidator,
	userPostValidators,
	validationErrorHandler,
	updatePost
)

router.delete('/post/:postId', jwtValidator, deletePost)

module.exports = router
