import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
    handleLogin
}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        handleLogin({ username, password })
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <h2 id='login-title'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
           username
                    <input
                        name="Username"
                        type = "text"
                        id = 'user-input'
                        value = {username}
                        onChange={({ target }) => setUsername(target.value)}>
                    </input>
                </div>
                <div>
           password
                    <input
                        name="Password"
                        type="password"
                        id = 'password-input'
                        value = {password}
                        onChange={({ target }) => setPassword(target.value)}>
                    </input>
                </div>
                <button type="submit" id='login-submit'>login</button>
            </form>
        </div>
    )
}
export default LoginForm

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}