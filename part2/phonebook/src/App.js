import { useState } from 'react'

const Contact = ( {name, number } ) => {
  return (<div>{name} {number}</div>)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newObj = {name: newName, number: newNumber}
    persons.every((object) => 
    JSON.stringify(object.number) !== JSON.stringify(newObj.number))
    ? setPersons(() => persons.concat(newObj))
    : alert(`${newNumber} is already added to phonebook!`)
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>{
        return (
        <Contact key={person.name} name={person.name} number={person.number}/>
        )
      })}
    </div>
  )
}

export default App