const personsRouter = require('express').Router()
const Person = require('../models/person')

// get all people in phonebook
personsRouter.get('/',(request, response) => {
    Person.find({}).then(res => {
        response.json(res)
    })
})

//get one person in phonebook
personsRouter.get('/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if(person) {
                response.json(person)
            }
            else{
                response.status(404).json({ error: 'person does not exist' })
            }
        })
        .catch(err => next(err))
})

//create a contact
personsRouter.post('/', (request, response, next) => {
    const { name, number } = request.body

    if(!name || !number) {
        return response.status(400).json({
            error: 'Please provide valid name and number'
        })
    }

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

//update a contact
personsRouter.put('/:id', (request, response, next) => {
    const { name, number } = request.body
    const updatedPerson = {
        name,
        number
    }

    Person.findByIdAndUpdate(request.params.id, updatedPerson,
        { new:true, runValidators: true, context: 'query' }
    )
        .then(res => {
            response.json(res)
        })
        .catch(err => next(err))
})

//delete a contact
personsRouter.delete('/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        // eslint-disable-next-line no-unused-vars
        .then(res => {
            response.status(204).end()
        })
        .catch(err => next(err))
})

module.exports = personsRouter