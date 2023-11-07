const bcrypt = require('bcrypt')
const validator = require('./helper')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { user: 0, likes: 0 })
    response.json(users)
})

userRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!validator.isPasswordStrong(password)) {
        return response.status(400).json({ error: 'Password is not strong enough.' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    await user.save()
    response
        .status(201)
        .json(user)
})

module.exports = userRouter
