/* eslint-disable no-unused-vars */
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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}