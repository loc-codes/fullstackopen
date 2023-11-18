import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
}

  const showWhenVisible = {display: visible ? '' : 'none'}

  const toggleVisibility = () => {
      setVisible(!visible)
  }

  const addLike = () => {
    setLikes(prevLikes => {
      const updatedLikes = prevLikes + 1
      handleLike({ ...blog, likes: updatedLikes, user: blog.user.id });
      return updatedLikes;
    })
  }

  const deleteBlog = () => {
    if (window.confirm(`Delete ${blog.title}`)){
      handleDelete(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} 
        <button onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button>
      </div>
      <div style={showWhenVisible}>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>Likes: {likes} <button onClick={addLike}>like</button></div>
        <div>{blog.user.name}</div>
        <button onClick={deleteBlog}>Delete</button>
      </div>
    </div>  
  )
}

export default Blog