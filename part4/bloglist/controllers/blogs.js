const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    if (!request.body.likes){
        request.body.likes = 0
    }

    if (!request.body.author || !request.body.title){
        response.status(400).json({ 'Error': 'Missing author or title field' })
    }

    const blog = new Blog(request.body)
    const result = await blog.save()
    response
        .status(201)
        .json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blogId = request.params.id
    await Blog.findByIdAndDelete(blogId)
    response.status(204).json({ 'Message': `Sucessfully deleted ${blogId}` }).end()
})

blogsRouter.put('/:id', async (request, response) => {
    console.log('In Router')
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