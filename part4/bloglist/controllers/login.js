const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const {username, password} = request.body

    const user = await User.findOne({username})
    const passwordCorrect = user 
        ? await bcrypt.compare(password, user.passwordHash) 
        : false

    if (!(user && passwordCorrect)) {
        return response.status(401)
            .json({error: 'invalid username or password'})
    }

    const userForToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
    return response.status(200).json({token, username, name: user.name})
})

module.exports = loginRouter