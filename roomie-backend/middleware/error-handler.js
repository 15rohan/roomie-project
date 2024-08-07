const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong, try again later"
    }

    if(err.name === 'ValidationError'){
        customError.msg = Object.values(err.errors)
        .map((item)=> item.message)
        .join(',')
    }

    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate values for ${Object.keys(err.keyValue)} field. Please provide another value.`
        customError.statusCode = StatusCodes.BAD_REQUEST
    }

    return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware