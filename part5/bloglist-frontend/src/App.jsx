import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      setUser(user)
      console.log(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      console.log(exception)
    }
  }

  const loginForm = () => (
    <form  onSubmit={handleLogin}>
      <h2>login to application</h2>
      <div>user
      <input 
        value = {username}
        onChange={({ target }) => setUsername(target.value)}>
      </input>
      </div>
      <div>password
        <input 
          value = {password}
          type="password"
          onChange={({ target }) => setPassword(target.value)}>
        </input>
      </div>
      <button>login</button>
    </form>
  )

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

  const blogsForm = () => {
    <form onSubmit={handleBlog}></form>
  }

  const userBlogs = () => (
    <div>
      <h2>blogs</h2>
      <UserDetails />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {!user && loginForm()}
      
      {user && userBlogs()}
      
    </div>
  )
}

export default App