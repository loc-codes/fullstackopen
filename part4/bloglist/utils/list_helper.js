const ld = require('lodash')

const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
    const { title, author, likes } = blogs.reduce((favBlog, blog) => {
        return blog.likes > favBlog.likes
            ? blog
            : favBlog}, blogs[0])
    return { title, author, likes }
}

const mostBlogs = (blogs) => {
    const groupedBlogs = ld.groupBy(blogs, 'author')
    const authorCounts = ld.map(groupedBlogs, (blogs, author) => {
        return {
            author: author,
            blogs: blogs.length
        }
    })
    return ld.orderBy(authorCounts, 'blogs', 'desc')[0]
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
}