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

exports.createPost = (req, res) => {
	const { title, content } = req.body
	// TODO: Create posts in db
	res.status(201).json({
		status: 'Post created successfully',
		post: {
			_id: new Date().toISOString(),
			title,
			content,
			creator: {
				name: 'dummyA'
			},
			createdAt: new Date()
		}
	})
}
