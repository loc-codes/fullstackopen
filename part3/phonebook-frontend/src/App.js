import { useState, useEffect } from 'react'
import NewContactForm from './Components/NewContactForm'
import Filter from './Components/Filter'
import Phonebook from './Components/Phonebook'
import Notification from './Components/Notification'
import phonebookService from "./services/contacts"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setnewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState('error')

  useEffect(() => loadFrontEnd(), [])

  const updateName = (event) => {
    setNewName(event.target.value)
  }

  const updateNumber = (event) => {
    setnewNumber(event.target.value)
  }

  const updateFilter = (event) => {
    setFilter(event.target.value.toLowerCase())
  }

  const loadFrontEnd = () => {
    phonebookService
      .getAll()
      .then(allPersons => setPersons(allPersons))
  }

  const updatePersons = (event) => {
    event.preventDefault()

    const newPerson = { 'name': newName, 'number': newNumber }
    let matchingPerson = false
    let matchingNumber = ''
    let updateId = ''

    for (let person of persons) {
      if (person.name === newPerson.name) {
        matchingPerson = true
        if (person.number !== newPerson.number) {
          matchingNumber = false
          updateId = person.id
        }
        else { matchingNumber = true }
      }
    }

    if (newPerson.name === '' | newPerson.number === '') { alert('Cannot add an empty name or number to Phonebook') }
    else if (matchingPerson && matchingNumber) { alert(`${newPerson.name} already in phonebook!`) }
    else if (matchingPerson && !matchingNumber) {
      if (window.confirm(`${newPerson.name} already in Phonebook. Do you want to replace their current number with the new number?`)) {
        phonebookService.updateContact(updateId, newPerson)
          .then(updatedPerson =>
            setPersons(persons.map(
              person => person.id !== updatedPerson.id ? person : updatedPerson)))
          .catch(error => {
            console.log(error)
            setNotificationType('error')
            setNotification(`${newPerson.name} has already been removed from server`)
          }
          )
      }
    }
    else { phonebookService.addContact(newPerson)
            .then(newPerson => {
              setPersons(persons.concat(newPerson))
              setNotificationType('success')
              setNotification(`Added ${newPerson.name}`)
            })
            .catch(error => {
              console.log(error.response.data.error)
              setNotificationType('error')
              setNotification(error.response.data.error)
            })
          }
    setTimeout(() => {setNotification(null)},5000)
    clearFields()
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService.deleteContact(person.id)
      setPersons(persons.filter(existingContact => existingContact !== person))
    }
  }

  const clearFields = () => {
    const newName = ''
    const newNumber = ''
    setNewName(newName)
    setnewNumber(newNumber)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter))

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} notificationType={notificationType}/>
      <Filter updateFilter={updateFilter} />
      <NewContactForm updateName={updateName}
        updateNumber={updateNumber}
        updatePersons={updatePersons}
        newName={newName}
        newNumber={newNumber} />
      <Phonebook persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}
export default App