const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3002

let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Phonebook</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)
  person ? res.json(person) : res.status(404).end()
})

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date()}
  `)
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({ error: "contact name is missing" })
  }

  if (!body.number) {
    return res.status(400).json({ error: "contact number is missing" })
  }

  if (persons.find(p => p.name === body.name)) {
    return res.status(409).json({ error: "Person already exists" })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: String(Math.floor(Math.random() * 100000))
  }

  persons = persons.concat(person)
  res.status(201).json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  if (!persons.find(p => p.id === id)) {
    return res.status(404).json({ error: "Person not found" })
  }
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))