const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message})
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        request.token = authorization.substring(7)
    }
    else {
        request.token = ''
    }

    next()
}

const userExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    let token = ''
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)
    request.user = decodedToken.id ? decodedToken.id : null

    next()
}

module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
}