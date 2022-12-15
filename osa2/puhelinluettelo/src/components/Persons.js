const Person = ({ person, removePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => removePerson(person)} >delete</button>
    </div>
  )
}

const Persons = ({ persons, removePerson, filter }) => {
  if (filter === '') {
    return (
      <div>
        {persons.map(person =>
          <Person key={person.id} person={person} removePerson={removePerson} />
        )}
      </div>
    )
  } else {
    const filteredPersons = persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1)

    return (
      <div>
        {filteredPersons.map(person =>
          <Person key={person.id} person={person} removePerson={removePerson} />
        )}
      </div>
    )
  }
}

export default Persons