/* eslint-disable no-unused-vars */
const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs
        .map(blog => blog.likes)
        .reduce((prev, cur) => {
            return prev + cur
        })
    return total
}

const favoriteBlog = (blogs) => {
    const favorite = blogs
        .reduce((prev, cur) => {
            return prev.likes > cur.likes ? prev : cur
        })

    return favorite
}

const mostBlogs = (blogs) => {
    const blogsCount = _.countBy(blogs, _.iteratee('author'))
    const result = _.reduce(blogsCount, (result, value, key) => {
        return (result['blogs'] < value) 
            ? {'author':key, 'blogs':value} 
            : result
    }, {'author':'', 'blogs':0})
    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}