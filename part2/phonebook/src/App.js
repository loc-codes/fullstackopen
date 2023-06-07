import { useState } from 'react'

const Contact = ( {name} ) => {
  return (<div>{name}</div>)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas'}
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const newObj = {name: newName}
    persons.every((object) => 
    JSON.stringify(object) !== JSON.stringify(newObj))
    ? setPersons(() => persons.concat(newObj))
    : alert(`${newName} is already added to phonebook!`)
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>{
        return (
        <Contact key={person.name} name={person.name}/>
        )
      })}
    </div>
  )
}

export default App