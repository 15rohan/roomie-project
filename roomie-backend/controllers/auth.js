const User = require('../models/user')
const Preference = require('../models/preference')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const { addToBlacklist } = require('../utils/blacklist')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { password, preferences } = req.body

    if (password.length < 8) {
        throw new BadRequestError('Password must be atleast 8 characters')
    }

    let preferenceDoc = await Preference.findOne(preferences)
    if (!preferenceDoc) {
        preferenceDoc = await Preference.create(preferences)
    }
    req.body.preferences = preferenceDoc._id;

    const user = await User.create({ ...req.body })
    res.status(StatusCodes.CREATED).json({ message: 'User registered successfully', user: { name: user.name } })
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
    res.status(200).json({ user: { name: user.name, college_name: user.college_name }, token })
}

const logout = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]
    await addToBlacklist(token)
    res.status(StatusCodes.OK).json({ message: 'Logged out successfully' })
}

const verifyToken = async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: 'Token is valid' })
}

module.exports = { register, login, logout, verifyToken }