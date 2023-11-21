import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    let container
    let blog
    beforeEach(() => {
        blog = {
            title: 'test blog',
            author: 'test author',
            url: 'www.test.com',
            user: {
                username: 'admin',
                name: 'lyoung',
                id: '6549996a12e94bc40bb0340c'
            }
        }
    })

    test('Testing initial render only renders header with title and author', () => {
        container = render(<Blog blog={blog} />).container
        const blogHeader = container.querySelector('.blog-header')
        const blogDetails = container.querySelector('.blog-details')
        expect(blogHeader).not.toHaveStyle({ display: 'none' })
        expect(blogDetails).toHaveStyle({ display: 'none' })
    })

    test('Likes and URL details are shown after button press', async () => {
        container = render(<Blog blog={blog} />).container
        const user = userEvent.setup()
        const button = screen.getByText('View')
        await user.click(button)
        const blogDetails = container.querySelector('.blog-details')
        expect(blogDetails).not.toHaveStyle({ display: 'none' })
    })

    test('Pressing the like button', async () => {
        const handleLike = jest.fn()
        const user = userEvent.setup()

        render(<Blog blog={blog} handleLike={handleLike}/>)

        const likeButton = screen.getByText('like')

        await user.click(likeButton)
        expect(handleLike.mock.calls).toHaveLength(1)
        await user.click(likeButton)
        expect(handleLike.mock.calls).toHaveLength(2)
    })
})