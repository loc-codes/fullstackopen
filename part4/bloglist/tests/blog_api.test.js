const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
mongoose.set('bufferTimeoutMS', 30000)
jest.setTimeout(30000)


beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects
        .map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('GET Request Testing', () => {
    test('all notes are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('Verify all notes have an id', async () => {
        const response = await api.get('/api/blogs')
        const blogs = response.body
        for (const blog of blogs){
            expect(blog.id).toBeDefined()
        }
    })
})

describe('POST Request Testing', () => {
    test('Verify POST makes a new blog entry', async () => {
        const oldBlogs = await helper.blogsInDb()

        const newBlog = {
            'title': 'Why I Am a Bad Correspondent',
            'author': 'Neal Stephenson',
            'url': 'https://nealstephenson.com/why-i-am-a-bad-correspondent.html',
            'likes': 123,
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const responseBlog = response.body
        delete responseBlog.id

        expect(responseBlog).toEqual(newBlog)

        const newBlogs = await helper.blogsInDb()
        expect(newBlogs.length).toEqual(oldBlogs.length + 1)
    })


    test('Verify likes defaults to zero when missing', async () => {
        const noLikes = {
            'title': 'Why I Am a Bad Correspondent',
            'author': 'Neal Stephenson',
            'url': 'https://nealstephenson.com/why-i-am-a-bad-correspondent.html'
        }

        const response = await api
            .post('/api/blogs')
            .send(noLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(0)
    })

    test('Verify missing title/author returns 400', async () => {
        const badRequest = {
            'url': 'badrequest.blog.com'
        }

        await api
            .post('/api/blogs')
            .send(badRequest)
            .expect(400)
    })
})

describe('DELETE Request Testing', () => {
    test('Verify Succesful Delete responds 204', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            blogsAtStart.length - 1
        )

        expect(blogsAtEnd).not.toContain(blogToDelete)
    })
})

describe('PUT REQUEST Testing', () => {
    test('Verify Put updates likes', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]
        const originalLikes = blogToUpdate.likes
        blogToUpdate.likes += 1

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const updatedBlog = blogsAtEnd[0]
        expect(updatedBlog.likes).toBe(originalLikes + 1)
    })
})

describe('User testing', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    })

    test('Verify new user can be created', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = { username: 'admin', name: 'lyoung', password: 'StrongP@ss123' }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
    })

    test('Verify that existing user can\'t be overwritten', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = { username: 'root', name: 'superUser', password: 'P455w0rd!!' }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('expected `username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('creation fails when username is less than 3 characters', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser = {
            username: 'jo',
            name: 'jo mama',
            password: 'StrongP@ss1'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain('Username must be at least 3 characters long')
        console.log(result.body)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

})

afterAll(async () => {
    await mongoose.connection.close()
})