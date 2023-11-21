import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

describe('<BlogForm />', () => {
    test('Test blog submission', async () => {
        const handleBlog = jest.fn()
        const user = userEvent.setup()

        const { container } = render(<BlogForm handleBlog={handleBlog}/>)
        const titleInput = container.querySelector('#title-input')
        const authorInput = container.querySelector('#author-input')
        const urlInput = container.querySelector('#url-input')

        await user.type(titleInput, 'test blog')
        await user.type(authorInput, 'test author')
        await user.type(urlInput, 'www.test.com')

        const submit = screen.getByText('create')
        await user.click(submit)

        expect(handleBlog.mock.calls).toHaveLength(1)
        expect(handleBlog.mock.calls[0][0]).toEqual({ title: 'test blog', author: 'test author', url: 'www.test.com' })
    })
})