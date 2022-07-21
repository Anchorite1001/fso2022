const express = require('express')
const morgan = require('morgan')

const app = express()

//middleware: json parser to access data in request
app.use(express.json())
//middleware: log messages to console
morgan.token('requestData', function getRequestData(request) {
    return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestData'))

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

    if(!name || !number) {
        return response.status(400).json({
            error: 'Please provide valid name and number'
        })
    }

    const nameList = Array.from(persons, person => person.name)
    if (nameList.includes(name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

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