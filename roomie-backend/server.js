require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const connectDB = require('./db/connect')

const authRouter = require('./routes/auth');

app.use(express.json())

//routes
app.use('/api/v1/auth',authRouter)

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