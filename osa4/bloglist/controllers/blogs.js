const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (req, res) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })

    res.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body

    const user = request.user

    const blog = new Blog({
        url: body.url,
        title: body.title,
        author: body.author,
        user: user,
        likes: body.likes || 0
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    const user = request.user

    if ( blog === null ) {
        return response.status(401).json({ error: 'Blog already deleted' })
    }

    if ( blog.user.toString() === user.id.toString() ) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        return response.status(401).json({ error: 'You can only delete your own blogs' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = await Blog.findByIdAndUpdate(
        request.params.id, body, { new: true }
    )
    response.status(201).json(blog)
})

module.exports = blogsRouter
