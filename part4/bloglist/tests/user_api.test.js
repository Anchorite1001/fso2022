const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')
const helper = require('./helper')

const api = supertest(app)

describe ('where there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash})

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'passer',
            name: 'passer here',
            password: 'passpass'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        const usernames = usersAtEnd.map(user => user.username)

        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        expect(usernames).toContain(newUser.username)

    })
})

afterAll(() => {
    mongoose.connection.close()
})