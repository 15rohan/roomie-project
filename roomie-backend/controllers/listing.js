const Listing = require('../models/listing')
const User = require('../models/user')
const { BadRequestError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const { v4:uuidv4 } = require('uuid')
const sharp = require('sharp')
const{ s3Client, PutObjectCommand } = require('../config/aws')

const getAllListings = async (req, res) => {
    let college_name = req.query.college
    if(!college_name){
        const user = await User.findOne({_id:req.user.userID})
        college_name = user.college_name    
    }
    
    const users = await User.find({college_name}, '_id')
    const userIds = users.map((user) => user.id)

    let listings = await Listing.find({createdBy: {$in:userIds}}).sort('createdAt').populate({
        path: 'createdBy',
        select: '-password -_id -preferences -createdAt -updatedAt -__v'
    })

    res.status(StatusCodes.OK).json({ listings, count: listings.length })
}

const createListing = async (req, res) => {
    const createdBy = req.user.userID
    const image = req.file

    const buffer = await sharp(image.buffer).resize({height: 1920, width: 1080, fit: 'contain'}).toBuffer()
    const key = `${uuidv4()}_${image.originalname}`
    const imageUrl = `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${key}`

    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: image.mimetype
    }

    const command = new PutObjectCommand(params)
    await s3Client.send(command)
    
    // let listing = await Listing.findOne({ createdBy })
    // if (listing) {
    //     throw new BadRequestError('User already has an existing listing')
    // }

    const user = await User.findOne({ _id: createdBy })
    if (!user) {
        throw new BadRequestError('User not found')
    }

    req.body.createdBy = createdBy
    req.body.image = imageUrl
    const listing = await Listing.create(req.body)
    res.status(StatusCodes.CREATED).json({ listing })
}

module.exports = {
    getAllListings,
    createListing
}