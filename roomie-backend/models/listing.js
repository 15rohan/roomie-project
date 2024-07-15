const mongoose = require('mongoose')

const ListingSchema = new mongoose.Schema({
    room: {
        type: String,
        required: [true, 'Please provide room details']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    college:{
        type: String,
        enum: ['VIT','SRM','BITS'],
        required: [true,'Please provide your college']
    },
    location: {
        type: String,
        required: [true, 'Please provide location']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Listing', ListingSchema)