import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '951-6237366' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: '951-6237366'
    }


    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    
  }

  const handleChange = e => {
    if (persons.some(person => person.name === e.target.value)) {
      alert(`${e.target.value} is already added to phonebook`)
      return
    }
    setNewName(e.target.value)
  }

  const addNum = e => {
    setNewNumber(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(person => (
        <div>
          <span>{person.name} </span> 
          <span>{person.number}</span>
        </div>
      ))}
    </div>
  )
}

export default App