import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Error from './components/Error'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successfulMessage, setSuccesfulMessage] = useState(null)
  const [errormessage, setError] = useState(null)

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])

  const addFilter = (event) => {
    event.preventDefault()
    setNewFilter('')
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personsArray = persons.map(event => event.name)
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (personsArray.includes(`${personObject.name}`)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personId = persons[personsArray.indexOf(newName)].id
        console.log(personId)
        personService
          .update(personId, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personId ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setSuccesfulMessage(`${newName} number changed`)
            setTimeout(() => {
              setSuccesfulMessage(null)
            }, 2000)
          })
          .catch(error => {
            console.log(error.response.data)
            setError(`${newName} already removed`)
            setTimeout(() => {
              setError(null)
            }, 5000)
            setPersons(removedPerson => removedPerson.filter(({ id }) => id !== personId))
          })
      }
      else {
        setNewName('')
        setNewNumber('')
      }
    }
    else {
      personService
      .create(personObject)
        .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setSuccesfulMessage(`Added ${newName}`)
        setTimeout(() => {
          setSuccesfulMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log("error")
        console.log(error.response.data)
        setError(`name: Path name is shorter than the minimum allowed length (3) or number must be in correct form i.e. 09-123456 or 044-123456`)
        setTimeout(() => {
          setError(null)
        }, 5000)
      })
    }
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  //console.log(persons)

  const removePerson = (person) => {

    if (window.confirm(`Do you want to delete ${person.name} from the phonebook?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(removedPerson => removedPerson.filter(({ id }) => id !== person.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successfulMessage} />
      <Error message={errormessage} />
      <Filter
        addFilter={addFilter}
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        />
      <h2>Numbers</h2>
        <div>
          <Persons persons={persons} removePerson={removePerson} filter={newFilter}/>
        </div>
    </div>
  )

}

export default App
