const _ = require('lodash')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blog has unique identifier id', async () => {
    const response = await api.get('/api/blogs')
    const testRandom = response.body[_.random(0, response.body-1)]

    expect(testRandom.id).toBeDefined()
})

afterAll(() => {
    mongoose.connection.close()
})