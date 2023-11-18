import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  const fetchBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    fetchBlogs()
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    }
    catch (exception) {
      setMessageType('error')
      setNotificationMessage('Wrong username or password')
      console.log(exception)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    }
  }

  const handleBlog = async ({ title, author, url }) => {
    try {
      const newBlog = { title, author, url } 
      await blogService.create(newBlog)
      setMessageType('success')
      setNotificationMessage(`New blog: ${title} by ${author} was added!`)
      fetchBlogs()
      
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    }
    catch (exception) {
      setNotificationMessage(exception.message)
      console.log(exception)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    }
  }

  const handleLike = async (updatedBlog) => {
    try {
      await blogService.update(updatedBlog)
      setMessageType('success')
      setNotificationMessage(`You liked ${updatedBlog.title} by ${updatedBlog.author}!`)

      fetchBlogs()
      
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    }
    catch (exception) {
      setMessageType('error')
      setNotificationMessage(exception.message)
      console.log(exception)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    }
  }

  const handleDelete = async(id) => {
    try {
      await blogService.remove(id)
      setMessageType('success')
      setNotificationMessage(`Successfully deleted`)

      fetchBlogs()
      
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    }

    catch (exception) {
      setMessageType('error')
      setNotificationMessage(exception.message)
      console.log(exception)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000);
    }
  }

  const UserDetails = () => (
    <div>
      {user.name} logged in
      <button onClick={() => {
        setUser(null)
        window.localStorage.removeItem('loggedInUser')
      }}>
        Log Out
      </button>
    </div>
  )

  const loginForm = () => (
    <Togglable buttonLabel='Login'>
      <LoginForm handleLogin={handleLogin}/>
    </Togglable>
  )

  const userBlogs = () => (
    <div>
      <h2>blogs</h2>
      <UserDetails />
      <Togglable buttonLabel = 'New Blog'>
        <BlogForm handleBlog={handleBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete}/>)
      }
    </div>
  )

  return (
    <div>
      <Notification message={notificationMessage} messageType={messageType} />
      {!user && loginForm()}
      {user && userBlogs()}
    </div>
  )
}

export default App