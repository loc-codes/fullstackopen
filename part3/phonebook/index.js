require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const morgan = require('morgan')
const { response } = require('express')
app.use(express.json())
app.use(express.static('build'))


morgan.token('body', function (req) {
  return JSON.stringify(req.body)
})

const customLog = ':method :url :status :res[content-length] - :response-time ms :body'

app.use(morgan(customLog))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}



app.get('/api/persons/', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/info', (request, response) => {
  Person.countDocuments().then(count =>
  {
    response.send(
      `<p>Phonebook has info for ${count} people</p>
         <p>${new Date()}</p>
        `
    )
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)})
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request,response, next) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body
  if (name === undefined || number === undefined) {
    return response.status(400).json({ error: 'Name or Number is missing' })
  }

  Person.create({ name: name, number: number })
    .then(createdPerson => response.json(createdPerson))
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})