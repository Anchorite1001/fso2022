const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}, 'title author url likes')
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const newBlog = request.body
    if (!newBlog.title || !newBlog.url) {
        return response.status(400).end()
    }

    newBlog.likes = newBlog.likes ? newBlog.likes : 0
    const blog = new Blog(newBlog)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const {title, author, url, likes} = request.body
    const updatedBlog = {
        title,
        author,
        url,
        likes
    }

    const savedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new:true, context: 'query'})
    response.json(savedBlog)
})

module.exports = blogsRouter