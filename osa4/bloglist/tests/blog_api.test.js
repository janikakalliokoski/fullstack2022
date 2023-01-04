const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    const saltRounds = 10
    const passwordHash = await bcrypt.hash('salasana', saltRounds)
    const user = new User({ username: 'tester', passwordHash })
    await user.save()

    await Blog.deleteMany({})
    const firstBlog = new Blog({
        url: 'test.com',
        title: 'test blog',
        author: 'supertester',
        user: user.id,
        likes: 10
    })
    await firstBlog.save()
    const secondBlog = new Blog({
        url: 'test2.com',
        title: 'test blog 2',
        author: 'supertester2',
        user: user.id
    })
    await secondBlog.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialLength)
})

test('the identifier is id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
    })
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'test blog',
        author: 'tester',
        url: 'google.com',
        likes: 0
    }

    const loggedUser = {
        username: 'tester',
        password: 'salasana'
    }

    const response = await api
        .post('/api/login')
        .send(loggedUser)
        .expect(200)

    const token = response._body.token

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(r => r.title)

    expect(blogsAtEnd).toHaveLength(helper.initialLength + 1)
    expect(titles).toContain(
        'test blog'
    )
})

test('blog without title and url is not added', async () => {
    const newBlog = {
        author: 'jee'
    }

    const loggedUser = {
        username: 'tester',
        password: 'salasana'
    }

    const response = await api
        .post('/api/login')
        .send(loggedUser)
        .expect(200)

    const token = response._body.token

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialLength)
})

test('if likes are not given, blog has 0 likes', async() => {
    const newBlog = {
        title: 'test blog',
        author: 'tester',
        url: 'google.com',
    }

    const loggedUser = {
        username: 'tester',
        password: 'salasana'
    }

    const response = await api
        .post('/api/login')
        .send(loggedUser)
        .expect(200)

    const token = response._body.token

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const likes = blogsAtEnd.map(r => r.likes)

    expect(blogsAtEnd).toHaveLength(helper.initialLength + 1)
    expect(likes.at(-1)).toBe(0)
})

test('blog can be deleted by id', async () => {
    const loggedUser = {
        username: 'tester',
        password: 'salasana'
    }

    const response = await api
        .post('/api/login')
        .send(loggedUser)
        .expect(200)

    const token = response._body.token

    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
        helper.initialLength - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
})

test('blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedLikes = {
        likes: 100
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedLikes)
        .expect(201)

    const blogsAtEnd = await helper.blogsInDb()

    const likes = blogsAtEnd.map(r => r.likes)

    expect(blogsAtEnd).toHaveLength(helper.initialLength)
    expect(likes.at(0)).toBe(100)
})

afterAll(() => {
    mongoose.connection.close()
})

test('if login token is incorrect, return 401', async () => {
    const newBlog = {
        title: 'test blog',
        author: 'tester',
        url: 'google.com',
        likes: 0
    }

    const token = 'abcd'

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialLength)
})
