const Listing = require('../models/listing')
const User = require('../models/user')
const { BadRequestError } = require('../errors')
const {StatusCodes} = require('http-status-codes')

const getAllListings = async (req,res) =>{
    const listings = await Listing.find({college: req.body.college}).sort('createdAt')
    res.status(StatusCodes.OK).json({listings, count:listings.length})
}

const createListing = async (req,res) =>{
    const createdBy = req.user.userID

    let listing = await Listing.findOne({createdBy})
    if(listing){
        throw new BadRequestError('User already has an existing listing')
    }

    const user = await User.findOne({_id: createdBy})
    if(!user){
        throw new BadRequestError('User not found')
    }

    req.body.createdBy = createdBy;
    req.body.college_name = user.college_name
    req.body.gender = user.gender
    listing = await Listing.create(req.body)
    res.status(StatusCodes.CREATED).json({listing})
}

module.exports = {
    getAllListings,
    createListing
}