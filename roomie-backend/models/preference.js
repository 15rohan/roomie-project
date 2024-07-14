const mongoose = require('mongoose')

const PreferenceSchema = new mongoose.Schema({
    sports: {
        type: Boolean,
        default: false
    },
    gym: {
        type: Boolean,
        default: false
    },
    gamer: {
        type: Boolean,
        default: false
    },
    travel: {
        type: Boolean,
        default: false
    },
    smoker: {
        type: Boolean,
        default: false
    },
    drinker: {
        type: Boolean,
        default: false
    },
    pets: {
        type: Boolean,
        default: false
    },
    vegan: {
        type: Boolean,
        default: false
    },
}, { unique: true })

module.exports = mongoose.model('Preference', PreferenceSchema)