exports.getPosts = (req, res) => {
	res.status(200).json({
		posts: [
			{ title: '1st Post', content: 'This is first post!' },
			{ title: '2nd Post', content: 'This is 2nd post!' }
		]
	})
}

exports.createPost = (req, res) => {
	const { title, content } = req.body
	// TODO: Create posts in db
	res.status(201).json({
		status: 'Post created successfully',
		post: {
			id: new Date().toISOString(),
			title,
			content
		}
	})
}
