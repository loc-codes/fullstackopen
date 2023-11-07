function isPasswordStrong(password) {
    const minLength = 3
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{3,})')
    return password.length >= minLength && strongRegex.test(password)
}

module.exports = { isPasswordStrong }