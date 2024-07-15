const express = require('express')
const router = express.Router()
const { createListing, getAllListings, deleteListing } = require('../controllers/listing')

router.route('/').post(createListing).get(getAllListings)

module.exports = router