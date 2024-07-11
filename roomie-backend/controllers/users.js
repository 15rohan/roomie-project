const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')

const getAllUsers = async (req,res) =>{
    const users = await User.find()
    res.status(StatusCodes.OK).json({users})
}

module.exports = getAllUsers