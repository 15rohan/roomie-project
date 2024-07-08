const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    res.status(200).send('Register User')
}

const login = async (req, res) => {
    res.status(200).send('Login User')
}

module.exports = { register, login }