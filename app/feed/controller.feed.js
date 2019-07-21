const fs = require('fs')
const path = require('path')

const { ErrorResponse } = require('../error.manager')
const { Post, User } = require('../models')

const POSTS_PER_PAGE = 2
exports.getFeedPosts = async (req, res, next) => {
	const currentPage = req.query.page || 1
	try {
		const totalItems = await Post.find().countDocuments()
		const posts = await Post.find()
			.skip((currentPage - 1) * POSTS_PER_PAGE)
			.limit(POSTS_PER_PAGE)
		res.status(200).json({ posts, totalItems })
	} catch (error) {
		next(
			new ErrorResponse(error.statusCode || 500, error.message, [error.message])
		)
	}
}

exports.createPost = async (req, res, next) => {
	if (!req.file) {
		return next(
			new ErrorResponse(422, 'No image provided', ['Please select an image.'])
		)
	}

	const { title, content } = req.body
	const post = new Post({
		title,
		content,
		imageUrl: req.file.path,
		creator: req.userId
	})
	try {
		// Add post reference to User model
		const user = await User.findById(req.userId)

		const result = await post.save()
		console.log(result)

		user.posts.push(post)
		await user.save()

		res.status(201).json({
			message: 'Post created successfully',
			post: result,
			creator: {
				_id: user._id,
				name: user.name
			}
		})
	} catch (error) {
		next(new ErrorResponse(500, 'Db Save failure', [error.message]))
	}
}

exports.getPost = async (req, res, next) => {
	const { postId } = req.params
	try {
		const post = await Post.findById(postId)
		if (!post) {
			return next(
				new ErrorResponse(404, 'Post not found!', ['Post not found!'])
			)
		}
		res.status(200).json({ post })
	} catch (error) {
		next(
			new ErrorResponse(error.statusCode || 500, error.message, [error.message])
		)
	}
}

exports.updatePost = async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.postId)
		if (!post) {
			const errorMessage = 'Post not found!'
			return next(new ErrorResponse(404, errorMessage, [errorMessage]))
		}

		if (post.creator.toString() !== req.userId) {
			const errorMessage = 'Not authorized.'
			return next(new ErrorResponse(403, errorMessage, [errorMessage]))
		}

		const { title, content } = req.body
		post.title = title
		post.content = content

		if (req.file) {
			// Delete old image
			clearImage(post.imageUrl)

			// User has provided new image
			post.imageUrl = req.file.path
		}
		const result = await post.save()
		res.status(200).json({ post: result })
	} catch (error) {
		next(new ErrorResponse(500, 'Server Issue', [error.message]))
	}
}

exports.deletePost = async (req, res, next) => {
	const { postId } = req.params
	try {
		const post = await Post.findById(postId)

		if (!post) {
			return next(
				new ErrorResponse(404, 'Post not found!', ['Post not found!'])
			)
		}

		if (post.creator.toString() !== req.userId) {
			const errorMessage = 'Not authorized.'
			return next(new ErrorResponse(403, errorMessage, [errorMessage]))
		}

		clearImage(post.imageUrl)
		const result = await Post.findByIdAndRemove(postId)
		res.status(200).json({ post: result })
	} catch (error) {
		next(new ErrorResponse(500, 'Server Issue', [error.message]))
	}
}

const clearImage = filePath => {
	filePath = path.join(__dirname, '..', '..', 'public', filePath)
	console.log(`Deleting file: ${filePath}`)
	fs.unlink(filePath, err => console.error(err))
}
