import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 

  //fetch persons data
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  //search feature
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

  //add new contact feature
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
      <Filter 
        searchQuery={searchQuery} 
        handleSearchChange={handleSearchChange} 
      />
      <Persons personArr={searchResult} />

      <h3>Add a new contact</h3>
      <PersonForm 
        handlePersonSubmit={handlePersonSubmit} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons personArr={persons}/>
    </div>
  )
}

export default App