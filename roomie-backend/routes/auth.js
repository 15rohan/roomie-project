const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/authentication')
const {register,login,verifyToken} = require('../controllers/auth')

router.post('/register',register)
router.post('/login',login)
router.get('/verifyToken', authMiddleware, verifyToken);

module.exports = router