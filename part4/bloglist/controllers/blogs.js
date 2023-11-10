const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.likes){
        body.likes = 0
    }

    if (!body.author || !body.title){
        response.status(400).json({ 'Error': 'Missing author or title field' })
    }

    const user = request.user
    console.log(user)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })

    const savedBlog = await blog.save()
    const mongoUser = await User.findById(user.id)
    mongoUser.blogs = mongoUser.blogs.concat(savedBlog._id)
    await mongoUser.save()
    response
        .status(201)
        .json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blogId = request.params.id
    const requestingUserId = request.user.id.toString()
    const blog = await Blog.findById(blogId)
    if (!blog) {
        return response.status(404).json({ 'Message': 'Could not find blog' })
    }
    const blogUserId = blog.user.toString()

    if (requestingUserId === blogUserId){
        await Blog.findByIdAndDelete(blogId)
        const mongoUser = await User.findById(requestingUserId)
        mongoUser.blogs = mongoUser.blogs.filter(b => b.id !== blogId)
        await mongoUser.save()
        return response.status(204).end()
    }
    else {
        return response.status(403).json({ 'Error': 'This blog belonds to another user' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        author: body.author,
        title: body.title,
        url: body.title,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

module.exports = blogsRouter