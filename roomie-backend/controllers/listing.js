const Listing = require('../models/listing')
const User = require('../models/user')
const { BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const getAllListings = async (req, res) => {
    const users = await User.find({college_name: req.query.college}, '_id')
    const userIds = users.map((user) => user.id)

    let listings = await Listing.find({createdBy: {$in:userIds}}).sort('createdAt').populate({
        path: 'createdBy',
        select: '-password -_id -preferences -createdAt -updatedAt -__v'
    })

    res.status(StatusCodes.OK).json({ listings, count: listings.length })
}

const createListing = async (req, res) => {
    const createdBy = req.user.userID

    let listing = await Listing.findOne({ createdBy })
    if (listing) {
        throw new BadRequestError('User already has an existing listing')
    }

    const user = await User.findOne({ _id: createdBy })
    if (!user) {
        throw new BadRequestError('User not found')
    }

    req.body.createdBy = createdBy
    listing = await Listing.create(req.body)
    res.status(StatusCodes.CREATED).json({ listing })
}

module.exports = {
    getAllListings,
    createListing
}