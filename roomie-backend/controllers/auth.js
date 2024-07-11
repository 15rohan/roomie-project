const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    if(req.body.password.length < 8){
        throw new BadRequestError('Password must be atleast 8 characters')
    }
    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    //compare pass
    const correctPass = await user.comparePassword(password)
    if (!correctPass) {
        throw new UnauthenticatedError('Invalid Password')
    }
    const token = user.createJWT()
    res.status(200).json({ user: { name: user.name }, token })
}

const logout = async (req,res) => {
    res.status(200).send('Logged Out')
}

module.exports = { register, login, logout }