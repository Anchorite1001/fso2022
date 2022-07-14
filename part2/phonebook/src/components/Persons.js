import personServices from '../services/person'

const Persons = ({ persons, setPersons }) => {

  const handleDelete = (id) => {
    const rest = persons.filter(person => person.id !== id);
    personServices.erase(id);
    setPersons(rest)
  }

  return (
    <div>
      {persons.map(person => 
        <p key={person.id}>
          {person.name}{' '}{person.number}{' '}
          <button onClick={() => handleDelete(person.id)}>Delete</button>
        </p>
      )}
    </div>
  )
}

export default Persons