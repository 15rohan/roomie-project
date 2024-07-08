const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,'Please provide name'],
        minlength: 4,
        maxlength: 30
    },
    email:{
        email: {
            type: String,
            required: [true, 'Please provide email'],
            match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provdide valid email'],
            unique: true,
        },
    },
    password:{
        type: String,
        required:[true,'Please provide password'],
        minlength: 8
    }
})

module.exports = mongoose.model('User',UserSchema)