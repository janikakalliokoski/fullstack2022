const Person = ({ person, removePerson }) => {
  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => removePerson(person)} >delete</button>
    </div>
  )
}

const Persons = ({ persons, removePerson, filter }) => {
  return (
    persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    .map(person =>
      <Person key={person.id} person={person} removePerson={removePerson} />
      )
  )
}

export default Persons