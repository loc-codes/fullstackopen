import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ handleBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        setTitle('')
        setAuthor('')
        setUrl('')
        handleBlog({ title, author, url })
    }

    return (
        <div>
            <h2>Create new blog</h2>
            <form onSubmit={addBlog}>
                <div>
            title: <input id='title-input' value={title} onChange={({ target }) => setTitle(target.value)}></input>
                </div><div>
            author: <input id='author-input' value={author} onChange={({ target }) => setAuthor(target.value)}></input>
                </div><div>
            url: <input id='url-input' value={url} onChange={({ target }) => setUrl(target.value)}></input>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm

