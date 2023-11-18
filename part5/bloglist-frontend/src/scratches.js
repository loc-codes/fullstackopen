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
      <div>
        password
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