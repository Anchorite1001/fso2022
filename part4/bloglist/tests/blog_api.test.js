const _ = require('lodash')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const testingLists = require('./BlogList')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    
    const blogObjects = testingLists.blogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

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

test('a new blog is added', async () => {
    const newBlog = {
        _id: '5a422a851b54a676234c17e7',
        title: 'React patterns Renewal',
        author: 'Michael Chan',
        url: 'https://reactpatternsrenewal.com/',
        likes: 7,
        __v: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map( blog => blog.title)

    expect(response.body).toHaveLength(testingLists.blogs.length + 1)
    expect(titles).toContain(
        'React patterns Renewal'
    )
})

test ('if the likes property of new blog is missing during creation, it would be set to 0', async () => {
    const newBlog = {
        _id: '5a422a851b54a676234c17e7',
        title: 'React patterns Renewal',
        author: 'Michael Chan',
        url: 'https://reactpatternsrenewal.com/',
        __v: 0
    }

    const response = await api.post('/api/blogs').send(newBlog)

    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toBe(0)
})

test ('if the title is missing, the backend would respond 400 bad request and no blog entry would be created', async () => {
    const newBlog = {
        url: 'https://reactpatternsrenewal.com/'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

}, 10000)

test ('if the url is missing, the bakcend would respond 400 bad request and no blog entry would be created', async () => {
    const newBlog = {
        author: 'Michael Chan'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
}, 10000)

afterAll(() => {
    mongoose.connection.close()
})