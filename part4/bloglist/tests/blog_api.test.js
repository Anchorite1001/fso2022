const _ = require('lodash')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { set } = require('../app')
const app = require('../app')
const Blog = require('../models/blog')
const testingLists = require('./BlogList')

const api = supertest(app)

let auth = {}

beforeAll(async () => {
    await Blog.deleteMany({})
    
    const blogObjects = testingLists.blogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

beforeEach(async () => {
    const response = await api
        .post('/api/login')
        .send({
            username: 'root',
            password: 'sekret'
        })
    
    auth.token = 'bearer ' + response.body.token
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .set('authorization', auth.token)
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blog has unique identifier id', async () => {
    const response = await api
        .get('/api/blogs')
        .set('authorization', auth.token)
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
        .set('authorization', auth.token)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api
        .get('/api/blogs')
        .set('authorization', auth.token)
    const titles = response.body.map( blog => blog.title)

    expect(response.body).toHaveLength(testingLists.blogs.length + 1)
    expect(titles).toContain(
        'React patterns Renewal'
    )
})

test ('if the likes property of new blog is missing during creation, it would be set to 0', async () => {
    const newBlog = {
        _id: '5a422a851b54a676234c17e8',
        title: 'React patterns Renewal Update',
        author: 'Michael Chan',
        url: 'https://reactpatternsrenewal.com/',
        __v: 0
    }

    const response = await api
        .post('/api/blogs')
        .set('authorization', auth.token)
        .send(newBlog)

    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toBe(0)
})

test ('if the title is missing, the backend would respond 400 bad request and no blog entry would be created', async () => {
    const newBlog = {
        url: 'https://reactpatternsrenewal.com/'
    }

    await api
        .post('/api/blogs')
        .set('authorization', auth.token)
        .send(newBlog)
        .expect(400)

}, 10000)

test ('if the url is missing, the backend would respond 400 bad request and no blog entry would be created', async () => {
    const newBlog = {
        author: 'Michael Chan'
    }

    await api
        .post('/api/blogs')
        .set('authorization', auth.token)
        .send(newBlog)
        .expect(400)
}, 10000)

test ('if the correct token is not provided, the backend would respond 401 bad request and the blog would not be created', async() => {
    const newBlog = {
        author: 'Michael Chan',
        url: 'https://reactpatternsrenewal.com/',
    }

    await api
        .post('/api/blogs')
        .set('authorization', 'bearer ')
        .send(newBlog)
        .expect(401)
})

test ('delete a note', async () => {
    //const noteToDelete = testingLists.blogs[0]

    await api
        .delete('/api/blogs/5a422a851b54a676234c17e7')
        .set('authorization', auth.token)
        .expect(204)

    const response = await api
        .get('/api/blogs')
        .set('authorization', auth.token)
    const titles = response.body.map(blog => blog.title)

    expect(response.body).toHaveLength(testingLists.blogs.length+1+1-1)
    expect(titles).not.toContain('React patterns Renewal')
})

test ('update a blog', async () => {
    const newBlog = {
        _id: '5a422a851b54a676234c17e8',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 10,
        __v: 0
    }

    await api
        .put(`/api/blogs/${newBlog._id}`)
        .set('authorization', auth.token)
        .send(newBlog)
        .expect('Content-Type', /application\/json/)
    
    const response = await api
        .get('/api/blogs')
        .set('authorization', auth.token)
    expect(response.body.find(blog => blog.id === newBlog._id)['likes']).toBe(10)
})

afterAll(() => {
    auth={}
    mongoose.connection.close()
})