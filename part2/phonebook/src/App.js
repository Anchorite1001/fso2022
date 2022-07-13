import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState([])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if(e.target.value !== '') {
      setSearchResult(persons.filter(person => 
        person.name.toLowerCase().includes(e.target.value.toLowerCase())
      ))
    }
    else {
      setSearchResult([])
    }
    
  }

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }

  const handlePersonSubmit = (e) => {
    e.preventDefault();
    const nameList = Array.from(persons, person => person.name);

    if (nameList.includes(newName)) {
      alert(`${newName} is already added to the phonebook`)
    }
    else {
      const personObject = { name: newName, number: newNumber, id: persons.length+1 };
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with 
        <input 
        value={searchQuery} 
        onChange={handleSearchChange}
        />
      </div>
      {searchResult.map(result => 
        <p key={result.id}>{result.name} {result.number}</p>)}

      <h3>Add a new contact</h3>
      <form onSubmit={handlePersonSubmit}>
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
      <h3>Numbers</h3>
      {persons.map(person => 
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App