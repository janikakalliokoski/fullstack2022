const Blog = require('../models/blog')
const User = require('../models/user')

const nonExistingId = async () => {
    const blog = new Blog({
        title: 'test blog',
        author: 'tester',
        url: 'test.com'
    })

    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const initialLength = 2

module.exports = {
    nonExistingId,
    blogsInDb,
    usersInDb,
    initialLength
}
