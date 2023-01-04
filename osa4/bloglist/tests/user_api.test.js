// const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const passwordHash2 = await bcrypt.hash('salainen', 10)

    const initialUsers = [
        {
            username: 'janika123',
            name: 'Janika K',
            password: passwordHash
        },
        {
            username: 'oskari123',
            name: 'Oskari K',
            password: passwordHash2
        }
    ]

    await User.insertMany(initialUsers)
})

describe('creation of user', () => {
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'janskubansku01',
            name: 'Janika Kalliokoski',
            password: 'abc123',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'janika123',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain(`User validation failed: username: Error, expected \`username\` to be unique. Value: \`${newUser.username}\``)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation of user does not succeed without an username', async () => {
        const newUser = {
            name: 'Ei ole',
            password: 'salasana123'
        }

        const usersAtStart = await helper.usersInDb()

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` is required')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation of user does not succeed without a password', async () => {
        const newUser = {
            username: 'testaaja',
            name: 'Ei ole'
        }

        const usersAtStart = await helper.usersInDb()

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('password missing')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('user cannot be created if username is less than 3 characters', async () => {
        const newUser = {
            username: 'ab',
            name: 'Superuser',
            password: 'salainen',
        }

        const usersAtStart = await helper.usersInDb()

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain(`User validation failed: username: Path \`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length (3).`)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation of user does not succeed if password is less than 3 characters', async () => {
        const newUser = {
            username: 'testaaja',
            name: 'Ei ole',
            password: 'ab'
        }

        const usersAtStart = await helper.usersInDb()

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('password must be at least 3 characters')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})