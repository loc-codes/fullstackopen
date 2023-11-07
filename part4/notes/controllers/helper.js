function isPasswordStrong(password) {
    const minLength = 8
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})')
    return password.length >= minLength && strongRegex.test(password)
}

module.exports = { isPasswordStrong }