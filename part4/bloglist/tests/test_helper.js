const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
    {
        username: 'admin',
        name: 'Lachlan Young',
        password: 'dummyP@ss1',
        blogs: []
    },
    {
        username: 'hburgers',
        name: 'Hannibal Buress',
        password: 'dummyP@ss2',
        blogs: []
    },
]

const initialBlogs = [
    {
        'title': 'The Shockingly Simple Math Behind Early Retirement',
        'author': 'Mr Money Moustache',
        'url': 'https://www.mrmoneymustache.com/2012/01/13/the-shockingly-simple-math-behind-early-retirement/',
        'likes': 162,
    },
    {
        'title': 'The Acceleration of Addictiveness',
        'author': 'Paul Graham',
        'url': 'https://www.paulgraham.com/addiction.html#:~:text=The%20world%20is%20more%20addictive,did%20in%20the%20last%2040.',
        'likes': 0,
    }
]



const nonExistingId = async() => {
    const blog = new Blog({ 'content': 'Delete Me', 'author': 'dummy author', 'likes': 456 })
    await blog.save()
    await blog.deleteOne()

    return blog.id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}