const { validationResult } = require('express-validator')

const { Post } = require('../models')

exports.getPosts = (req, res) => {
	res.status(200).json({
		posts: [
			{
				_id: '1',
				title: 'First Post',
				content: 'This is first post!',
				imageUrl: 'data/images/emoji-think.jpeg',
				creator: {
					name: 'vax'
				},
				createdAt: new Date()
			}
		]
	})
}

exports.createPost = async (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		// We have validation error
		res
			.status(422)
			.json({ message: 'Validation failed', errors: errors.array() })
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
		console.error('Error in saving Post to db:', error)
		res.status(500).json({
			error: error.message
		})
	}
}
