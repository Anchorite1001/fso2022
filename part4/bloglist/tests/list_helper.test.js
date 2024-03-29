const testingLists = require('./BlogList')
const listHelper = require('../utils/list_helper')

describe('dummy', () => {
    test('dummy returns one', () => {
        const result = listHelper.dummy(testingLists.blogs)
        expect(result).toBe(1)
    })
})

describe('totalLikes', () => {
    
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(testingLists.listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has multiple blogs, equals the likes of all blogs', () => {
        const result = listHelper.totalLikes(testingLists.blogs)
        expect(result).toBe(36)
    })
})

describe('favoriteBlog', () => {
    test('when list has only one blog, equals it', () => {
        const result = listHelper.favoriteBlog(testingLists.listWithOneBlog)
        expect(result).toEqual({
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        })
    })

    test('when list has multiple blogs, equals the one with the most likes', () => {
        const result = listHelper.favoriteBlog(testingLists.blogs)
        expect(result).toEqual({
            _id: '5a422b3a1b54a676234d17f9',
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
            __v: 0
        })
    })
})

describe('mostBlogs', () => {
    test('when list has one blog, equals that author and number of blogs', () => {
        const result = listHelper.mostBlogs(testingLists.listWithOneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1
        })
    }) 

    test('when list has multiple blogs, equals an object with author with most blogs and the count of blogs', () => {
        const result = listHelper.mostBlogs(testingLists.blogs)
        expect(result).toEqual({
            author: 'Robert C. Martin',
            blogs: 3
        })
    })
})

describe('mostLikes', () => {
    test('when list has one blog, equals an object with the author and likes', () => {
        const result = listHelper.mostLikes(testingLists.listWithOneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    test('when list has multiple blogs, equals the author with most likes and the count of likes', () => {
        const result = listHelper.mostLikes(testingLists.blogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17
        })
    })
})