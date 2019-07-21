const path = require('path')
const multer = require('multer')

/* Multer configuration */
const imageStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join('public', 'images'))
	},
	filename: (req, file, cb) => {
		cb(null, new Date().toISOString() + '-' + file.originalname)
	}
})

const imageFilter = (req, file, cb) => {
	cb(
		null,
		file.mimetype == 'image/png' ||
			file.mimetype == 'image/jpg' ||
			file.mimetype == 'image/jpeg'
	)
}

exports.imageLoader = multer({
	storage: imageStorage,
	fileFilter: imageFilter
}).single('image')

/*  Hack: change path for imageUrl
    req.file.path is used as input in imageUrl.
	If used directly, it would add public word to url as well - public/images/</image-name>.
	Logic removes `public` here, so that all static data search has usable relative path - images/</image-name> */
exports.removePublicFromImageUrl = (req, res, next) => {
	if (req.file) {
		req.file.path = req.file.path.replace('public/', '')
	}
	next()
}
