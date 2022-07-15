import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

import personServices from './services/person';

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [message, setMessage] = useState({mode:null, content: null})
  const { getAll, create, update } = personServices

  //fetch persons data
  useEffect(() => {
    getAll()
      .then(personsData => {
        setPersons(personsData)
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

    // name already exists: update contact
    if (nameList.includes(newName)) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const existingPerson = persons.find(person => person.name === newName);
        const changedPerson = {...existingPerson, number: newNumber};

        update(existingPerson.id, changedPerson)
          .then(returnedPerson => 
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson)))
          .catch(error => {
            setMessage({mode: 'error', content: `Information of ${newName} has already been removed from server`});
            setTimeout(() => setMessage({mode: null, content: null}), 3000)
          })
      }
    }
    //name not exists: create contact
    else {
      const personObject = { name: newName, number: newNumber, id: persons.length+1 };
      create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson));
        setMessage({mode: 'notification', content:`Added ${newName}`})
        setTimeout(() => {setMessage({mode: null, content: null})}, 3000)
      });

      setNewName('');
      setNewNumber('');
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter 
        searchQuery={searchQuery} 
        handleSearchChange={handleSearchChange} 
      />
      <Persons persons={searchResult} />

      <h3>Add a new contact</h3>
      <PersonForm 
        handlePersonSubmit={handlePersonSubmit} 
        newName={newName} 
        handleNameChange={handleNameChange} 
        newNumber={newNumber} 
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App