// const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const total = likes.reduce((partialSum, a) => partialSum + a, 0)
    return total
}

const favoriteBlog = (blogs) => {
    const maxLikes = blogs.sort(function(a, b) {return b.likes-a.likes})
    return {
        title: maxLikes[0].title,
        author: maxLikes[0].author,
        likes: maxLikes[0].likes
    }
}

const mostBlogs = (blogs) => {
    const authors = blogs.map(a => a.author)
    const map = authors.reduce(function(a, b) {
        a[b] = ++a[b] || 1
        return a
    }, {})

    return {
        author: Object.keys(map)[0],
        blogs: Object.values(map)[0]
    }
}

const mostLikes = (blogs) => {
    const authors = blogs.map(({ author, likes }) => ({ author, likes }))

    var obj = {}

    for (var i = 0; i < authors.length; i++) {
        obj[authors[i].author] = 0
    }

    for (var j = 0; j < authors.length; j++) {
        obj[authors[j].author] += authors[j].likes
    }

    let sortable = []
    for (var author in obj) {
        sortable.push([author, obj[author]])
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1]
    })

    return {
        author: sortable[0][0],
        likes: sortable[0][1]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}