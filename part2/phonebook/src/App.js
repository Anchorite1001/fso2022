import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handleNameSubmit = (e) => {
    e.preventDefault();
    const nameList = Array.from(persons, person => person.name);

    if (nameList.includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
    }
    else {
      const personObject = { name: newName, number: newNumber };
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNameSubmit}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange}
                />
          <br />
          number: <input 
                  value={newNumber}
                  onChange={handleNumberChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App