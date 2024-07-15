const Listing = require('../models/listing')
const User = require('../models/user')
const { BadRequestError } = require('../errors')
const {StatusCodes} = require('http-status-codes')

const getAllListings = async (req,res) =>{
    const listings = await Listing.find({college: req.body.college}).sort('createdAt')
    res.status(StatusCodes.OK).json({listings, count:listings.length})
}

const createListing = async (req,res) =>{
    req.body.createdBy = req.user.userID

    let listing = await Listing.findOne({createdBy: req.body.createdBy})
    if(listing){
        throw new BadRequestError('User already has an existing listing')
    }

    listing = await Listing.create(req.body)
    res.status(StatusCodes.CREATED).json({listing})
}

module.exports = {
    getAllListings,
    createListing
}