const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {content: 1, url: 1})
    return response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const {username, name, password} = request.body

    if (password === '' || password.length < 3) {
        return response.status(400).json({
            error: 'password must be at least 3 characters long'
        })
    }

    const existingUser = await User.findOne( {username} )
    if (existingUser) {
        return response.status(400).json({
            error: 'Username is taken'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
        username,
        name, 
        passwordHash
    })

    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter