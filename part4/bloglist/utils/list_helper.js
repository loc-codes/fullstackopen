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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}