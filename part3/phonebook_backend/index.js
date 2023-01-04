const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

//import mongoDB model
const Person = require('./models/person')

const app = express()

//middleware: json parser to access data in request
app.use(express.json())
//middleware: log messages to console
morgan.token('requestData', function getRequestData(request) {
    return JSON.stringify(request.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestData'))
//middleware: using cors
app.use(cors())
//middleware: serve static build folder as frontend
app.use(express.static('build'))
//middleware: error handling
const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
}
app.use(errorHandler)

app.get('/info', (request, response) => {
    let today= new Date().toLocaleString('en-US', { timeZone: 'UTC' });

    response.send(
        `<p>Phonebook has info for ${persons.length} people</p>
        <p>${today}(Coordinated Universal Time)</p>`
    )
})

// get all people in phonebook
app.get('/api/persons',(request, response) => {
    Person.find({}).then(res => {
        response.json(res)
    })
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
    Person.findByIdAndRemove(request.params.id)
    .then(res => {
        response.status(204).end()
    })
    .catch(err => next(err))
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

    // const nameList = Array.from(persons, person => person.name)
    // if (nameList.includes(name)) {
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }

    // const newPerson = {
    //     id: generateId(),
    //     name,
    //     number
    // }
    // persons = persons.concat(newPerson);
    // response.json(newPerson)

    const newPerson = new Person({
        name, 
        number
    })

    newPerson.save()
    .then(res => {
        response.json(res)
    })
    .catch(err => next(err))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})