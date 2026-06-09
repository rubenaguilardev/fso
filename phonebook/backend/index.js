import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(express.static('dist'))
app.use(cors())

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

app.get('/api/persons', (req, res) => {
  console.log(persons)
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  const person = persons.find(p => p.id === id)
  person ? res.json(person) : res.status(404).end()
})

app.get('/info', (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <span>${new Date()}</span>`
  )
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  if (!body.name) {
    return res.status(400).json({error: 'name missing'})
  }
  if (!body.number) {
    return res.status(400).json({error: 'number missing'})
  }
  if (persons.find(p => p.name === body.name)){
    return res.status(409).json({error: 'person already exist'})
  }
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 10000000)
  }
  persons = persons.concat(person)
  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))