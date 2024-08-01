const mongoose = require('mongoose')

const ListingSchema = new mongoose.Schema({
    room: {
        type: String,
        required: [true, 'Please provide room details']
    },
    contact: {
        type: String,
        required: [true, 'Please provide contact number'],
        match: [/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, 'Please provide a valid contact number']
    },
    accomodation: {
        type: String,
        required: [true, 'Please provide accomodation type']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Listing', ListingSchema)