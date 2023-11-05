const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
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

test('Verify POST makes a new blog entry', async () => {
    const oldBlogs = await api.get('/api/blogs')
    const numberOfOldBlogs = oldBlogs.body.length

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

    const newBlogs = await api.get('/api/blogs')
    const numberOfNewBlogs = newBlogs.body.length
    expect(numberOfNewBlogs).toEqual(numberOfOldBlogs + 1)
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

afterAll(async () => {
    await mongoose.connection.close()
})