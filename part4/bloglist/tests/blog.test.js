const blogList = [
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
    },
    {
        'title': 'What Do You Mean “You Don’t Have a Bike”?!',
        'author': 'Mr Money Moustache',
        'url': 'https://www.mrmoneymustache.com/2012/05/07/what-do-you-mean-you-dont-have-a-bike/',
        'likes': 76,
        'id': '1234567'
    }
]

const listHelper = require('../utils/list_helper')
test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('Total likes', () => {
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

describe('Most likes', () => {
    test('when a list has multiple blogs, return the blog with the most likes', () => {
        const result = listHelper.favouriteBlog(blogList)
        expect(result).toEqual({
            title: 'The Shockingly Simple Math Behind Early Retirement',
            author: 'Mr Money Moustache',
            likes: 162
        })
    })
})

describe('Most blogs', () => {
    test('Return the author with the most blog entries', () => {
        const result = listHelper.mostBlogs(blogList)
        expect(result).toEqual({
            author: 'Mr Money Moustache',
            blogs: 2
        })
    })
})

describe('Most likes', () => {
    test('Return the author with the most likes across all blog entries', () => {
        const result = listHelper.mostLikes(blogList)
        expect(result).toEqual({
            author: 'Mr Money Moustache',
            likes: 238
        })
    })
})