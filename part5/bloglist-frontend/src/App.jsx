import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      //console.log(user)
      setUsername('')
      setPassword('')
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

  const loginForm = () => (
    <form  onSubmit={handleLogin}>
      <h2>login to application</h2>
      <div>user
      <input 
        name="Username"
        type = "text"
        value = {username}
        onChange={({ target }) => setUsername(target.value)}>
      </input>
      </div>
      <div>password
        <input 
          name="Password"
          type="password"
          value = {password}
          onChange={({ target }) => setPassword(target.value)}>
        </input>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleBlog = async (event) => {
    console.log('here')
    event.preventDefault()

    try {
      const newBlog = { title, author, url } 
      const blog = await blogService.create(newBlog)
      setMessageType('success')
      setNotificationMessage(`New blog: ${title} by ${author} was added!`)
      fetchBlogs()
      setTitle('')
      setAuthor('')
      setUrl('')
      
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

  const userBlogs = () => (
    <div>
      <h2>blogs</h2>
      <UserDetails />
      <div>
      <h2>Create new blog</h2>
        <form onSubmit={handleBlog}>
          <div>
          title: <input value={title} onChange={({ target }) => setTitle(target.value)}></input>
          </div><div>
          author: <input value={author} onChange={({ target }) => setAuthor(target.value)}></input>
          </div><div>
          url: <input value={url} onChange={({ target }) => setUrl(target.value)}></input>
          </div>
          <button type="submit">create</button>
        </form>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
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