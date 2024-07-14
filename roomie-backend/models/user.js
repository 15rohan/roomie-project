const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 4,
        maxlength: 30
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provdide valid email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 8
    },
    age: {
        type: Number,
        required: [true, 'Please enter age'],
        min: 18,
        max: 30
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: [true, 'Please enter gender']
    },
    college_name: {
        type: String,
        required: [true, 'Please provide college name'],
        enum: ['VIT', 'SRM', 'BITS']
    },
    preferences: {
        type: mongoose.Types.ObjectId,
        ref: 'Preference'
    }
}, { timestamps: true })

UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

UserSchema.methods.createJWT = function () {
    const payload = { userID: this._id, name: this.name, email: this.email }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}

module.exports = mongoose.model('User', UserSchema)