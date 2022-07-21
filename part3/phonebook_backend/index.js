const express = require('express')
const app = express()

//json parser to access data in request
app.use(express.json())

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    let today= new Date().toLocaleString('en-US', { timeZone: 'UTC' });

    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${today}(Coordinated Universal Time)</p>`
    )
})

// get all people in phonebook
app.get('/api/persons',(request, response) => {
    response.json(persons);
})

//get one person in phonebook
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    let person = persons.find(person => person.id === id);

    if(person) {
        response.json(person)
    }
    else {
        response.status(404).json({
            error: 'person does not exist in the phone book' 
        })
    }
})

//delete a person
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

//create a new person entry
const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
}

app.post('/api/persons', (request, response) => {
    const {name, number} = request.body;
    const newPerson = {
        id: generateId(),
        name,
        number
    }
    persons = persons.concat(newPerson);
    response.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})