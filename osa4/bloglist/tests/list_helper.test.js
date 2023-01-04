const listHelper = require('../utils/list_helper')

const listOfBlogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f9',
        title: 'janikan blogi',
        author: 'janika',
        url: 'google.com',
        likes: 1,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f5',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'example.html',
        likes: 12,
        __v: 0
    }
]

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
})

describe('max likes', () => {
    test('max likes equals to blog with most likes', () => {
        const result = listHelper.favoriteBlog(listOfBlogs)
        expect(result).toEqual({
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        })
    })
})

describe('most blogs', () => {
    test('most blogs equals to author with most blogs', () => {
        const result = listHelper.mostBlogs(listOfBlogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 2
        })
    })
})

describe('most blogs authors likes', () => {
    test('most blogs likes equals to author and likes of most blogs', () => {
        const result = listHelper.mostLikes(listOfBlogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17
        })
    })
})