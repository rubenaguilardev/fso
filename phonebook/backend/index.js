const express = require('express')

const app = express()
app.use(express.json())

const PORT = 3001

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323524"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234347"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423132"
    }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(person => person.id === id)
  
  person ? res.json(person) : res.status(400).end()
})

app.post('/api/persons', (req, res) => {
  const id = String(Math.ceil(Math.random() * 100))
  const body = req.body

  if (!body.name) {
    return res.status(400).json({error: 'name missing'})
  }

  if (!body.number) {
    return res.status(400).json({error: 'number missing'})
  }

  if (persons.find(person => person.name === body.name)) {
    return res.status(409).json({error: 'name must be unique'})
  }
  
  const person = {
    name: body.name,
    number: body.number,
    id: id
  }

  persons = persons.concat(person)
  res.json(person)
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))