const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require('cors')

const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')

mongoose.connect(config.MONGODB_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app