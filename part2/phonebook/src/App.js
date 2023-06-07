import { useState } from 'react'
import Contacts from './Components/Contacts'
import PersonForm from './Components/PersonForm'
import Filter from './Components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [active, setActive] = useState(false)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newObj = {name: newName, number: newNumber, id: persons.length+1}
    persons.every((object) => 
    JSON.stringify(object.name) !== JSON.stringify(newObj.name))
    ? setPersons(() => persons.concat(newObj))
    : alert(`${newName} is already added to phonebook!`)
    setNewName('')
    setNewNumber('')
  }

  const handleFilter = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const filteredPersons = (filter === '')
    ? persons
    : persons.filter(person => 
      person.name.toLowerCase().includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter}/>
      <h3>add a new</h3>
      <PersonForm 
      newName={newName} 
      newNumber={newNumber} 
      handleSubmit={handleSubmit} 
      handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Contacts filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App