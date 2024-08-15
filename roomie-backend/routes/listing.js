const express = require('express')
const router = express.Router()
const { createListing, getAllListings, deleteListing } = require('../controllers/listing')
const upload = require('../middleware/multer')

router.route('/').post(upload.single('image'),createListing).get(getAllListings)

module.exports = router