import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Dil Abramov', number: '12-43-234346', id: 4 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 5 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }
  
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    
  }

  const handleChange = e => {
    setNewName(e.target.value)
  }

  const addNum = e => {
    setNewNumber(e.target.value)
  }

  const handleSearch = e => {
    setSearch(e.target.value)
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <span>filter shown with </span><input onChange={handleSearch} />
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: 
            <input 
              value={newName}
              onChange={handleChange}
            />
          number:
            <input 
              type="tel"
              value={newNumber}
              onChange={addNum}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons
        .filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
        .map(person => (
          <div key={person.id}>
            <span>{person.name} </span>
            <span>{person.number}</span>
          </div>
        ))
      }
    </div>
  )
}

export default App