require('dotenv').config()
require('express-async-errors')

//security packages
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const authMiddleware = require('./middleware/authentication')

//routers
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users')

//error handlers
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//security
app.use(
    rateLimiter({
        windowsMs: 15*60*1000,
        max: 100
    })
)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())


//routes
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users', authMiddleware, usersRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 8080;

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, ()=> console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start();