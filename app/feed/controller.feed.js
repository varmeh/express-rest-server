const { validationResult } = require('express-validator')

const { ErrorResponse } = require('../error.manager')
const { Post } = require('../models')

exports.getFeedPosts = async (_req, res, next) => {
	try {
		const posts = await Post.find()
		res.status(200).json({ posts })
	} catch (error) {
		next(
			new ErrorResponse(error.statusCode || 500, error.message, [error.message])
		)
	}
}

exports.createPost = async (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		// We have validation error
		const errorArray = errors
			.array()
			.map(({ value, msg, param }) => `'${param}' has ${msg}: ${value}`)
		return next(new ErrorResponse(422, 'Validation failure', errorArray))
	}

	const { title, content } = req.body
	const post = new Post({
		title,
		content,
		imageUrl: 'data/images/emoji-think.jpeg',
		creator: { name: 'dummy' }
	})
	try {
		const result = await post.save()
		console.log(result)
		res.status(201).json({
			message: 'Post created successfully',
			post: result
		})
	} catch (error) {
		next(new ErrorResponse(500, 'Db Save failure', [error.message]))
	}
}
