const listHelper = require('../utils/list_helper')
test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url:
  'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0 }
    ]
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    }) })

describe('most likes', () => {
    const multipleBlogs = [
        {
            'title': 'The Shockingly Simple Math Behind Early Retirement',
            'author': 'Mr Money Moustache',
            'url': 'https://www.mrmoneymustache.com/2012/01/13/the-shockingly-simple-math-behind-early-retirement/',
            'likes': 162,
            'id': '65435a52425c0b06ab7a2345'
        },
        {
            'title': 'The Acceleration of Addictiveness',
            'author': 'Paul Graham',
            'url': 'https://www.paulgraham.com/addiction.html#:~:text=The%20world%20is%20more%20addictive,did%20in%20the%20last%2040.',
            'likes': 0,
            'id': '65435d9762786327cc715949'
        },
        {
            'title': 'Why I Am a Bad Correspondent',
            'author': 'Neal Stephenson',
            'url': 'https://nealstephenson.com/why-i-am-a-bad-correspondent.html',
            'likes': 0,
            'id': '654409ed498c216e4b34f5ea'
        }
    ]
    test('when a list has multiple blogs, return the blog with the most likes', () => {
        const result = listHelper.favouriteBlog(multipleBlogs)
        expect(result).toEqual({
            title: 'The Shockingly Simple Math Behind Early Retirement',
            author: 'Mr Money Moustache',
            likes: 162
        })
    })
})