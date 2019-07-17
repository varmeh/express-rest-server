exports.getPosts = (req, res) => {
	res.status(200).json({
		posts: [
			{ title: '1st Post', content: 'This is first post!' },
			{ title: '2nd Post', content: 'This is 2nd post!' }
		]
	})
}
